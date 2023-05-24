import React from 'react';
import { BallCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';

const Tech = () => {
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((techonology)=> (
        <div className='w-28 h-28' key={techonology.name}>
          <BallCanvas icon={techonology.icon} />
        </div>
      ))}

    </div>
  )
}

export default SectionWrapper(Tech, 'tech');