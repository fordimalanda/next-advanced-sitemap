/* * Copyright (c) 2026 Fordi / FomaDev. 
 * Licensed under FomaDev Public License.
 * See LICENSE file in the project root for full license information.
 */

import { describe, it, expect } from 'vitest';
import { generateXml } from '../src/core/generator';

describe('URL Validation', () => {
  it('should throw an error if main URL is invalid', () => {
    const entries = [{ url: 'invalid-url' }];
    expect(() => generateXml(entries as any)).toThrow('[next-advanced-sitemap] Invalid URL');
  });

  it('should throw an error if image URL is invalid', () => {
    const entries = [
      { 
        url: 'https://fomadev.com',
        images: [{ loc: '/internal/image.png' }] // Manque http/https
      }
    ];
    expect(() => generateXml(entries as any)).toThrow('image location');
  });

  it('should pass if URLs are correct', () => {
    const entries = [{ url: 'https://fomadev.com' }];
    expect(() => generateXml(entries)).not.toThrow();
  });
});