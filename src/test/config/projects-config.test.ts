import { describe, it, expect } from 'vitest';
import { projects } from '@/config/project';

describe('projects config', () => {
  it('has projects', () => {
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it('each project has required fields', () => {
    projects.forEach((project) => {
      expect(project.title).toBeTruthy();
      expect(project.description).toBeTruthy();
      expect(project.image).toMatch(/^\//);
      expect(project.link).toMatch(/^https?:\/\//);
      expect(Array.isArray(project.technologies)).toBe(true);
      expect(project.projectDetailsPageSlug).toMatch(/^\/projects\//);
      expect(typeof project.isWorking).toBe('boolean');
    });
  });

  it('each project has at least one technology', () => {
    projects.forEach((project) => {
      expect(project.technologies.length).toBeGreaterThan(0);
    });
  });

  it('projects with details have a slug', () => {
    projects.forEach((project) => {
      if (project.details) {
        expect(project.projectDetailsPageSlug).toBeTruthy();
      }
    });
  });

  it('no duplicate project titles', () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
