export interface Profile {
  name: string;
  email: string; // Used by contact section
  cvUrl: string; // Url for view pdf vutton
  tagline: string;
  about: string[]; // Multiple paragraphs
  links: { label: string; href: string }[];
}

export type EntryType = 'work' | 'education' | 'volunteering';

export interface Job {
  type: EntryType;
  role: string;
  company: string;
  companyUrl?: string;
  start: string; // "2022" || "2022-09" (YYYY-MM)
  end: string; // "2024" || "2024-06" || "Present"
  summary: string;
  highlights?: string[];
  tags?: string[];
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  sourceUrl: string;
  liveUrl?: string; // optional second button
  icon?: string; // optional app icon shown alongside title
  images?: { src: string; alt: string }[]; // slideshow, used when there is no video
  video?: ProjectVideo; // autoplaying demo
}

export interface ProjectVideo {
  webm: string; // supporting browsers get the smaller AV1 file
  mp4: string; // h264 fallback
  poster: string;
  alt: string;
}
