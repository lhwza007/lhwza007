/**
 * Sitemap Generator Script
 * 
 * This script generates a sitemap.xml file for the portfolio website.
 * Run with: npx tsx scripts/generate-sitemap.ts
 * Or add to package.json scripts: "generate-sitemap": "tsx scripts/generate-sitemap.ts"
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Get current directory (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const SITE_URL = 'https://import-mark-from.space';
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Define your pages/routes here
interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const pages: SitemapEntry[] = [
  { path: '/', changefreq: 'weekly', priority: 1.0 },
  // Add more pages here as your site grows:
  // { path: '/about', changefreq: 'monthly', priority: 0.8 },
  // { path: '/projects', changefreq: 'weekly', priority: 0.9 },
  // { path: '/contact', changefreq: 'monthly', priority: 0.7 },
];

// Get current date in YYYY-MM-DD format
function getCurrentDate(): string {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

// Generate sitemap XML content
function generateSitemap(): string {
  const currentDate = getCurrentDate();
  
  const urlEntries = pages.map(page => `
  <url>
    <loc>${SITE_URL}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority.toFixed(1)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlEntries}
</urlset>
`;
}

// Auto-discover pages from React Router or file-based routing (optional)
async function discoverPages(): Promise<void> {
  const pagesDir = path.join(__dirname, '..', 'src', 'pages');
  
  if (fs.existsSync(pagesDir)) {
    console.log('📂 Scanning pages directory...');
    const files = fs.readdirSync(pagesDir);
    
    files.forEach(file => {
      if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        const pageName = file.replace(/\.(tsx|jsx)$/, '');
        const routePath = pageName.toLowerCase() === 'home' || pageName.toLowerCase() === 'index' 
          ? '/' 
          : `/${pageName.toLowerCase()}`;
        
        // Check if already exists in pages array
        if (!pages.some(p => p.path === routePath)) {
          console.log(`  ➕ Found page: ${file} -> ${routePath}`);
          pages.push({
            path: routePath,
            changefreq: 'monthly',
            priority: 0.8
          });
        }
      }
    });
  }
}

// Main execution
async function main(): Promise<void> {
  console.log('🚀 Generating sitemap...\n');
  
  // Optional: Auto-discover pages
  await discoverPages();
  
  console.log('\n📝 Pages to include:');
  pages.forEach(page => {
    console.log(`  • ${SITE_URL}${page.path} (priority: ${page.priority})`);
  });
  
  // Generate and write sitemap
  const sitemapContent = generateSitemap();
  fs.writeFileSync(OUTPUT_PATH, sitemapContent, 'utf-8');
  
  console.log(`\n✅ Sitemap generated successfully!`);
  console.log(`📍 Output: ${OUTPUT_PATH}`);
  console.log(`📊 Total URLs: ${pages.length}`);
}

main().catch(console.error);
