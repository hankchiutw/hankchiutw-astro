import Strapi from 'strapi-sdk-js';
import type { StrapiOptions } from 'strapi-sdk-js';

import type { StrapiAbout, StrapiArticle, StrapiProject } from './strapi.types';

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
  console.error('Strapi error:', error);
  return null;
};

/**
 * Fetch posts from Strapi with optional filters
 * @param {Object} filters - Query filters
 * @returns {Promise<Array>} - Posts data
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
 * @returns {Promise<StrapiProject[]>} - Projects data
 */
export async function getProjects(): Promise<StrapiProject[]> {
  try {
    const query = qs.stringify(
      {
        populate: ['thumbnail', 'technologies'],
        sort: ['order:asc'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    // @ts-ignore - The get method exists at runtime but TypeScript doesn't recognize it
    const response = await strapi.get(`/projects?${query}`);

    if (response.data) {
      return response.data;
    }

    return [];
  } catch (error) {
    console.error('Error fetching projects from Strapi:', error);
    return [];
  }
}

/**
 * Fetch about page content from Strapi
 * @returns {Promise<StrapiAbout|null>} - About page data
 */
export async function getAboutContent(): Promise<StrapiAbout | null> {
  try {
    const query = qs.stringify(
      {
        populate: ['portrait', 'skills', 'experiences', 'education'],
      },
      {
        encodeValuesOnly: true,
      }
    );

    // @ts-ignore - The get method exists at runtime but TypeScript doesn't recognize it
    const response = await strapi.get(`/about?${query}`);

    if (response.data) {
      return response.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching about content from Strapi:', error);
    return null;
  }
}
