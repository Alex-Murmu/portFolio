import React from 'react';

export default function Web() {
  return (
    <svg viewBox="0 0 128 128" width="1em" height="1em">
      <circle cx="64" cy="64" r="56" fill="none" stroke="#0074BC" strokeWidth="8" />
      <path 
        d="M8 64h112M64 8a114 114 0 0 1 0 112M64 8a114 114 0 0 0 0 112" 
        fill="none" 
        stroke="#0074BC" 
        strokeWidth="8" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20 32h88M20 96h88" 
        fill="none" 
        stroke="#0074BC" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
    </svg>
  );
}