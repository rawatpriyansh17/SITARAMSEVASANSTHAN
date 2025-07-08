import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables from .env files
dotenv.config();
dotenv.config({ path: '.env.local' });

const tailwindClassRegex = /\b[a-zA-Z0-9_-]+(?:\:[a-zA-Z0-9_-]+)*\b/g;

function removeTailwindClasses(content: string): string {
  return content.replace(tailwindClassRegex, (match) => {
    // Check if the match is a valid Tailwind class (heuristic)
    if (match.includes(":") || match.match(/^[a-z]/)) {
      return "";
    }
    return match;
  });
}

// Directories to scan
const dirs = ["app", "components", "content", "lib"];
const exts = [".md", ".mdx", ".tsx", ".jsx", ".js", ".ts"];

// Type definitions for CMS data
interface Post {
  id: number;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  eventPageSlug?: string;
  isActive: boolean;
  order: number;
}

interface Event {
  id: number;
  slug: string;
  heading_en: string;
  heading_hi: string;
  description1_en: string;
  description1_hi: string;
  description2_en?: string;
  description2_hi?: string;
  photoSubheading_en: string;
  photoSubheading_hi: string;
  videoSubheading_en: string;
  videoSubheading_hi: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface CMSData {
  posts: Post[];
  events: Event[];
  error: string | null;
}

function extractText(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8");
  // For markdown, return as is. For code, extract comments and export const/strings.
  if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) return content;
  
  // Enhanced extraction for better content capture
  const comments = content.match(/\/\/.*|\/\*[\s\S]*?\*\//g) || [];
  const strings = content.match(/(["'`])(?:(?=(\\?))\2.)*?\1/g) || [];
  const exports = content.match(/export\s+(?:const|let|var|function|class|default)\s+\w+/g) || [];
  const interfaces = content.match(/interface\s+\w+\s*{[^}]*}/g) || [];
  const types = content.match(/type\s+\w+\s*=\s*[^;]+/g) || [];
  
  return [...comments, ...strings, ...exports, ...interfaces, ...types].join("\n");
}

function walk(dir: string): string[] {
  let results: string[] = [];
  try {
    fs.readdirSync(dir).forEach((file: string) => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(filePath));
      } else if (exts.some((ext) => file.endsWith(ext))) {
        results.push(filePath);
      }
    });
  } catch (error) {
    console.log(`Error reading directory ${dir}:`, (error as Error).message);
  }
  return results;
}

async function fetchWithRetry(url: string, maxRetries: number = 5, delay: number = 1000): Promise<any> {
  const { default: fetch } = await import('node-fetch');
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt}/${maxRetries} for ${url}`);
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`✅ Success on attempt ${attempt}`);
        return data;
      } else {
        console.log(`❌ HTTP ${response.status} on attempt ${attempt}`);
        if (attempt === maxRetries) {
          throw new Error(`HTTP ${response.status} after ${maxRetries} attempts`);
        }
      }
    } catch (error) {
      console.log(`❌ Network error on attempt ${attempt}:`, (error as Error).message);
      if (attempt === maxRetries) {
        throw error;
      }
    }
    
    // Wait before retrying (exponential backoff)
    const waitTime = delay * Math.pow(2, attempt - 1);
    console.log(`⏳ Waiting ${waitTime}ms before retry...`);
    await new Promise(resolve => setTimeout(resolve, waitTime));
  }
}

async function fetchCMSData(): Promise<CMSData> {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';
  console.log('Using CMS URL:', cmsUrl);
  
  let cmsData: CMSData = {
    posts: [],
    events: [],
    error: null
  };

  try {
    console.log('Fetching CMS data with retry logic...');
    
    // Fetch posts with retry
    try {
      const postsUrl = `${cmsUrl}/api/public/posts`;
      console.log('📝 Fetching posts from:', postsUrl);
      const postsData = await fetchWithRetry(postsUrl, 5, 1000);
      cmsData.posts = postsData as Post[];
      console.log(`✅ Successfully fetched ${cmsData.posts.length} posts`);
    } catch (error) {
      console.log('❌ Could not fetch posts after retries:', (error as Error).message);
    }

    // Fetch events with retry
    try {
      const eventsUrl = `${cmsUrl}/api/public/events`;
      console.log('📅 Fetching events from:', eventsUrl);
      const eventsData = await fetchWithRetry(eventsUrl, 5, 1000);
      cmsData.events = eventsData as Event[];
      console.log(`✅ Successfully fetched ${cmsData.events.length} events`);
    } catch (error) {
      console.log('❌ Could not fetch events after retries:', (error as Error).message);
    }

  } catch (error) {
    console.log('❌ CMS connection error:', (error as Error).message);
    cmsData.error = (error as Error).message;
  }

  return cmsData;
}

async function main(): Promise<void> {
  console.log('Generating site summary...');
  
  let summary = `# Site Content Summary\n\n`;
  summary += `Generated on: ${new Date().toISOString()}\n\n`;
  
  // Add CMS data section
  console.log('Fetching latest CMS data...');
  const cmsData = await fetchCMSData();
  
  summary += `## CMS Data (Latest)\n\n`;
  
  if (cmsData.error) {
    summary += `**CMS Connection Error:** ${cmsData.error}\n\n`;
  } else {
    summary += `### Posts (${cmsData.posts.length} total)\n`;
    cmsData.posts.forEach((post, index) => {
      summary += `**Post ${index + 1}:**\n`;
      summary += `- Title (EN): ${post.title_en}\n`;
      summary += `- Title (HI): ${post.title_hi}\n`;
      summary += `- Description (EN): ${post.description_en}\n`;
      summary += `- Description (HI): ${post.description_hi}\n`;
      summary += `- Media Type: ${post.mediaType}\n`;
      summary += `- Event Slug: ${post.eventPageSlug || 'None'}\n`;
      summary += `- Active: ${post.isActive}\n\n`;
    });

    summary += `### Events (${cmsData.events.length} total)\n`;
    cmsData.events.forEach((event, index) => {
      summary += `**Event ${index + 1}:**\n`;
      summary += `- Slug: ${event.slug}\n`;
      summary += `- Heading (EN): ${event.heading_en}\n`;
      summary += `- Heading (HI): ${event.heading_hi}\n`;
      summary += `- Description (EN): ${event.description1_en}\n`;
      summary += `- Description (HI): ${event.description1_hi}\n`;
      summary += `- Active: ${event.isActive}\n\n`;
    });
  }

  // Add static site structure
  summary += `## Static Site Structure\n\n`;
  
  for (const dir of dirs) {
    const fullDir = path.join(process.cwd(), dir);
    if (fs.existsSync(fullDir)) {
      const files = walk(fullDir);
      for (const file of files) {
        try {
          summary += `### ${file.replace(process.cwd() + "/", "")}\n`;
          const cleanedText = removeTailwindClasses(extractText(file));
          summary += "```\n" + cleanedText.slice(0, 1500) + "\n```\n\n";
        } catch (error) {
          console.log(`Error processing file ${file}:`, (error as Error).message);
        }
      }
    }
  }

  // Add API endpoints information
  summary += `## API Information\n\n`;
  summary += `**CMS Base URL:** ${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'}\n\n`;
  summary += `**Available Endpoints:**\n`;
  summary += `- GET /api/public/posts - Fetch all posts\n`;
  summary += `- GET /api/public/events - Fetch all events\n`;
  summary += `- GET /api/public/events/[slug] - Fetch specific event with media\n\n`;
  
  summary += `**NGO Services:**\n`;
  summary += `- Free artificial original silicone breast distribution for breast cancer patients\n`;
  summary += `- Free chemotherapy medicine distribution for breast cancer patients\n`;
  summary += `- Free chemotherapy medicine distribution for ovarian cancer patients\n`;
  summary += `- Blood donation camp organization\n`;
  summary += `- Free distribution of essential materials to government school students\n`;
  summary += `- Free thermal mammography testing programs for breast cancer patients\n\n`;

  try {
    fs.writeFileSync(path.join(process.cwd(), "site-summary.md"), summary);
    console.log("site-summary.md generated successfully with latest CMS data!");
  } catch (error) {
    console.error("Error writing site-summary.md:", (error as Error).message);
  }
}

main().catch((error) => {
  console.error("Script execution failed:", error);
  process.exit(1);
});