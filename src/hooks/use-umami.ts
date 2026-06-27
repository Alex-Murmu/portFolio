'use client';

type UmamiEvent = {
  name: string;
  data?: Record<string, string | number | boolean>;
};

export function useUmami() {
  const trackEvent = (event: UmamiEvent) => {
    try {
      if (typeof window !== 'undefined' && (window as any).umami) {
        (window as any).umami.track(event.name, event.data);
      }
    } catch (error) {
      console.error('Failed to track Umami event:', error);
    }
  };

  return { trackEvent };
}
