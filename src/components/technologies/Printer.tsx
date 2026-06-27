import React from 'react';

export default function Printer() {
  return (
    <svg viewBox="0 0 128 128" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
      {/* Printer Body */}
      <path d="M32 48h64a12 12 0 0 1 12 12v36a12 12 0 0 1-12 12H32a12 12 0 0 1-12-12V60a12 12 0 0 1 12-12z" fill="#107C41" stroke="#107C41" fillOpacity="0.1" />
      {/* Top Paper Tray */}
      <path d="M40 48V16h48v32" />
      {/* Bottom Output Paper */}
      <path d="M40 88h48v24H40z" fill="white" />
      {/* Status Light/Button */}
      <circle cx="92" cy="68" r="2" fill="currentColor" strokeWidth="2" />
    </svg>
  );
}