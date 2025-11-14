/**
 * Script to verify all URLs in programs.ts
 * Uses Firecrawl MCP to check if links are working
 */

import { assistancePrograms, charityOrganizations } from './client/src/data/programs';

// Extract all URLs from programs
const programUrls = assistancePrograms
  .map(p => p.url)
  .filter(Boolean) as string[];

// Extract all URLs from charity organizations
const charityUrls = charityOrganizations
  .flatMap(category => 
    category.organizations
      .map(org => 'url' in org ? org.url : null)
      .filter(Boolean)
  ) as string[];

const allUrls = [...new Set([...programUrls, ...charityUrls])];

console.log('Total URLs to verify:', allUrls.length);
console.log('\nURLs:');
allUrls.forEach((url, index) => {
  console.log(`${index + 1}. ${url}`);
});

// Export for use with Firecrawl
export const urlsToVerify = allUrls;
