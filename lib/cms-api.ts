const CMS_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3001';

export interface Post {
  id: number;
  title_en: string;
  title_hi: string;
  description_en: string;
  description_hi: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  thumbnailUrl?: string; // Make sure this is included
  eventPageSlug?: string;
  isActive: boolean;
  order: number;
}

export interface Event {
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
}

export interface Media {
  id: number;
  eventId: number;
  type: 'photo' | 'video';
  url: string;
  thumbnailUrl?: string; // Make sure this is included
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add these for better CORS handling
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function fetchEvents(): Promise<Event[]> {
  try {
    const response = await fetch(`${CMS_BASE_URL}/api/public/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const events = await response.json();
    return events;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw new Error('Failed to fetch events');
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
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      credentials: 'omit',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching event:', error);
    return null;
  }
}