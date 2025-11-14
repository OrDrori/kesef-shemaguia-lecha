/**
 * API client for Cloudflare Workers backend
 * 
 * This module provides functions to interact with the backend API
 * for analytics, contact forms, and other features.
 */

// API URL will be set after Workers deployment
// For now, we'll use a placeholder that can be updated
const API_URL = import.meta.env.VITE_API_URL || 'https://kesef-shemaguia-lecha-api.v602000-9480.workers.dev';

/**
 * Track questionnaire completion
 * Sends anonymous analytics data to the backend
 */
export async function trackCompletion(answers: Record<string, any>) {
  try {
    const response = await fetch(`${API_URL}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'questionnaire_completed',
        answers,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn('Analytics tracking failed:', response.statusText);
    }
  } catch (error) {
    // Silently fail - analytics should not break the user experience
  }
}

/**
 * Track Level 2 questionnaire completion
 */
export async function trackLevel2Completion(answers: Record<string, any>) {
  try {
    const response = await fetch(`${API_URL}/api/analytics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'level2_completed',
        answers,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.warn('Level 2 analytics tracking failed:', response.statusText);
    }
  } catch (error) {
    // Silently fail - analytics should not break the user experience
  }
}

/**
 * Submit contact form
 */
export async function submitContact(data: { name: string; email: string; message: string }) {
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    return { success: true };
  } catch (error) {
    console.error('Contact form error:', error);
    throw error;
  }
}

/**
 * Get usage statistics (for admin/public display)
 */
export async function getStats() {
  try {
    const response = await fetch(`${API_URL}/api/stats`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }

    return await response.json();
  } catch (error) {
    // Silently fail - return fallback value
    return { total: 0 };
  }
}
