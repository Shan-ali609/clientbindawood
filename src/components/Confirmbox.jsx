import React from 'react'
import { RxCross2 } from "react-icons/rx";

const Confirmbox = ({close , confirm}) => {
  return (
    <div className="fixed z-50 top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded relative py-4">
        <div className='flex justify-between p-3 '>
        <p className='font-semibold'>Delete Category Permanentily</p>
         <RxCross2 onClick={close} className=" cursor-pointer  " />
        </div>
        <p className='my-4 px-3'>Are you sure permanent delete ?</p>
        <div className='flex gap-2 ml-auto w-fit px-4'>
          <button onClick={close} className=' text-red-400  border border-red-400 hover:bg-red-500 rounded px-3 py-2 hover:text-white'>Cancel</button>
          <button onClick={confirm} className=' text-green-400  border border-green-400 rounded hover:bg-green-500 hover:text-white px-3 py-2' >Delete</button>
        </div>
        </div>
        </div>
  )
}

export default Confirmbox