import type { BlogPost } from '@/lib/blog';
import { format } from 'date-fns';
import { Link } from 'next-view-transitions';
import React from 'react';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block"
    >
      <div className="flex h-full flex-col rounded-xl border border-border p-6 transition-all duration-200 hover:bg-muted/50">
        <div className="flex-1">
          <h3 className="text-lg font-semibold group-hover:text-primary">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <time className="text-xs text-muted-foreground">
            {post.date
              ? format(new Date(post.date), 'MMM dd, yyyy')
              : ''}
          </time>
          <div className="flex gap-1">
            {post.tags?.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
