import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import searchIcon from '../../assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import decoratedLine from '../../assets/line.svg';
import { Toaster } from 'react-hot-toast';
import {
  selectSearchedItems,
  adjustSearchBy,
  selectSearchBy,
  adjustFilter,
} from '../../slices/product/productSlice';
import menu from '../../assets/menu.svg';
import MobileNav from './MobileNav.jsx';
import CartLink from './CartLink.jsx';
import searchIcon from '../../../public/assets/search-icon.svg';
import searchIconReveal from '../../../public/assets/search-icon.svg';

import { fetchCart, selectCart } from '../../slices/users/cartSlice';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const { auth } = props;

  const searchedItems = useSelector(selectSearchedItems);
  const searchTerm = useSelector(selectSearchBy);
  const cart = useSelector(selectCart);
  const [isSearchHidden, setIsSearchHidden] = useState(true);

  // useEffect(() => {
  //   dispatch(fetchCart());
  // }, []);

  const handleSearch = (e) => {
    if (expand) {
      setExpand(false);
    }
    e.preventDefault();
    dispatch(adjustSearchBy(searchTerm));
    navigate('/products');
  };

  return (
    <header>
      <nav className='relative z-50 flex h-20 w-screen items-center justify-between px-5 tracking-tighter text-green-gray  md:h-16 md:flex-col md:justify-around lg:h-[82px] xl:h-[100px] 2xl:h-[105px] 5xl:h-[159px]  6xl:h-[200px] portrait:md:h-[110px] portrait:lg:h-[140px]'>
        <Toaster
          position='top-right'
          toastOptions={{
            iconTheme: {
              primary: '#365314',
              secondary: '#a7bfb4',
            },
            style: {
              border: '1px solid #121212',
              borderRadius: '1px',
              padding: '16px',
              color: '#121212',
              fontSize: '1rem',
              textTransform: 'uppercase',
            },
          }}
        />

        <Link to={'/'}>
          <h1 className='mt-2 font-tabac text-[8vw] leading-none md:mt-3 md:text-[1.6rem] lg:mt-4 xl:mt-5 xl:text-[2.2rem]  2xl:mt-6 4xl:mt-5 5xl:mt-10 5xl:text-[2.5rem] 6xl:text-[3.1rem] portrait:md:text-[4.3vw] portrait:md:mt-6'>
            plants&co
          </h1>
        </Link>

        <div className='hidden gap-10 md:flex'>
          {/**search section */}
          <img
            src={searchIconReveal}
            alt='magnifying glass'
            className='absolute bottom-2 left-10 flex  gap-1 stroke-green-900 self-start w-6 md:w-4'
            onClick={() => setIsSearchHidden(false)}
          />
          {!isSearchHidden && (
            <div className=' absolute bottom-2 left-10 flex  gap-1 stroke-green-900 self-start'>
              <button onClick={handleSearch}>
                <img
                  src={searchIcon}
                  alt='magnifying glass'
                  className='w-6 md:w-4'
                />
              </button>
              <form onSubmit={handleSearch} className='flex '>
                <input
                  type='text'
                  placeholder='succulent...'
                  className=' border border-green-gray pl-3 text-sm md:text-[1vw] h-4 appearance-none focus:outline-none bg-transparent'
                  value={searchTerm}
                  onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
                 
                />
              </form>
            </div>
          )}

          <ul className='flex gap-16 font-outfit md:text-[.7rem]  lg:text-[1.2vw] xl:gap-20 2xl:gap-28 4xl:text-[1.3rem] 5xl:text-[1.6rem] 6xl:gap-40 portrait:md:text-[2.6vw]'>
            <Link to={`/products`}>
              <li onClick={() => dispatch(adjustFilter(''))}>SHOP</li>
            </Link>
            {auth.firstName ? (
              <Link to={'/account'} className='uppercase'>
                <li>Hi, {auth.firstName} </li>
              </Link>
            ) : (
              <Link to={'/login'}>
                <li>LOGIN</li>
              </Link>
            )}
            <Link to='/cart'>
              <CartLink cartQty={cart?.expandedCart?.length} />
              {/* <li>CART</li> */}
            </Link>
          </ul>
        </div>

        {/**decorated navbar border */}
        <div className='relative hidden w-[90vw] md:flex'>
          <img src={decoratedLine} alt='' className='absolute w-full ' />
        </div>

        {/**hamburger menu */}

        <button
          className='z-30  md:hidden'
          onClick={() => {
            setExpand((prev) => !prev);
          }}
        >
          <img src={menu} alt='dropdown menu icon' className=' w-12' />
        </button>

        {expand && <MobileNav expand={expand} setExpand={setExpand} />}
      </nav>
    </header>
  );
};

export default NavBar;
