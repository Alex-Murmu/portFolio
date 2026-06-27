'use client';

import { useUmami } from '@/hooks/use-umami';
import { Link } from 'next-view-transitions';
import React from 'react';

interface TrackEvent {
  name: string;
  data?: Record<string, string | number | boolean>;
}

interface TrackedLinkProps
  extends React.ComponentProps<typeof Link> {
  track?: TrackEvent;
}

export function TrackedLink({
  href,
  children,
  track,
  className,
  ...props
}: TrackedLinkProps) {
  const { trackEvent } = useUmami();

  const handleClick = () => {
    if (track) {
      trackEvent({ name: track.name, data: track.data });
    }
  };

  return (
    <Link href={href} className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
