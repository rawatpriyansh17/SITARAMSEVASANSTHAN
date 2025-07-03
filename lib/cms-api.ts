const CMS_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001'|| 'http://localhost:3000';

export interface Post {
  id: number;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string;
  eventPageSlug?: string;
  order: number;
}

export interface Event {
  id: number;
  slug: string;
  heading_en: string;
  heading_hi: string;
  description1_en: string;
  description1_hi: string;
  description2_en: string;
  description2_hi: string;
  photoSubheading_en: string;
  photoSubheading_hi: string;
  videoSubheading_en: string;
  videoSubheading_hi: string;
}

export interface Media {
  id: number;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string;
  heading_en?: string;
  heading_hi?: string;
  description_en?: string;
  description_hi?: string;
  videoType?: 'interview' | 'distribution';
  order: number;
}

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${CMS_BASE_URL}/api/public/posts`, {
      next: { revalidate: 300 } // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array as fallback
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${CMS_BASE_URL}/api/public/events`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch events');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

export async function fetchEventBySlug(slug: string): Promise<{
  event: Event;
  photos: Media[];
  videos: {
    interviews: Media[];
    distributions: Media[];
  };
} | null> {
  try {
    const response = await fetch(`${CMS_BASE_URL}/api/public/events/${slug}`, {
      next: { revalidate: 300 }
    });
    
    if (!response.ok) {
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}