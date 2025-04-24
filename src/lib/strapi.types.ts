/**
 * Type definitions for Strapi API data models
 */

interface StrapiResourceCommon {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface StrapiTag extends StrapiResourceCommon {
  name: string;
}

export interface StrapiArticle extends StrapiResourceCommon {
  documentId: string;
  content: string;
  title: string;
  description: string;
  slug: string;
  tags: StrapiTag[];
}

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

export interface StrapiTechnology {
  id: number;
  attributes: {
    name: string;
    slug?: string;
  };
}

// TODO
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

// TODO
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

// TODO
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
