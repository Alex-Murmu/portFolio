import Container from '@/components/common/Container'
import SectionHeading from '@/components/common/SectionHeading'
import { ProjectList } from '@/components/projects/ProjectList'
import { projects } from '@/config/project'
import React from 'react'

const page = () => {
  return (
    <Container className="min-h-screen py-16">
      <SectionHeading subHeading="All" heading="Projects" />
      <ProjectList className="mt-8" projects={projects} />
    </Container>
  );
}

export default page