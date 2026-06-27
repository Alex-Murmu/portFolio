import React from 'react'

interface SectionHeading {
    subHeading:string,
    heading:string
}
const SectionHeading = ({subHeading,heading}:SectionHeading) => {
  return (
    <div className='flex justify-center font-bold items-center gap-4 flex-col'>
   <p className='text-primary text-lg'>{subHeading}</p>
   <h1 className='text-[42px] font-bold'>{heading}</h1>
    </div>
  )
}

export default SectionHeading