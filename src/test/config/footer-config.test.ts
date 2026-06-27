import { describe, it, expect } from 'vitest';
import { footerConfig } from '@/config/Footer';

describe('footerConfig', () => {
  it('has developer name', () => {
    expect(footerConfig.developer).toBeTruthy();
  });

  it('has text', () => {
    expect(footerConfig.text).toBeTruthy();
  });

  it('has copyright text', () => {
    expect(footerConfig.copyright).toBeTruthy();
  });
});
