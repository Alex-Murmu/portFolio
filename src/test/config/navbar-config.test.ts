import { describe, it, expect } from 'vitest';
import { navbarConfig } from '@/config/Navbar';

describe('navbarConfig', () => {
  it('has a logo with src, alt, width, height', () => {
    expect(navbarConfig.logo.src).toMatch(/^\//);
    expect(navbarConfig.logo.alt).toBeTruthy();
    expect(navbarConfig.logo.width).toBeGreaterThan(0);
    expect(navbarConfig.logo.height).toBeGreaterThan(0);
  });

  it('has nav items', () => {
    expect(Array.isArray(navbarConfig.navItems)).toBe(true);
    expect(navbarConfig.navItems.length).toBeGreaterThan(0);
  });

  it('each nav item has label and href', () => {
    navbarConfig.navItems.forEach((item) => {
      expect(item.label).toBeTruthy();
      expect(item.href).toMatch(/^\//);
    });
  });
});
