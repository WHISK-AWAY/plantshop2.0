import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  logOut,
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';

import Spinner from './UI/Spinner';
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

  if (!auth) return <Spinner loading={loading} />;

  return (
    <>
    {/**
    {loading && <Spinner loading={loading} />}
  */}

      <div
        className=" h-[calc(100dvh_-_5rem)] w-screen bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center font-outfit text-green-gray  md:h-[calc(100dvh_-_4rem)] portrait:md:h-[calc(100dvh_-_110px)] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)] 6xl:h-[calc(100dvh_-_200px)] portrait:lg:h-[calc(100dvh_-_140px)] "
        // onLoad={() => console.log('loaded')}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className=' absolute top-16 left-1/2 mx-auto w-full max-w-sm -translate-x-1/2 pt-16 2xl:top-28 5xl:top-44 5xl:max-w-xl 6xl:top-64 portrait:lg:mt-16 '
        >
          <p className='font-extrabold pb-2 text-center text-4xl font-bold text-white '>
            WELCOME BACK,
          </p>
          <p className=' text-center text-2xl font-xtralight uppercase text-white md:text-3xl'>
            {auth.firstName}
          </p>
          <div className='mt-8 flex flex-col gap-3'>
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
                className='  ease mb-2 rounded-lg border bg-white py-3 px-5 text-center transition-all duration-500 hover:bg-stone-200'
              >
                Admin Settings
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
