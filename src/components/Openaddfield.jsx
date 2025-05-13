import React from 'react'
import { GiCancel } from "react-icons/gi";
const Openaddfield = ({close,value,onChange,submit}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 bg-neutral-600 z-50 flex items-center content-center rounded' >
       <div className='bg-white   max-w-4xl mx-auto w-full rounded px-3 py-5'>
        <div className='flex justify-between'> 
        Add Field
        <button onClick={close}>
        <GiCancel className='cursor-pointer' />
        </button>
        </div>
        
        <div className='flex flex-col gap-2'>
        <input 
         value={value}
         onChange={onChange}
         placeholder='Enter field name'
         className='outline-none border w-full border-primary-200 p-1 mt-3 '
       />

       <button onClick={submit} className='bg-primary-200 px-4 py-2 border border-primary-200 inline-block w-fit rounded'> Add field</button>
        </div>

       </div>
     
    </div>
  )
}

export default Openaddfield
