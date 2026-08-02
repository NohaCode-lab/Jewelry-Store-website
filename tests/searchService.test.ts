import { describe, it, expect } from 'vitest';
import { searchService } from '../src/features/search/search.service';

describe('searchService Fuse.js Fuzzy Engine', () => {
  it('finds exact title matches', () => {
    const results = searchService.search('Solitaire');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.title).toContain('Solitaire');
  });

  it('handles typos with fuzzy matching', () => {
    // Intentional typo: "Saphire" vs "Sapphire"
    const results = searchService.search('Saphire');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].item.title).toContain('Sapphire');
  });

  it('filters results by category', () => {
    const results = searchService.search('Diamond', { category: 'crowns' });
    expect(results.every((r) => r.item.category === 'crowns')).toBe(true);
  });
});
