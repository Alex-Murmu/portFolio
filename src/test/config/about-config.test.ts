import { describe, it, expect } from 'vitest';
import { about, mySkills } from '@/config/About';

describe('about config', () => {
  it('has a name', () => {
    expect(about.name).toBeTruthy();
  });

  it('has a description', () => {
    expect(about.description).toBeTruthy();
  });

  it('has skills array', () => {
    expect(Array.isArray(mySkills)).toBe(true);
    expect(mySkills.length).toBeGreaterThan(0);
  });

  it('each skill has a key', () => {
    mySkills.forEach((skill) => {
      expect(skill.key).toBeTruthy();
    });
  });
});
