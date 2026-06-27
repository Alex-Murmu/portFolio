import { describe, it, expect } from 'vitest';
import { heroConfig, socialLinks, skillComponents } from '@/config/Hero';

describe('heroConfig', () => {
  it('has a name', () => {
    expect(heroConfig.name).toBeTruthy();
    expect(typeof heroConfig.name).toBe('string');
  });

  it('has a title', () => {
    expect(heroConfig.title).toBeTruthy();
  });

  it('has an avatar path', () => {
    expect(heroConfig.avatar).toMatch(/^\//);
  });

  it('has skills array', () => {
    expect(Array.isArray(heroConfig.skills)).toBe(true);
    expect(heroConfig.skills.length).toBeGreaterThan(0);
  });

  it('each skill has required fields', () => {
    heroConfig.skills.forEach((skill) => {
      expect(skill.name).toBeTruthy();
      expect(skill.href).toMatch(/^https?:\/\//);
      expect(skill.component in skillComponents).toBe(true);
    });
  });

  it('has description template', () => {
    expect(heroConfig.description.template).toBeTruthy();
  });

  it('has buttons with required fields', () => {
    expect(Array.isArray(heroConfig.buttons)).toBe(true);
    heroConfig.buttons.forEach((btn) => {
      expect(btn.text).toBeTruthy();
      expect(btn.href).toMatch(/^\//);
      expect(['outline', 'default']).toContain(btn.variant);
    });
  });
});

describe('socialLinks', () => {
  it('has all 4 social links', () => {
    expect(socialLinks.length).toBe(4);
  });

  it('each link has name, href, and icon', () => {
    socialLinks.forEach((link) => {
      expect(link.name).toBeTruthy();
      expect(link.href).toMatch(/^https?:\/\/|mailto:/);
      expect(link.icon).toBeTruthy();
    });
  });
});

describe('skillComponents', () => {
  it('maps component names to components', () => {
    expect(skillComponents.TypeScript).toBeDefined();
    expect(skillComponents.ReactIcon).toBeDefined();
    expect(skillComponents.NextJs).toBeDefined();
  });
});
