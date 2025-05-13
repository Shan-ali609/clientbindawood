import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";


const UserProfileAvatarupdate = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch()
   const [loading, setloading] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
   const handleUploadAvatarImage = async(e)=>{
           
    const file = e.target.files[0];  // Correct access to the 'files' property
    if (!file) {
      return; // If no file is selected, exit the function
    }
      const formdata = new FormData()
      formdata.append('avatar',file)
      try {
        setloading(true)
       const response = await Axios({
        ...SummaryApi.upload_avatar,
        data : formdata
       })
       const {data : responseData} = response
       console.log("response data", responseData.data.avatar);
          dispatch(updateAvatar(responseData.data.avatar))
          
      } catch (error) {
        AxiosToastError()
      }finally{
        setloading(false)
      }
       
   }
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white w-[500px] rounded relative">
        {/* Cross button with absolute positioning */}
        <div
          onClick={close}
          className="absolute top-3 right-3 cursor-pointer"
        >
          <RxCross2 size={24} />
        </div>

        {/* Avatar Image */}
        <div className="border-primary-200 mx-auto border-2 w-16 h-16 rounded-full m-4 flex items-center justify-center overflow-hidden">
          {user.avatar ? (
            <img
              alt={user.name}
              src={user.avatar}
              className="h-full w-full object-cover"
            />
          ) : (
            <CgProfile size={65} />
          )}
        </div>

        {/* Avatar Label */}
        <form onSubmit={handleSubmit} className="py-6">
                <label htmlFor='uploadProfile'>
                    <div className='border border-primary-200 cursor-pointer hover:bg-primary-200  text-center   py-2 rounded'>
                        {
                            loading ? "Loading..." : "Upload"
                        }
                    </div>
                    <input onChange={handleUploadAvatarImage} type='file' id='uploadProfile' className='hidden'/>
                </label>
            </form>
      </div>
    </div>
  );
};

export default UserProfileAvatarupdate;
