import React from 'react'
import UserMenu from '../components/UserMenu'
import { RiCloseLargeFill } from "react-icons/ri";
const UserMenuMobile = () => {
  return (
    <div className=' bg-white h-screen p-5'>
        <div className='w-fit ml-auto ' onClick={()=>window.history.back()}>
        <RiCloseLargeFill />
        </div>
        <UserMenu  />
    </div>
  )
}

export default UserMenuMobile