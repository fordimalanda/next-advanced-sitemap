/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import { SitemapIndexEntry } from '../../types/sitemap.js';
import { escapeXml } from '../../utils/xml-escape.js';
import { sanitizeAndValidateUrl } from './url-builder.js';

/**
 * Génère la structure brute XML pour un fichier d'indexation de sitemaps.
 * v1.2.2 : Injection automatique de l'espace de nommage (xmlns) valide et validation syntaxique stricte.
 */
export function buildSitemapIndexXml(entries: SitemapIndexEntry[]): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  // v1.2.2 : Namespace officiel universel pour sitemapindex (valide pour Google, Bing, DuckDuckGo)
  xml += `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of entries) {
    // Normalisation préventive
    const targetLoc = entry.loc || (entry as any).url || '';
    
    // Validation syntaxique stricte v1.0.4 appliquée aux index (v1.2.1)
    const cleanLoc = sanitizeAndValidateUrl(targetLoc, 'sitemap index location');
    
    xml += `  <sitemap>\n`;
    xml += `    <loc>${escapeXml(cleanLoc)}</loc>\n`;
    
    if (entry.lastmod) {
      const date = entry.lastmod instanceof Date ? entry.lastmod.toISOString() : entry.lastmod;
      xml += `    <lastmod>${date}</lastmod>\n`;
    }
    
    xml += `  </sitemap>\n`;
  }

  xml += `</sitemapindex>`;
  return xml;
}