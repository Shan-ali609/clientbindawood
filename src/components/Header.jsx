import React from "react";
import logo from "../assets/logo.png";
import { Link,useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { FaRegCircleUser } from "react-icons/fa6";
import useMobile from "../hooks/useMobile";
import { TiShoppingCart } from "react-icons/ti";
import { useSelector } from 'react-redux'
import { FaAngleDown } from "react-icons/fa6";
import { useState } from "react";
import UserMenu from "./UserMenu";

const Header = () => {
    const [IsMobile] = useMobile();  // Detect mobile screen using custom hook
    const location = useLocation();
    const IssearchPage = location.pathname === '/search';
     const navigate = useNavigate();
    const [isMenuShow , setMenushow] = useState(false)
     const handlechange  = ()=>{
        setMenushow((preview)=>!preview)
     }
    const user = useSelector((state)=> state?.user)

    // console.log("User Details",user);
     const handleCloseUserMenu = ()=>{
        setMenushow(false)
     }
     const moveToLoginpage = ()=>{
        navigate("/login")
      
     }
     const handleMenumobile = ()=>{
        if (!user._id) {
            navigate('/login')
            return
        }
        navigate('/user')
     }
    
    return (
        <header className="h-24 lg:h-20 w-full lg:shadow-md bg-white sticky z-40 top-0 px-2 md:px-6 flex flex-col justify-center gap-2">
            {/* Full Header (not on search page and not on mobile) */}
            {!(IssearchPage && IsMobile) && (
                <div className=" w-full flex justify-between items-center px-2">
                    {/* Logo */}
                    <div className="h-full">
                        <div className="h-full flex items-center justify-center">
                            <Link to={"/"} className="h-full flex justify-center items-center">
                                <img
                                    src={logo}
                                    width={170}
                                    height={60}
                                    alt="logo"
                                    className="hidden lg:block"  // Visible on large screens
                                />
                                <img
                                    src={logo}
                                    width={120}
                                    height={60}
                                    alt="logo"
                                    className="lg:hidden"  // Visible on small screens
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Search section */}
                    <div className="hidden lg:block">  {/* Visible only on large screens */}
                        <Search />
                    </div>

                    {/* Cart and order section */}
                    <div>
                            {/* for mobile screen */}
                               <button className='text-neutral-600 lg:hidden' onClick={handleMenumobile}>
                                        <FaRegCircleUser size={26}/>
                                    </button>
                          <div className="hidden lg:flex items-center gap-10">  {/* Visible only on large screens */}
                            {
                                user?._id ? (
                                    <div className="relative">
                                        <div className="flex items-center gap-1 cursor-pointer p-3 bg-slate-100 rounded hover:bg-slate-200" onClick={handlechange}>
                                            <p className="">Account</p>
                                            <FaAngleDown 
                                            className={`transition-transform duration-300 ${isMenuShow ? 'rotate-180' : ''}`} />
                                             
                                        </div>
                                        {
                                            isMenuShow && (
                                                <div className="absolute right-0 top-[52px] ">
                                                <div className="bg-white min-w-[200px] rounded-b p-4 lg:shadow-lg">
                                                <UserMenu close={handleCloseUserMenu} />
    
                                                </div>
                                            </div>
                                            )
                                        }
                                      
                                        </div>
                                ):(
                                    <div>
                                        <button onClick={moveToLoginpage} className="text-lg " >Login</button>

                                        </div>
                                )
                            }
                            <button className="flex items-center gap-1 bg-blue-900 hover:bg-green-800 py-3 px-2 text-white rounded-sm">
                              <div className="animate-bounce">
                              <TiShoppingCart size={26} />
                              </div>
                              <div className="font-semibold text-md">
                                  <p>My Cart</p>
                                {/* <p>1 items</p>
                                <p>total price</p> */}
                              </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* On small screens, show search bar */}
            <div className="md:px-6 block lg:hidden">
                <Search />
            </div>
        </header>
    );
};

export default Header;
