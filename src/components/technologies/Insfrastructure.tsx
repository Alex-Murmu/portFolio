import React from 'react';

export default function Infrastructure() {
  return (
    <svg viewBox="0 0 128 128" width="1em" height="1em" fill="none" stroke="#107C41" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
      {/* Top Server Rack */}
      <rect x="16" y="16" width="96" height="28" rx="4" fill="#107C41" fillOpacity="0.1" />
      <line x1="36" y1="30" x2="40" y2="30" strokeWidth="10" />
      <line x1="92" y1="30" x2="96" y2="30" />
      
      {/* Bottom Server Rack */}
      <rect x="16" y="68" width="96" height="28" rx="4" fill="#107C41" fillOpacity="0.1" />
      <line x1="36" y1="82" x2="40" y2="82" strokeWidth="10" />
      <line x1="92" y1="82" x2="96" y2="82" />
    </svg>
  );
}