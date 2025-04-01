import Strapi from 'strapi-sdk-js';
import type { StrapiOptions } from 'strapi-sdk-js';
import qs from 'qs';
import type { StrapiProject, StrapiAbout } from './strapi.types';

// Initialize Strapi client
const strapiOptions: StrapiOptions = {
  url: process.env.STRAPI_API_URL || 'http://localhost:1337',
  prefix: '/api',
  store: {
    key: 'strapi_jwt',
    useLocalStorage: false,
    cookieOptions: { path: '/' },
  },
  axiosOptions: {},
};

const strapi = new Strapi(strapiOptions);

/**
 * Fetch posts from Strapi with optional filters
 * @param {Object} filters - Query filters
 * @returns {Promise<Array>} - Posts data
 */
export async function getPosts(filters = {}) {
  try {
    const query = qs.stringify({
      populate: ['cover', 'author', 'categories'],
      sort: ['publishedAt:desc'],
      ...filters,
    }, {
      encodeValuesOnly: true,
    });

    // @ts-ignore - The get method exists at runtime but TypeScript doesn't recognize it
    const response = await strapi.get(`/posts?${query}`);
    
    if (response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching posts from Strapi:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} - Post data
 */
export async function getPostBySlug(slug: string) {
  try {
    const query = qs.stringify({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: ['cover', 'author', 'categories', 'blocks'],
    }, {
      encodeValuesOnly: true,
    });

    // @ts-ignore - The get method exists at runtime but TypeScript doesn't recognize it
    const response = await strapi.get(`/posts?${query}`);
    
    if (response.data && response.data.length > 0) {
      return response.data[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

/**
 * Fetch projects from Strapi
 * @returns {Promise<StrapiProject[]>} - Projects data
 */
export async function getProjects(): Promise<StrapiProject[]> {
  try {
    const query = qs.stringify({
      populate: ['thumbnail', 'technologies'],
      sort: ['order:asc'],
    }, {
      encodeValuesOnly: true,
    });

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
export async function getAboutContent(): Promise<StrapiAbout|null> {
  try {
    const query = qs.stringify({
      populate: ['portrait', 'skills', 'experiences', 'education'],
    }, {
      encodeValuesOnly: true,
    });

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