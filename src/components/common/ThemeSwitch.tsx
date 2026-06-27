'use client';

import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import React, { useCallback, useEffect, useState } from 'react';

import Moon from '../svgs/Moon';
import Sun from '../svgs/Sun';
import { Button } from '../ui/button';

export const useThemeToggle = ({
  variant = 'circle',
  start = 'center',
  blur = false,
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
} = {}) => {
  const { setTheme, resolvedTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(resolvedTheme === 'dark');
  }, [resolvedTheme]);

  const styleId = 'theme-transition-styles';

  const updateStyles = useCallback((css: string) => {
    if (typeof window === 'undefined') return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);

    const animation = createAnimation(variant, start, blur);

    updateStyles(animation.css);

    if (typeof window === 'undefined') return;

    const switchTheme = () => {
      setTheme(isDark ? 'light' : 'dark');
    };

    if (!document.startViewTransition) {
      switchTheme();
      return;
    }

    document.startViewTransition(switchTheme);
  }, [setTheme, variant, start, blur, updateStyles, isDark]);

  return { isDark, toggleTheme };
};

export const ThemeToggleButton = ({
  className = '',
  variant = 'circle',
  start = 'center',
  blur = false,
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({ variant, start, blur });

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className={cn(
        'size-10 cursor-pointer p-0 transition-all duration-300 active:scale-95',
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
    </Button>
  );
};

export type AnimationVariant = 'circle' | 'rectangle' | 'polygon' | 'circle-blur';
export type AnimationStart =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case 'top-left': return { cx: '0', cy: '0' };
    case 'top-right': return { cx: '40', cy: '0' };
    case 'bottom-left': return { cx: '0', cy: '40' };
    case 'bottom-right': return { cx: '40', cy: '40' };
    case 'center': return { cx: '20', cy: '20' };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  if (variant === 'circle-blur') {
    const { cx, cy } = getPositionCoords(start);
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="${cx}" cy="${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>`;
  }

  if (start === 'center') return;

  const { cx, cy } = getPositionCoords(start);

  if (variant === 'circle') {
    return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="${cx}" cy="${cy}" r="20" fill="white"/></svg>`;
  }

  return '';
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case 'top-left': return 'top left';
    case 'top-right': return 'top right';
    case 'bottom-left': return 'bottom left';
    case 'bottom-right': return 'bottom right';
    case 'center': return 'center';
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = 'center',
  blur = false,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === 'rectangle') {
    const clipFrom = start === 'bottom-right'
      ? 'polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)'
      : 'polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)';
    const clipTo = 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)';

    return {
      name: `theme-transition-${variant}-${start}`,
      css: `
        ::view-transition-old(root) {
          animation: 0.4s ease-in both fade-out;
          clip-path: ${clipFrom};
        }
        ::view-transition-new(root) {
          animation: 0.4s ease-in both fade-in;
          clip-path: ${clipTo};
        }
      `,
    };
  }

  if (svg) {
    return {
      name: `theme-transition-${variant}-${start}`,
      css: `
        ::view-transition-old(root) {
          mask: url('${svg}') ${start} / 0 no-repeat;
          animation: scale 0.5s both;
          transform-origin: ${transformOrigin};
        }
        ::view-transition-new(root) {
          mask: url('${svg}') ${start} / 0 no-repeat;
          animation: scale 0.5s both;
          transform-origin: ${transformOrigin};
        }
        @keyframes scale {
          to { mask-size: 350vmax; }
        }
      `,
    };
  }

  return {
    name: `theme-transition-${variant}-${start}`,
    css: `
      ::view-transition-old(root) {
        animation: 0.4s ease-in both fade-out;
      }
      ::view-transition-new(root) {
        animation: 0.4s ease-in both fade-in;
      }
    `,
  };
};
