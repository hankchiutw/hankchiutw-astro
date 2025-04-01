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
    endDate?: string | null;
    current?: boolean;
    description: string;
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