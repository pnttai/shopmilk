import React from 'react'
import noDataImage from '../assets/nothinghere.png'

const NoData = () => {
  return (
    <div className='flex flex-col items-center justify-center py-4 gap-2 '>
        <img 
        src={noDataImage}
        alt='No Data'
        className='w-36 h-36' 
        />
        <p className='text-neutral-500'> No Data</p>
    </div>
  )
}

export default NoData