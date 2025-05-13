import React, { useState } from "react";
import { useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import UserProfileAvatarupdate from "../components/UserProfileAvatarupdate";
import Edituserinfo from "../components/Edituserinfo";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  const [editavatar, seteditavatar] = useState(false);
  const [editinfo, seteditinfo] = useState(false);
  const handleavatar = () => {
    seteditavatar(true);
  };

  const handleinfo = ()=>{
    seteditinfo(true)
  }
  const handleinfoclose = ()=>{
    seteditinfo(false)
  }


  return (
    <>
      <div className="relative px-10">
        <div className="border-primary-200 border-2 w-16 h-16 rounded-full m-4  flex items-center justify-center overflow-hidden">
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

        {/* + Icon on top-right (circle button) */}
        <div
          onClick={handleavatar}
          className="absolute rounded-full bottom-0 h-5 w-5 left-[103px] bg-primary-200 flex items-center content-center "
        >
          <div className="mx-auto ">
            <button>+</button>
          </div>
        </div>

        {editavatar && (
          <div>
            <UserProfileAvatarupdate close={() => seteditavatar(false)} />
          </div>
        )}
      </div>

      <button onClick={handleinfo}
        className="bg-primary-200 text-black p-2 mx-10 rounded-full mt-4"
      >
        Edit Profile
      </button>

        {
          editinfo && (
            <div>
              <Edituserinfo  close={handleinfoclose}/>
            </div>
          )
        }

    <div className="p-10 ">
      <div className="mt-7">
        <label className="block">Name:</label>
        <div className="w-full p-3 border rounded mt-2 outline-none">
          {user.name}
        </div>
      </div>

     
        <div className="mt-7">
        <label className="block">Email:</label>
        <div className="w-full p-3 border rounded mt-2 outline-none">
          {user.email}
        </div>
      </div>
    

      <div className="mt-7">
        <label className="block">Phone:</label>
        <div className="w-full p-3 border rounded mt-2 outline-none">
          {user.number}
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
