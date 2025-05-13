import { useState, useEffect } from "react";

const useMobile = (breakpoint = 786) => {
  const [Ismobile, setIsmobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    setIsmobile(window.innerWidth < breakpoint);
  };

  useEffect(() => {
    // Attach event listener for resize event
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]); // Only run effect if `breakpoint` changes

  return [Ismobile];
};

export default useMobile;
