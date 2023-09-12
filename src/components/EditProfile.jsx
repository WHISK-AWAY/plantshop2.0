import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  attemptTokenLogin,
  selectAuth,
  resetStatus,
} from '../slices/users/authSlice';
import { updateSingleUser, selectUsers } from '../slices/users/userSlice';
import toast from 'react-hot-toast';
import btnHover from '../style_utils';
import { motion } from 'framer-motion';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { auth } = useSelector(selectAuth);

  const { user } = useSelector(selectUsers);
  const id = auth.id;
  const token = localStorage.getItem('token');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(attemptTokenLogin());

    return () => {
      dispatch(resetStatus());
    };
  }, [user]);

  useEffect(() => {
    setFirstName(auth.firstName || '');
    setLastName(auth.lastName || '');
    setEmail(auth.email || '');
  }, [auth]);

  const updateUser = (evt) => {
    evt.preventDefault();
    toast.success('Account info successfully changed');
    const updates = { firstName, lastName, email };
    dispatch(updateSingleUser({ id, token, updates }));
  };

  const goBack = () => {
    navigate('/account');
  };

  btnHover();

  return (
    <div className=" bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center font-outfit portrait:h-[100svh] lansdcape:h-[100dvh] w-screen bg-no-repeat overflow-auto">
      <div className='portrait:lg:h-[100dvh] landscape:md:h-[100vh] landscape:h-full left-1/2 mx-auto w-full max-w-sm pt-16 landscape:lg:pt-[12%] 2xl:top-28 5xl:top-44 5xl:max-w-xl 6xl:top-64 portrait:lg:mt-16 pb-10 portrait:sm:pt-24 '>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className='mt-8 flex flex-col gap-3'
        >
          <h2 className='mt-3 mb-3 text-center text-3xl  font-bold text-white'>
            EDIT PROFILE
          </h2>
          <section className='flex justify-center gap-20  '>
            <form
              className='w-[80%] landscape:5xl:w-full max-w-lg  landscape:5xl:max-w-xl md:w-full '
              onSubmit={updateUser}
            >
              <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='mb-6 w-full px-3 md:mb-0 md:w-1/2'>
                  <label
                    className='mb-2 block text-xs  tracking-wide text-white'
                    htmlFor='grid-first-name'
                  >
                    First Name
                  </label>
                  <input
                    className='bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                    type='text'
                    value={firstName}
                    onChange={(evt) => setFirstName(evt.target.value)}
                  />
                </div>
                <div className='w-full px-3 md:w-1/2'>
                  <label
                    className='mb-2 block text-xs   tracking-wide text-white'
                    htmlFor='grid-last-name'
                  >
                    Last Name
                  </label>
                  <input
                    className='bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                    id='grid-last-name'
                    type='text'
                    value={lastName}
                    onChange={(evt) => setLastName(evt.target.value)}
                  />
                </div>
              </div>
              <div className='-mx-3 mb-6 flex flex-wrap'>
                <div className='w-full px-3'>
                  <label
                    className='mb-2 block text-xs  tracking-wide text-white'
                    htmlFor='grid-email'
                  >
                    Email
                  </label>
                  <input
                    className='bg-white-200 block w-full appearance-none rounded border border-gray-200 py-3 px-4 leading-tight  text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
                    id='grid-email'
                    type='text'
                    value={email}
                    onChange={(evt) => setEmail(evt.target.value)}
                  />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <button
                  type='submit'
                  className='btn mx-auto mt-5 block w-full  bg-green-gray py-2 text-xl text-white hover:scale-[1.04] ease transition-all duration-700 '
                >
                  <span>save</span>
                </button>
              </div>
            </form>
          </section>
          <div className='flex justify-center'>
            <button
              className='inline-block w-full border border-white py-1 align-baseline text-sm text-white transition-all duration-500 hover:bg-primary-bright-white/20  portrait:md:w-full  portrait:w-[80%] landscape:w-4/5 landscape:xs:w-full landscape:xs:mb-10 landscape:5xl:w-full'
              onClick={goBack}
            >
              back
            </button>
          </div>
        </motion.div>
        {/* <Toaster /> */}
      </div>
    </div>
  );
};

export default EditProfile;
