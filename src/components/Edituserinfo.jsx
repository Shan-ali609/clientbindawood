import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { RxCross2 } from 'react-icons/rx'; // Make sure this is imported
import fetchUser from '../utils/fetchUserDetails';
import toast from 'react-hot-toast';
import { updateUserDetails } from '../store/userSlice';

const Edituserinfo = ({ close }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    name: user.name,
    email: user.email,
    number: user.number,
  });

 

  const handleonchange = (e) => {
    const { name, value } = e.target;
    setuserdata((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlesubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page
    try {
      const response = await Axios({
        ...SummaryApi.update_userDtail,
          data: userdata,
      });
      const { data: responsedata } = response;
      
      if (responsedata.success) {
        toast.success(responsedata.message);
        const userData = await fetchUser();
        dispatch(updateUserDetails(userData.data));
        close();
      }
    } catch (error) {
        console.log("Error during Axios request:", error);
      AxiosToastError(error);
      
    }
  };
  // Update state when user prop changes
  useEffect(() => {
    setuserdata({
      name: userdata.name,
      email: userdata.email,
      number: userdata.number,
    });
  }, [user]); // Add user as a dependency to re-run the effect when user changes

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-neutral-900 bg-opacity-60 p-4 flex items-center justify-center">
      <div className="bg-white w-[400px] p-4 rounded">
        <div className="flex px-2 justify-between">
          <div className="font-semibold text-[24px]">Change Information</div>
          <div className="cursor-pointer h-3 w-3 top-0" onClick={close}>
            <RxCross2 />
          </div>
        </div>
        <form onSubmit={handlesubmit} className="mt-4">
          <div>
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={userdata.name} // Use userdata here
              onChange={handleonchange}
              placeholder="Name"
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userdata.email} // Use userdata here
              onChange={handleonchange}
              placeholder="Email"
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mt-4">
            <label htmlFor="phone" className="block">
              Phone:
            </label>
            <input
              type="text"
              id="phone"
              name="number" // name should match with state key
              value={userdata.number} // Use userdata here
              onChange={handleonchange}
              placeholder="Phone"
              className="w-full p-2 border rounded mt-2"
            />
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-full"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edituserinfo;
