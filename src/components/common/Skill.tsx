import { Link } from 'next-view-transitions';
import React from 'react';

interface SkillProps {
  name: string;
  href: string;
  children: React.ReactNode;
}

export default function Skill({ name, href, children }: SkillProps) {
  return (
    <Link
      href={href ?? ''}
      target="_blank"
      className="skill-inner-shadow inline-flex items-center self-end rounded-md border border-dashed border-black/20 bg-black/5 px-2 py-1 text-sm text-black dark:border-white/30 dark:bg-white/15 dark:text-white hover:cursor-pointer hover:bg-black/10 hover:text-black dark:hover:bg-white/20 dark:hover:text-white hover:cursor-zoom-in  transition-colors"
    >
      <div className="size-4 flex-shrink-0">{children}</div>
      <p className="ml-1 text-sm font-bold">{name}</p>
    </Link>
  );
}
