import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectLoginMessage,
  resetStatus,
  selectLogoutMessage,
} from '../slices/users/authSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import btnHover from '../style_utils';

import { motion } from 'framer-motion';

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

  btnHover();
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
        className={`absolute top-0 mx-auto  h-screen w-[100vw] bg-[url('/assets/bg_img/home1.webp')]  bg-cover text-white lg:bg-[url('/assets/bg_img/homepage13.webp')] md:bg-right lg:text-green-gray portrait:bg-[url('/assets/bg_img/home1.webp')] portrait:md:h-screen portrait:lg:h-screen landscape:h-[100svh] landscape:bg-center landscape:lg:bg-right`}
      >
        {/**homepage txt section */}
        <div className='absolute top-64 landscape:lg:top-60 landscape:xl:top-72 landscape:2xl:top-80 left-1/2 w-[80vw] -translate-x-1/2 flex-col gap-5 text-center md:top-40 md:bottom-auto md:min-w-[500px] 4xl:top-80  lg:top-56 lg:left-32 lg:translate-x-0  portrait:lg:text-center portrait:lg:w-[80vw] portrait:xs:top-36 portrait:md:top-56 lg:text-left landscape:top-28 landscape:5xl:pl-44 landscape:4xl:pl-32 landscape:6xl:pl-[30rem]'>
          <div className='mb-4 w-full  portrait:lg:w-full '>
            <p className='mb-2 font-archivo  text-[9vw] font-bold uppercase leading-none md:font-outfit md:text-[7vw] landscape:5xl:text-[7rem] landscape:lg:text-[6vw] portrait:lg:font-archivo portrait:md:font-archivo portrait:lg:text-[7vw] landscape:text-[2.1rem] lg:text-green-gray/70 landscape:6xl:text-[10rem] '>
              Your perfect plant
            </p>
            <p className='text-[4vw] font-medium landscape:5xl:text-[.9vw] leading-none md:text-[1.5vw] portrait:md:text-[2.5vw] lg:mt-5 landscape:text-[.9rem] landscape:3xl:text-[1.1rem] landscape:6xl:text-[1.6rem]'>
              one click away
            </p>
          </div>
          <div className='mb-[10%] lg:mt-12 flex flex-col  6xl:text-[1.2vw] 5xl:text-[1.5vw] text-[5vw] md:mt-0 md:mb-16 lg:mb-20  md:pt-0  md:text-[2vw]  md:font-light portrait:font-light portrait:md:text-[3.2vw] portrait:mt-16 portrait:xs:text-[6vw] landscape:text-[1.1rem] landscape:3xl:text-[1.3rem] landscape:5xl:text-[1.6rem] landscape:6xl:text-[1.9rem]'>
            <p>transform your space,</p>
            <p>no green thumb needed</p>
          </div>

          <Link to='/products'>
            <button className='btn w-full md:w-3/12 max-w-xs 5xl:max-w-md bg-green-gray py-2 font-outfit text-[1vw] tracking-widest text-white shadow-xl portrait:bg-[#6f9283] portrait:lg:py-5 portrait:md:text-[2.4vw] landscape:5xl:text-[.8vw] 5xl:py-3 6xl:py-4 portrait:xs:w-3/4 font-semibold landscape:2xl:text-[1vw] 6xl:text-[1vw] portrait:text-[3.2vw] hover:scale-[1.04] ease transition-all duration-700 landscape:text-[.8rem]'>
              <span>SHOP NOW</span>
            </button>
          </Link>
        </div>
      </motion.div>
    </>
  );
}
