/**
 * Type definitions for Strapi API data models
 */

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        thumbnail: {
          url: string;
        };
        small: {
          url: string;
        };
        medium: {
          url: string;
        };
        large: {
          url: string;
        };
      };
      url: string;
    };
  };
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug?: string;
  };
}

export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    bio?: string;
    avatar?: StrapiImage;
  };
}

export interface StrapiPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    description: string;
    content?: string;
    publishedAt: string;
    cover?: StrapiImage;
    author?: {
      data: StrapiAuthor;
    };
    categories?: {
      data: StrapiCategory[];
    };
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTechnology {
  id: number;
  attributes: {
    name: string;
    slug?: string;
  };
}

export interface StrapiProject {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug?: string;
    projectUrl: string;
    thumbnail?: StrapiImage;
    technologies: {
      data: StrapiTechnology[];
    };
    featured?: boolean;
    order?: number;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiSkill {
  id: number;
  attributes: {
    name: string;
    level?: number;
  };
}

export interface StrapiExperience {
  id: number;
  attributes: {
    position: string;
    company: string;
    startDate: string;
    endDate?: string;
    current?: boolean;
    description: string | string[];
  };
}

export interface StrapiAbout {
  id: number;
  attributes: {
    title: string;
    introduction: string;
    portrait?: StrapiImage;
    skills: {
      data: StrapiSkill[];
    };
    experiences: {
      data: StrapiExperience[];
    };
    education?: {
      data: any[];
    };
    createdAt: string;
    updatedAt: string;
  };
}
