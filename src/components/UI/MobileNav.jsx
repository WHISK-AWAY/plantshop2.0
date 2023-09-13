import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  adjustSearchBy,
  selectSearchBy,
} from '../../slices/product/productSlice';
import searchIcon from '../../assets/search-icon-white.svg';
import whiteX from '../../assets/white-x.svg';

import {motion} from 'framer-motion'
import Spinner from './Spinner';

const MobileNav = ({ expand, setExpand }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchTerm = useSelector(selectSearchBy);
  const [loading, setLoading] = useState(true)

  const handleClick = () => {
    setExpand(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    handleClick();
    navigate('/products');
  };


  //prevent scroll on overflow when the menu is open
  useEffect(() => {
    if(expand) {

      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, []);


  useEffect(() => {
    const img = new Image();
    img.src = '/assets/bg_img/home1.webp';

    img.onload = () => {
      setLoading(false)
    }
  }, [])

  return (
    <>
      {loading && <Spinner loading={loading} />}
      <motion.div
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
        className="absolute top-0 left-0 z-50 h-screen landscape:h-[100svh]  w-screen bg-[url('/assets/bg_img/home1.jpg')] font-gloock  text-white   landscape:lg:hidden"
        style={{
          right: `${expand ? '0' : '-18rem'}`,
        }}
      >
        {/**search section and X btn section*/}
        <div className='flex flex-row-reverse justify-between p-5 pr-8 landscape:pt-3 portrait:md:pr-14 portrait:md:pt-6 portrait:lg:pt-9'>
          <img
            src={whiteX}
            alt='x icon'
            className='w-5 portrait:lg:w-6 landscape:w-4'
            onClick={handleClick}
          />

          <div className='flex h-9 landscape:h-4 flex-row-reverse  gap-2 '>
            <button onClick={handleSearch}>
              <img
                src={searchIcon}
                alt='magnifying glass'
                className='w-7 landscape:w-6 portrait:lg:w-9'
              />
            </button>
            <form onSubmit={handleSearch}>
              <input
                type='text'
                placeholder=''
                className='h-8 w-full rounded-full landscape:h-5 bg-gray-100 pl-3 text-[3.8vw] text-[#121212] placeholder:text-[3.5vw] landscape:placeholder:text-[1rem] landscape:w-36 portrait:lg:w-72'
                value={searchTerm}
                onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
              />
            </form>
          </div>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className='flex  flex-col  pt-[50%] text-[6vw] landscape:pt-20 landscape:text-[1.3rem] landscape:sm:text-[1.5rem] portrait:md:pt-[40%] portrait:lg:text-[2.9rem]'
        >
          <div
            className='w-full text-center transition-all'
            onClick={handleClick}
          >
            {localStorage.getItem('token') ? (
              <Link to='/account'>
                <li className='mx-auto max-h-16 w-full border-b pb-1 tracking-wide'>
                  <span className='self-start pr-2 text-[3vw] tracking-widest landscape:text-[2vw] landscape:sm:text-[1.5vw] portrait:lg:text-[1.1rem]'>
                    01
                  </span>
                  ACCOUNT
                </li>
              </Link>
            ) : (
              <Link to='/login'>
                <li className=' mx-auto max-h-16 w-full border-b tracking-wide pb-1'>
                  <span className='self-start pr-2 text-[3vw] tracking-widest  landscape:text-[2vw] landscape:sm:text-[1.5vw] portrait:lg:text-[1.1rem]'>
                    01
                  </span>
                  LOGIN
                </li>
              </Link>
            )}
          </div>
          <div
            className='w-full text-center transition-all '
            onClick={handleClick}
          >
            <Link to='/products'>
              <li className='mx-auto max-h-16 w-full border-b pb-1 tracking-wide '>
                <span className='self-start pr-2 text-[3vw] tracking-widest  landscape:text-[2vw] landscape:sm:text-[1.5vw] portrait:lg:text-[1.1rem]'>
                  02
                </span>
                SHOP
              </li>
            </Link>
          </div>
          <div
            className='w-full text-center transition-all'
            onClick={handleClick}
          >
            <Link to='/cart'>
              <li className='mx-auto max-h-16 w-full border-b tracking-wide pb-1 '>
                <span className='self-start pr-2 text-[3vw] tracking-widest  landscape:text-[2vw] landscape:sm:text-[1.5vw] portrait:lg:text-[1.1rem]'>
                  03
                </span>
                CART
              </li>
            </Link>
          </div>
        </motion.ul>
      </motion.div>
    </>
  );
        };
        
        export default MobileNav;
        