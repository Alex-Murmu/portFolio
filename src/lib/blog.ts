import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  published: boolean;
  tags: string[];
  thumbnail?: string;
  content: string;
}

const blogDirectory = path.join(process.cwd(), 'src', 'data', 'blog');

export function getBlogPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) return [];
  return fs.readdirSync(blogDirectory).filter((file) => file.endsWith('.mdx'));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.mdx`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || slug,
      description: data.description || '',
      date: data.date || '',
      published: data.published ?? true,
      tags: data.tags || [],
      thumbnail: data.thumbnail || '',
      content,
    };
  } catch {
    return null;
  }
}

export function getAllBlogPosts(): BlogPost[] {
  const slugs = getBlogPostSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug.replace(/\.mdx$/, '')))
    .filter((post): post is BlogPost => post !== null);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getPublishedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.published);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getPublishedBlogPosts().filter((post) => post.tags.includes(tag));
}

export function getAllTags(): string[] {
  const posts = getPublishedBlogPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getRelatedPosts(currentSlug: string, limit = 2): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  const posts = getPublishedBlogPosts().filter(
    (post) => post.slug !== currentSlug,
  );

  const scored = posts.map((post) => {
    const commonTags = post.tags.filter((tag) =>
      currentPost.tags.includes(tag),
    ).length;
    return { post, score: commonTags };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
