import React from 'react';
import { vi } from 'vitest'; // Import vi from vitest
export const mockNextImage = () => {
  vi.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ComponentProps<'img'>) => {
      const { fill, priority, ...rest } = props as any;
      return React.createElement('img', rest);
    },
  }));
};

export const mockNextViewTransitions = () => {
  vi.mock('next-view-transitions', () => ({
    Link: ({ href, children, className, ...props }: any) =>
      React.createElement('a', { href, className, ...props }, children),
  }));
};
