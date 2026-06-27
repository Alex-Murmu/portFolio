import Container from '@/components/common/Container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/config/project';
import { Link } from 'next-view-transitions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';
import Github from '@/components/svgs/Github';
import Website from '@/components/svgs/Website';
import ArrowLeft from '@/components/svgs/ArrowLeft';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.projectDetailsPageSlug)
    .map((p) => ({
      slug: p.projectDetailsPageSlug.replace('/projects/', ''),
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.projectDetailsPageSlug === `/projects/${slug}`,
  );
  if (!project) return {};
  return {
    title: `${project.title} — Project`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.projectDetailsPageSlug === `/projects/${slug}`,
  );

  if (!project) notFound();

  return (
    <Container className="min-h-screen py-16">
      <article className="mx-auto max-w-4xl">
        {/* Back link */}
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </Button>

        {/* Hero Image */}
        <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          {/* Title & Status */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-4xl leading-tight font-bold lg:text-5xl">
              {project.title}
            </h1>
            <Badge
              variant={project.isWorking ? 'default' : 'secondary'}
              className="text-sm"
            >
              {project.isWorking ? 'Live' : 'Building'}
            </Badge>
          </div>

          <p className="text-xl text-muted-foreground">{project.description}</p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            {project.live && (
              <Button asChild>
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Website className="size-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild>
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="size-4" />
                  Source Code
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Technologies */}
        <div className="mb-8">
          <div className="rounded-lg border bg-muted/20 p-4">
            <h3 className="mb-3 text-lg font-semibold">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="inline-flex items-center gap-2 rounded-full bg-muted/50 px-3 py-1.5 text-sm font-medium"
                >
                  <span className="size-4">{tech.icon}</span>
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Links */}
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <Link href={project.link} target="_blank">
              <Website className="size-4" />
              Visit Website
            </Link>
          </Button>
        </div>
      </article>
    </Container>
  );
}
