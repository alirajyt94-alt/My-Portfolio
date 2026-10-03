export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'Cloud & Systems' | 'Web Platforms' | 'AI & Spatial' | 'Open Source';
  year: string;
  clientOrDomain: string;
  role: string;
  image: string;
  featured?: boolean;
  liveUrl?: string;
  githubUrl?: string;
  summary: string;
  challenge: string;
  solution: string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  keyHighlights: string[];
}

export interface WorkExperience {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
  skills: string[];
}

export interface SkillGroup {
  category: string;
  skills: { name: string; level: string }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
}

export interface SentMessage extends ContactFormData {
  id: string;
  timestamp: string;
}
