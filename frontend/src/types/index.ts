export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
}

export interface Project {
  id: string;
  category: string;
  title: string;
  thumbnail: string;
  featured?: boolean;
}