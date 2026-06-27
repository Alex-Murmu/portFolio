import { describe, it, expect } from 'vitest';
import { journeyItems } from '@/config/Journey';

describe('journeyItems', () => {
  it('has items', () => {
    expect(Array.isArray(journeyItems)).toBe(true);
    expect(journeyItems.length).toBeGreaterThan(0);
  });

  it('each item has required fields', () => {
    journeyItems.forEach((item) => {
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();
      expect(item.href).toMatch(/^\//);
      expect(item.icon).toBeDefined();
    });
  });
});
