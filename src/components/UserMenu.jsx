import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { VscLinkExternal } from "react-icons/vsc";
import Divider from './Divider';
import { Link, useNavigate } from 'react-router-dom';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { logout } from '../store/userSlice';
import toast from 'react-hot-toast';
import isAdmin from '../utils/isAdmin';

const UserMenu = ({close}) => {
    const user = useSelector((state)=>state.user)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handlelogout = async()=>{
        try {
            const response = await Axios({
                ...SummaryApi.logout
            })
            console.log("response",response.data.message);
            
            if (response.data.success) {
                if (close) {
                    close();  // Call close to close the menu after logout
                }
                dispatch(logout())
                localStorage.clear()
                console.log("Logout successfully")
                toast.success(response.data.message)
                navigate('/')

            }
        } catch (error) {
            console.log("error", error);
            
            AxiosToastError(error)
        }
     
    }
    const handleclose = ()=>{
        if(close){
            close()
        }
    }
  return (
    <div className='border-r'>
        <div className='font-semibold'>My Account</div>
        <div className=' flex items-center gap-3 '>
            <div>{user.name || user.mobile} <span className='text-red-400'>{user.role === "ADMIN" ? "(Admin)" : ""}</span></div>

            <Link onClick={handleclose} to={'/dashboard/profile'} className='cursor-pointer'><VscLinkExternal className='text-[12px]' /></Link>
        </div>

        <Divider />
        <div className='text-sm grid gap-2 px-2 '>
            {
                isAdmin(user.role) && (
                    <Link onClick={handleclose} to={"/dashboard/category"} className='hover:bg-slate-200 p-1'>Category</Link>
                )
            }

            {
                isAdmin(user.role) && (
                    <Link onClick={handleclose} to={"/dashboard/subcategory"} className='hover:bg-slate-200 p-1'>Sub Category</Link>                   
                )
            }
             {
                isAdmin(user.role) && (

                    <Link onClick={handleclose} to={"/dashboard/product"} className='hover:bg-slate-200 p-1'>Product</Link>
                )
            }
              {
                isAdmin(user.role) && (
                    <Link onClick={handleclose} to={"/dashboard/uploadproduct"} className='hover:bg-slate-200 p-1'>Upload Product</Link>
                )
            }
               <Link onClick={handleclose} to={"/dashboard/myorders"} className='hover:bg-slate-200 p-1'>My Orders</Link>
                <Link onClick={handleclose} to={"/dashboard/address"} className='hover:bg-slate-200 p-1'>Save Address</Link>
                <button className='text-left hover:bg-slate-200 p-1' onClick={handlelogout}>Log Out</button>
        </div>
    </div>
  )
}

export default UserMenu
