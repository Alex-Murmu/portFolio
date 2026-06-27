import Image from 'next/image'
import React from 'react'
import {ex} from "@/config/Experience"
import {cn} from "@/lib/utils"
import { Tooltip,TooltipContent,TooltipTrigger } from '@/components/ui/tooltip'
import { Link } from 'next-view-transitions'
import Website from '@/components/svgs/Website'
import X from '@/components/svgs/X'
import Github from '@/components/svgs/Github'
import { Sskill } from '../blog/page'

const parseDescription = (text: string): string => {
  return text.replace(/\*(.*?)\*/g, '<b>$1</b>');
};

const Contact = () => {
  return (
    <div className="flex flex-col  items-center">
        {/*compnay Header*/}
        <div className="flex  gap-4">
          {/*left */ }
          <div className="flex items-center gap-4">
              <Image
               src={ex.image}
               alt={ex.company}
               width={100}
               height={100}
               className="rounded-md size-12"
               />
               <div className="flex flex-col">
              <div className="flex items-center gap-2">
                  <h1 className={cn('text-xl font-semibold',ex.isBlur ?'blur-[5px]':'blur-none')}>{ex.company}</h1>
                  {ex.website && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link 
                          href={ex.website}
                          target="_blank"
                          className="size-5 text-neutral-500"
                        >
                          <Website />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Visit Website</TooltipContent>
                    </Tooltip>
                  )}
                  {ex.website && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link 
                          href={ex.x}
                          target="_blank"
                          className="size-5 text-neutral-500"
                        >
                          <X />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Follow on  x</TooltipContent>
                    </Tooltip>
                  )}
                   {ex.website && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link 
                          href={ex.x}
                          target="_blank"
                          className="size-5 text-neutral-500"
                        >
                          <Github />
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>Visit Codebase</TooltipContent>
                    </Tooltip>
                  )}
                   {ex.isCurrent && (
                    <div className="flex  items-center border justify-between border-green-300 bg-green-500/10 text-sm rounded-lg px-4">
                      <div className='bg-green-800 h-2 w-2 rounded-full'></div>
                      Working here currently
                    </div>
                  )}
                  </div>
                  <p className='text-primary text-lg'>{ex.position}</p>

              </div>
              
          </div>

          {/*right */ }
          <div className="text-primary flex flex-col md:text-right text-md">
            <p>{ex.startDate}-- {ex.endDate}</p>
            <p>{ex.location}</p>
          </div>
        </div>
        {/*Technology*/}
        <div>
          <h4 className='tex-md mt-4 mb-2 font-semibold '>Techonology</h4>
          <div>
            {ex.technologies.map((tech,index)=>(
              <Sskill 
                key={index}
                name={tech.name}
                href={tech.href}
              >
                <div className=''>{tech.icon}</div>
              </Sskill>
            ))}
          </div>
        </div>
         
        <div>
          {ex.description.map(
          (description: string, descIndex: number) => (
            <p
              key={descIndex}
              dangerouslySetInnerHTML={{
                __html: `• ${parseDescription(description)}`,
              }}
            />
          ),
        )}
        </div>
    </div>
  )
}

export default Contact