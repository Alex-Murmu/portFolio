import React from 'react';

export const mockNextImage = () => {
  jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: React.ComponentProps<'img'>) => {
      const { fill, priority, ...rest } = props as any;
      return React.createElement('img', rest);
    },
  }));
};

export const mockNextViewTransitions = () => {
  jest.mock('next-view-transitions', () => ({
    Link: ({ href, children, className, ...props }: any) =>
      React.createElement('a', { href, className, ...props }, children),
  }));
};
