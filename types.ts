
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
}

export interface Achievement {
  id: string;
  title: string;
}

export interface Certificate {
  id: string;
  title: string;
  imageUrl: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    headline: string;
    additionalHeadlines: string[];
  };
  bio: {
    text: string;
    email: string;
  };
  skills: {
    frontend: string[];
    backend: string[];
  };
  projects: Project[];
  achievements: Achievement[];
  certificates: Certificate[];
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}
