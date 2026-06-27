'use client';

export function useHapticFeedback() {
  const triggerHaptic = (type: 'light' | 'medium' | 'heavy' = 'medium') => {
    try {
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        const durations = { light: 10, medium: 20, heavy: 40 };
        navigator.vibrate(durations[type]);
      }
    } catch (error) {
      console.error('Haptic feedback failed:', error);
    }
  };

  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  return { triggerHaptic, isMobile };
}
