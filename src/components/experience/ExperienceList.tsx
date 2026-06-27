import React from 'react'
import {Experience} from "@/config/Experience";
import { ExperienceCard } from '@/components/experience/ExperienceCard';

interface ExperienceListProps {
  experiences: Experience[];
}

export const ExperienceList = ({experiences}:ExperienceListProps) => {
 if(experiences.length ===0){
    return (
        <div className="py-8 text-center">
            <p className='text-muted-foreground'>No Work Experience</p>
        </div>
    )
 }
   return (
    <div>
        {experiences.map((experience:Experience)=>(
            <ExperienceCard key={experience.company} experience={experience} />
        ))}
    </div>
   )
}

