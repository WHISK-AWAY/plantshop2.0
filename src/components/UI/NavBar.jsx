import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import searchIcon from '../../../public/assets/search-icon.svg';
import { useDispatch, useSelector } from 'react-redux';
import decoratedLine from '../../../public/assets/line.svg';
import { Toaster } from 'react-hot-toast';
import {
  selectSearchedItems,
  adjustSearchBy,
  selectSearchBy,
  adjustFilter,
} from '../../slices/product/productSlice';
import menu from '../../../public/assets/menu.svg';
import MobileNav from './MobileNav.jsx';
import CartLink from './CartLink.jsx';

import { fetchCart, selectCart } from '../../slices/users/cartSlice';

const NavBar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expand, setExpand] = useState(false);
  const { auth } = props;

  const searchedItems = useSelector(selectSearchedItems);
  const searchTerm = useSelector(selectSearchBy);
  const cart = useSelector(selectCart);

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
      <nav className='fixed top-0 z-50 flex h-20 w-screen items-center justify-between px-5 tracking-tighter text-green-gray  md:h-16 lg:flex-col lg:justify-around landscape:lg:h-[82px] xl:h-[100px] landscape:2xl:h-[95px] landscape:5xl:h-[159px]  6xl:h-[200px] portrait:md:h-[80px] portrait:lg:h-[110px] bg-white landscape:h-[50px]'>
        <Toaster
          position='top-right'
          toastOptions={{
            iconTheme: {
              primary: '#365314',
              secondary: '#a7bfb4',
            },
            style: {
              border: '1px solid #121212',
              'border-radius': '1px',
              padding: '16px',
              color: '#121212',
              'font-size': '1rem',
              'text-transform': 'uppercase',
            },
          }}
        />

        <Link to={'/'}>
          <h1 className='mt-2 font-tabac text-[8vw] leading-none md:mt-3 md:text-[1.6rem] lg:mt-4 xl:mt-5 xl:text-[2.2rem]  2xl:mt-6 4xl:mt-5 5xl:mt-10 5xl:text-[2.5rem] 6xl:text-[3.1rem] portrait:md:text-[4.3vw] portrait:md:mt-2 landscape:text-[2rem]'>
            plants&co
          </h1>
        </Link>

        <div className='hidden gap-10 md:flex'>
          {/**
      <div className="flex gap-1 stroke-green-900">
      <button onClick={handleSearch}>
      <img src={searchIcon} alt="magnifying glass" className="w-6" />
      </button>
      <form onSubmit={handleSearch}>
      <input
      type="text"
      placeholder="succulent..."
      className="rounded-full border-2 border-green-700 pl-3"
      value={searchTerm}
      onChange={(e) => dispatch(adjustSearchBy(e.target.value))}
      />
      </form>
      </div>
    */}

          <ul className='lg:flex gap-16 font-outfit md:text-[.7rem] hidden lg:text-[1.2vw] xl:gap-20 2xl:gap-28 4xl:text-[1.3rem] 5xl:text-[1.6rem] 6xl:gap-40 portrait:lg:text-[1.4rem]'>
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
        <div className='relative hidden w-[90vw] lg:flex'>
          <img src={decoratedLine} alt='' className='absolute w-full ' />
        </div>

        {/**hamburger menu */}

        <button
          className='z-30  lg:hidden'
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
