import Strapi from 'strapi-sdk-js';
import type { StrapiOptions, StrapiResponse } from 'strapi-sdk-js';

import type { StrapiAbout, StrapiArticle, StrapiExperience, StrapiProject } from './strapi.types';

// Initialize Strapi client
const strapiOptions: StrapiOptions = {
  url: import.meta.env.STRAPI_API_URL || 'http://localhost:1337',
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {
    headers: {
      authorization: `Bearer ${import.meta.env.STRAPI_API_TOKEN}`,
    },
  },
};

const strapi = new Strapi(strapiOptions);

const errorHandler = (error: unknown) => {
  console.error('lib/strapi error:', error);
  return null;
};

/**
 * Fetch posts from Strapi with optional filters
 */
export async function getPosts(filters = {}): Promise<StrapiArticle[]> {
  const options = {
    populate: ['tags'],
    sort: ['publishedAt:desc'],
    ...filters,
  };

  const response = await strapi.find<StrapiArticle>('articles', options).catch(errorHandler);

  return response?.data || [];
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post data
 */
export async function getPostBySlug(slug: string): Promise<StrapiArticle | null> {
  const options = {
    filters: {
      slug: {
        $eq: slug,
      },
    },
  };

  const response = await strapi.find<StrapiArticle>('articles', options).catch(errorHandler);

  return response?.data?.[0] || null;
}

/**
 * Fetch projects from Strapi
 */
export async function getProjects(): Promise<StrapiProject[]> {
  const options = {
    populate: ['skills'],
    sort: ['publishedAt:desc'],
  };

  const response = await strapi.find<StrapiProject>('projects', options).catch(errorHandler);

  return response?.data || [];
}

/**
 * Fetch experiences from Strapi
 */
export async function getAbout(): Promise<StrapiAbout | null> {
  const response = await strapi.request<StrapiResponse<StrapiAbout>>('get', '/about').catch(errorHandler);

  return response?.data || null;
}

/**
 * Fetch experiences from Strapi
 */
// TODO
export async function getExperiences(): Promise<StrapiExperience[]> {
  const options = {
    sort: ['publishedAt:desc'],
  };

  const response = await strapi.find<StrapiExperience>('experiences', options).catch(errorHandler);

  return response?.data || [];
}
