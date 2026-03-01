import { LucideIcon } from 'lucide-react';

export enum SocialType {
  GITHUB = 'GITHUB',
  LINKEDIN = 'LINKEDIN',
  LEETCODE = 'LEETCODE',
  EMAIL = 'EMAIL',
  RESUME = 'RESUME'
}

export interface SocialLink {
  type: SocialType;
  url: string;
  label: string;
  username?: string;
  stats?: string;
  icon: LucideIcon;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  overview: string;
  features: string[];
  decisions?: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
    architecture?: string;
  };
  featured: boolean;
}

export interface SkillCategory {
  title: string;
  skills: string[];
  icon: LucideIcon;
}

export interface CaseStudy {
  title: string;
  topics: string[];
  description: string;
  link?: string;
  details?: string;
  architectureDiagram?: string;
  challenges?: string[];
  technologies?: string[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}