import { describe, it, expect } from 'vitest';
import { experiences } from '@/config/Experience';

describe('experiences config', () => {
  it('has experiences', () => {
    expect(Array.isArray(experiences)).toBe(true);
    expect(experiences.length).toBeGreaterThan(0);
  });

  it('each experience has required fields', () => {
    experiences.forEach((exp) => {
      expect(exp.company).toBeTruthy();
      expect(exp.position).toBeTruthy();
      expect(exp.location).toBeTruthy();
      expect(exp.image).toMatch(/^\//);
      expect(Array.isArray(exp.description)).toBe(true);
      expect(exp.description.length).toBeGreaterThan(0);
      expect(exp.startDate).toBeTruthy();
      expect(Array.isArray(exp.technologies)).toBe(true);
      expect(typeof exp.isCurrent).toBe('boolean');
    });
  });

  it('current experiences have no endDate', () => {
    experiences.forEach((exp) => {
      if (exp.isCurrent) {
        expect(exp.endDate).toBe('Present');
      }
    });
  });
});
