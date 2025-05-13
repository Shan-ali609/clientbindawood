import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from 'react-type-animation';
import useMobile from "../hooks/useMobile";
import { IoMdArrowRoundBack } from "react-icons/io";
function Search() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSearchPage, setIsSearchPage] = useState(false);
  const [IsMobile] = useMobile();
  useEffect(() => {
    const isSearch = location.pathname === '/search';
    setIsSearchPage(isSearch);
  }, [location]);

  const redirectToSearchPage = () => {
    navigate('/search');
  };
  
  return (
    <>
      <div  
        className={`w-full min-w-[300px] lg:min-w-[420px] flex gap-2 border items-center rounded-full text-neutral-500 
        ${isSearchPage ? 'border-primary-200' : 'border-neutral-300'} group`}>
          {
            (IsMobile && isSearchPage) ? (
                <>
                <Link to={"/"} className={`border rounded-full p-2 cursor-pointer 
                    ${isSearchPage ? 'border-primary-200' : 'bg-white'} `}>
                      <IoMdArrowRoundBack className={`${isSearchPage ? 'text-primary-200' : 'text-neutral-500'}`} />
                    </Link>
                    </>
            ):(
                <div className={`border rounded-full p-2 cursor-pointer 
                    ${isSearchPage ? 'border-primary-200' : 'bg-white'} `}>
                      <CiSearch className={`${isSearchPage ? 'text-primary-200' : 'text-neutral-500'}`} />
                    </div>
            )
          }
      
        
        

        <div  onClick={redirectToSearchPage} className="h-full w-full">
          {!isSearchPage ? (
            <TypeAnimation
              sequence={[
                "Search 'Milk' ",
                1000,
                "Search 'Powder' ",
                1000,
                "Search 'Cake' ",
                1000,
                "Search 'Beef' ",
                1000,
              ]}
              speed={50}
              style={{ fontSize: "16px" }}
              repeat={Infinity}
            />
          ) : (
            <input
              type="text"
              placeholder="Search for atta daal"
              className="outline-none text-black min-w-[300px] lg:min-w-[420px]"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
