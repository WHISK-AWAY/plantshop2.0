import React, { useEffect, useState } from 'react';

import {motion} from 'framer-motion'

export default function Spinner({ loading }) {
  //prevent scroll on overflow when the menu is open

  useEffect(() => {
    if (loading) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });

      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [loading]);


  return !loading ? (
    <div className='hidden'></div>
  ) : (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.2,
        ease: [0.17, 0.67, 0.83, 0.67],
      }}
      className='h-screen w-screen bg-white/90 fixed top-0 right-0 z-[100] backdrop-blur-sm flex justify-center items-center'
    >
      <div className='spinner-container'>
        <div className='loading-spinner'></div>
      </div>
    </motion.div>
  );
}
