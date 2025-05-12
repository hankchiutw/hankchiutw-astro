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

export interface StrapiSkill extends StrapiResourceCommon {
  name: string;
}

export interface StrapiProject extends StrapiResourceCommon {
  title: string;
  description: string;
  url: string;
  skills: StrapiSkill[];
}

export interface StrapiAbout extends StrapiResourceCommon {
  title: string;
  description: string;
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
