import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import PromoBanner from './UI/PromoBanner.jsx';

// import mobileBg from '../assets/bg_img/home1.jpg';
// import desktopBg from '../assets/bg_img/homepage13.jpg';

export default function Homepage() {
  const dispatch = useDispatch();
  const showLoginMessage = useSelector(selectLoginMessage);
  const showLogoutMessage = useSelector(selectLogoutMessage);
  useEffect(() => {
    if (showLoginMessage === true) {
      const loginToast = toast.success('Logged in!');
    } else {
      if (showLogoutMessage === true) toast.success('Logged out!');
    }
    setTimeout(() => {
      dispatch(resetStatus());
      toast.dismiss();
    }, 2000);
    return () => dispatch(resetStatus());
  }, []);

  return (
    <>
      <div
        className={`absolute top-0 mx-auto  h-screen w-[100vw] bg-[url('/assets/bg_img/home1.jpg')]  bg-cover text-white md:bg-[url('/assets/bg_img/homepage13.jpg')] md:bg-right md:text-green-gray portrait:bg-[url('/assets/bg_img/home1.jpg')] portrait:md:h-screen portrait:lg:h-screen`}
      >
        {/**homepage txt section */}
        <div className='absolute top-64 left-1/2 w-[80vw] -translate-x-1/2 flex-col gap-5 text-center md:top-40 md:bottom-auto md:min-w-[500px] 4xl:top-80  lg:top-56 lg:left-32 lg:translate-x-0  portrait:lg:text-center portrait:lg:w-[80vw] portrait:xs:top-36 portrait:md:top-56 lg:text-left'>
          <div className='mb-4 w-full  portrait:lg:w-full '>
            <p className='mb-2 font-archivo  text-[9vw] font-bold uppercase leading-none md:font-outfit md:text-[7vw] 5xl:text-[5vw] lg:text-[6vw] portrait:lg:font-archivo portrait:md:font-archivo portrait:lg:text-[7vw] '>
              Your perfect plant
            </p>
            <p className='text-[4vw] font-medium 5xl:text-[.9vw] leading-none md:text-[1.5vw] portrait:md:text-[2.5vw] lg:mt-5'>
              one click away
            </p>
          </div>
          <div className='mb-[10%] lg:mt-12 flex flex-col  6xl:text-[1.2vw] 5xl:text-[1.5vw] text-[5vw] md:mt-0 md:mb-16 lg:mb-20  md:pt-0  md:text-[2vw]  md:font-light portrait:font-light portrait:md:text-[3.2vw] portrait:mt-16 portrait:xs:text-[6vw]'>
            <p>transform your space,</p>
            <p>no green thumb needed</p>
          </div>

          <Link to='/products'>
            <button className=' w-full md:w-3/12 max-w-xs 5xl:max-w-lg bg-green-gray py-2 font-outfit text-[1vw] tracking-widest text-white shadow-xl portrait:bg-[#6f9283] portrait:lg:py-5 portrait:md:text-[2.4vw] 5xl:text-[1.1vw] 5xl:py-5 6xl:py-6 portrait:xs:w-3/4 font-semibold 2xl:text-[1vw] 6xl:text-[1vw] portrait:text-[3.2vw] hover:bg-btn-hover transition-all duration-700 ease'>
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
