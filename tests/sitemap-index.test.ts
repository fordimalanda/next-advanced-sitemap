/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import { describe, it, expect } from 'vitest';
import { buildSitemapIndexXml } from '../src/core/builders/index-builder.js';
import { SitemapIndexEntry } from '../src/types/sitemap.js';

describe('v1.2.2 Sitemap Index XML Namespace & Validation Suite', () => {

  it('should inject the correct authoritative XML namespace schema for sitemapindex', () => {
    const entries: SitemapIndexEntry[] = [
      { loc: 'https://fomadev.com/sitemap-products.xml' }
    ];

    const xml = buildSitemapIndexXml(entries);

    // Assertions v1.2.2
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('</sitemapindex>');
  });

  it('should fallback natively from url property to loc and pass validation', () => {
    const entries: any[] = [
      { url: 'https://fomadev.com/sitemap-fallback.xml', lastmod: '2026-07-05T00:00:00.000Z' }
    ];

    const xml = buildSitemapIndexXml(entries);
    expect(xml).toContain('<loc>https://fomadev.com/sitemap-fallback.xml</loc>');
  });

  it('should throw strict validation error for invalid index URLs', () => {
    const badEntries: SitemapIndexEntry[] = [
      { loc: 'https://fomadev.com/invalid space sitemap.xml' }
    ];

    // Correction v1.2.2 : Alignement avec le message d'erreur précis du validateur d'URL
    expect(() => buildSitemapIndexXml(badEntries)).toThrowError(
      '[next-advanced-sitemap] Malformed URL structure detected in sitemap index location'
    );
  });
});