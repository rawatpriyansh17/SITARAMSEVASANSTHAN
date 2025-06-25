const fs = require("fs");
const path = require("path");
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
const dirs = ["app", "components", "content"];
const exts = [".md", ".mdx", ".tsx", ".jsx", ".js", ".ts"];

function extractText(filePath: string): string {
  const content = fs.readFileSync(filePath, "utf8");
  // For markdown, return as is. For code, extract comments and export const/strings.
  if (filePath.endsWith(".md") || filePath.endsWith(".mdx")) return content;
  // Simple extraction: get comments and string literals
  const matches = content.match(/\/\/.*|\/\*[\s\S]*?\*\/|(["'`])(?:(?=(\\?))\2.)*?\1/g);
  return matches ? matches.join("\n") : "";
}

function walk(dir: string): string[] {
  let results: string[] = [];
  fs.readdirSync(dir).forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (exts.some((ext) => file.endsWith(ext))) {
      results.push(filePath);
    }
  });
  return results;
}

function main() {
  let summary = `# Site Content Summary\n\n`;
  for (const dir of dirs) {
    const fullDir = path.join(process.cwd(), dir);
    if (fs.existsSync(fullDir)) {
      const files = walk(fullDir);
      for (const file of files) {
        summary += `## ${file.replace(process.cwd() + "/", "")}\n`;
        const cleanedText = removeTailwindClasses(extractText(file));
        summary += "```\n" + cleanedText.slice(0, 2000) + "\n```\n\n"; // Limit per file
      }
    }
  }
  fs.writeFileSync(path.join(process.cwd(), "site-summary.md"), summary);
  console.log("site-summary.md generated.");
}

main();