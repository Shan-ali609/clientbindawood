import React from 'react'
import noDataImage from '../assets/nothing here yet.webp'
 const Nodata = () => {
  return (
    <div className='flex items-center content-center mx-auto p-9'>
        <div className='flex flex-col'>
        <img
        alt='no data'
        src= {noDataImage}
        className='w-36'
        />
  
    <p>
        No data Availabel
    </p>
    </div>
    </div>
  )
}

export default Nodata