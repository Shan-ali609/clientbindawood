import React from 'react'
import { useSelector } from 'react-redux'
import isAdmin from '../utils/isAdmin'

const Adminpermission = ({children}) => {
    const user = useSelector(state=>state.user)
  return (
    <div>

       {
        isAdmin(user.role) ? children : <p className='bg-red-300 text-red-500 text-center p-3'>You dont have permission</p>
       }

    </div>
  )
}

export default Adminpermission