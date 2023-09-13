import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  logIn,
  attemptTokenLogin,
  selectAuth,
  selectAuthLoading,
} from '../slices/users/authSlice';


import btnHover from '../style_utils'



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logInFail, setLogInFail] = useState(false);
  const [logInAttempt, setLogInAttempt] = useState(false);
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);
  const authLoading = useSelector(selectAuthLoading);
  const [isInvalid, setIsInvalid] = useState(false);

  const { auth, status } = useSelector(selectAuth);

  const validClass =
    'appearance-none border portrait:w-72 portrait:lg:w-96 w-96 3xl:py-2 py-3 px-4 text-gray-700 text-[3vw] md:text-[1.8vw] landscape:5xl:text-[.8vw] landscape:xl:text-[.9rem] landscape:6xl:text-[.7vw] leading-tight focus:outline-none focus:bg-white focus:shadow-outline landscape:text-[.8rem] portrait:md:text-[1rem] landscape:short:py-2 landscape:6xl:w-[500px] landscape:lg:w-72 landscape:lg:py-2';

  const invalidClass =
    'appearance-none border portrait:w-72 portrait:lg:w-96 border-red-700 text-[3vw] md:text-[1.8vw] landscape:5xl:text-[1vw] landscape:6xl:text-[.8vw] w-96 py-3 landscape:3xl:py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:shadow-outline landscape:text-[.8rem] landscape:6xl:w-[500px] landscape:lg:w-72 landscape:lg:py-2 landscape:xl:text-[.9rem]';

  const validateEmail = (email) => {
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const checkFormValidation = () => {
    if (email === '') {
      setIsInvalidEmail(true);
    }
    if (!validateEmail(email)) {
      setIsInvalidEmail(true);
    }
    if (password === '' || password.length < 8) {
      setIsInvalidPassword(true);
    }
  };

  const onSubmit = async (evt) => {
    evt.preventDefault();
    checkFormValidation();
    setLogInAttempt(true);
    if (!isInvalidEmail && !isInvalidPassword) {
      await dispatch(
        logIn({
          email,
          password,
        })
      );

      await dispatch(attemptTokenLogin());
    }
  };

  useEffect(() => {
    if (auth.firstName) navigate('/');
    else if (logInAttempt) {
      setLogInFail(true);
    }
  }, [auth]);



  btnHover();


  return (
    <div className="right-0 h-[calc(100dvh_-_5rem)] bg-[url('/assets/bg_img/home2.jpg')] bg-cover bg-center bg-no-repeat font-outfit text-white md:h-[calc(100vh_-_4rem)] landscape:lg:bg-[url('/assets/misc_bg/login.webp')] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)]  5xl:h-[calc(100dvh_-_129px)]  6xl:h-[calc(100dvh_-_200px)] portrait:absolute portrait:top-0 portrait:mt-20  portrait:w-full portrait:lg:mt-20 landscape:h-[100svh] portrait:md:h-[calc(100dvh_-_80px)] ">
      <div className='m-auto w-full max-w-sm pt-14 portrait:pt-36 portrait:md:pt-44  landscape:lg:pt-44 landscape:5xl:pt-64 landscape:6xl:pt-80 landscape:7xl:pt-[500px] portrait:lg:pt-[15rem]'>
        <h2 className='text-center font-outfit font-semibold tracking-wide  pt-5 landscape:pt-8 portrait:text-[1.4rem] landscape:sm:text-[1.5rem]  landscape:5xl:text-[2rem] landscape:7xl:text-[3rem] portrait:lg:text-[2rem] landscape:lg:text-[1.3rem]'>
          LOGIN
        </h2>
        <section className=' flex flex-col items-center justify-center  portrait:gap-2 landscape:gap-2'>
          <form onSubmit={onSubmit} className=''>
            <div className='mb-2 landscape:mb-1'>
              <p
                className={
                  logInFail ? 'text-xs text-red-700' : 'collapse text-xs'
                }
              >
                Invalid login credentials!
              </p>
              <label
                className='mb-1 block text-sm landscape:text-xs portrait:lg:text-base landscape:6xl:text-[1rem]'
                htmlFor='email'
              >
                Email
              </label>
              <input
                className={
                  isInvalidEmail || logInFail ? invalidClass : validClass
                }
                id='email'
                placeholder='email'
                value={email}
                onChange={(evt) => {
                  setIsInvalidEmail(false);
                  setLogInFail(false);
                  setEmail(evt.target.value);
                }}
                name='email'
                autoComplete='email'
              />
              <p
                className={
                  isInvalidEmail ? 'text-xs text-red-700' : 'collapse text-xs'
                }
              >
                Enter email!
              </p>
            </div>

            <div className='mb-6 landscape:mb-0'>
              <label
                className='mb-1 block text-sm  landscape:text-xs portrait:lg:text-base landscape:6xl:text-[1rem]'
                htmlFor='password'
              >
                Password
              </label>
              <input
                className={
                  isInvalidPassword || logInFail ? invalidClass : validClass
                }
                id='password'
                type='password'
                placeholder='password'
                value={password}
                onChange={(evt) => {
                  setIsInvalidPassword(false);
                  setLogInFail(false);
                  setPassword(evt.target.value);
                }}
                name='password'
                autoComplete='password'
              />
              <p
                className={
                  isInvalidPassword
                    ? 'text-xs text-red-700'
                    : 'collapse text-xs'
                }
              >
                Invalid password!
              </p>
            </div>
            <div className='flex items-center justify-between'>
              <button
                type='submit'
                className='btn mx-auto block w-full  py-2 text-[4vw] text-white duration-500 hover:transition-all md:text-[2.6vw] landscape:lg:py-2 landscape:lg:text-[1.7vw] landscape:xl:text-[1.1rem]  landscape:2xl:text-[1rem] landscape:3xl:py-1 landscape:3xl:text-[1.1rem] landscape:4xl:text-[1.2rem] landscape:5xl:text-[1.2vw] landscape:6xl:text-[1vw]  landscape:text-[1rem] landscape:pt-2 landscape:lg:pt-1 portrait:lg:pt-1 portrait:lg:text-[1.4rem]  '
              >
                <span>{authLoading ? 'loading..' : 'login'}</span>
              </button>
            </div>
          </form>
          <div className='flex justify-center'>
            <button className='inline-block align-baseline text-[3vw] md:text-[1.9vw] landscape:xl:text-[1vw] landscape:3xl:text-[.9vw] landscape:4xl:text-[.9rem] landscape:5xl:text-[.7vw] landscape:6xl:text-[.6vw] landscape:text-[.7rem] landscape:short:text-[.8rem] '>
              don't have an account? sign up{' '}
              <Link to={'/signup'} className='underline '>
                {' '}
                here
              </Link>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Login;
