'use client';

import React, { useState } from 'react';

import Copied from '../svgs/Copied';
import Copy from '../svgs/Copy';

interface CodeCopyButtonProps {
  code: string;
}

export function CodeCopyButton({ code }: CodeCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 rounded-md bg-black/20 p-1.5 text-white opacity-0 transition-opacity hover:bg-black/40 group-hover:opacity-100"
      aria-label={copied ? 'Copied' : 'Copy code'}
    >
      {copied ? <Copied className="size-4" /> : <Copy className="size-4" />}
    </button>
  );
}
