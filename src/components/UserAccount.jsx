import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  logOut,
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';

import { motion } from 'framer-motion';

const UserAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/');
    }
  }, [auth]);

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, []);

  const img = new Image();
  useEffect(() => {
    img.src = '/assets/misc_bg/acc5.webp';

    img.onload = () => {
      setLoading(false);
    };
  }, []);

  return (
    <>
      {/**
    <Spinner loading={loading} />
  */}

      <div className="  right-0  w-screen bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center bg-no-repeat font-outfit text-green-gray  portrait:h-[100svh] landscape:h-[100dvh] ">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className='mx-auto w-full max-w-sm  pt-36 landscape:pt-20 2xl:top-28 5xl:top-44 5xl:max-w-xl 6xl:top-64 portrait:lg:mt-16 h-full landscape:md:pt-28 landscape:lg:pt-44 landscape:5xl:pt-56 landscape:6xl:pt-72'
        >
          <p className='font-extrabold pb-2 text-center text-4xl font-bold text-white '>
            WELCOME BACK,
          </p>
          <p className=' text-center text-2xl font-xtralight uppercase text-white md:text-3xl'>
            {auth.firstName}
          </p>
          <div className='mt-8 flex flex-col gap-3 min-h-[300px] '>
            <Link
              to={'/account/editprofile'}
              className='  ease  mb-2 border bg-white py-3 px-5 text-center transition-all duration-500 hover:bg-stone-200'
            >
              EDIT PROFILE
            </Link>
            <Link
              to={'/account/orderhistory'}
              className='  ease  mb-2 border bg-white py-3 px-5 text-center transition-all duration-500 hover:bg-stone-200'
            >
              ORDER HISTORY
            </Link>
            <Link
              to={'/account/wishlist'}
              className='  ease  mb-2 border bg-white py-3 px-5 text-center transition-all duration-500 hover:bg-stone-200'
            >
              WISHLIST
            </Link>
            {auth.isAdmin && (
              <Link
                to={'/account/admin'}
                className='  ease mb-2 border bg-white py-3 px-5 text-center transition-all duration-500 hover:bg-stone-200'
              >
                ADMIN SETTINGS
              </Link>
            )}

            <button
              onClick={() => dispatch(logOut())}
              className=' w-full border py-3 px-5 text-sm text-white transition-all duration-500 hover:bg-primary-bright-white/20 '
            >
              log out
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default UserAccount;
