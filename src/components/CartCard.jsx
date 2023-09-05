import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import {
  addOneToCart,
  removeOneFromCart,
  removeCartRow,
} from '../slices/users/cartSlice';
import minus from '../assets/minus.svg';
import plus from '../assets/plus.svg';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { motion } from 'framer-motion';

const CartCard = ({ product, item }) => {
  const dispatch = useDispatch();
  const imageBaseURL = useRef(null);

  useEffect(() => {
    imageBaseURL.current = product.imageURL.split('.').at(0);
  }, [product]);

  function decrementCart(productId) {
    dispatch(removeOneFromCart(productId));
  }

  function incrementCart(productId) {
    dispatch(addOneToCart(productId));
  }

  function removeFromCart(productId) {
    toast.error('Product removed from cart!');
    dispatch(removeCartRow(productId));
  }

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
        className='flex h-52 items-center justify-around gap-6 md:mx-4 portrait:xs:gap-3 portrait:xs:px-1'
      >
      <picture className='h-36 2xl:h-40 aspect-[3/4]'>
          <source
            type='image/webp'
            srcSet={`${imageBaseURL.current}.webp`}
            width={1070}
            height={1400}
          />
          <source
            type='image/png'
            srcSet={`${imageBaseURL.current}.png`}
            width={1070}
            height={1400}
          />
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            width={1070}
            height={1400}
            // className='h-36 2xl:h-40'
          />
        </picture>
        <div className='min-w-48 flex flex-col gap-2  justify-center items-center'>
          <Link to={`/products/${product.id}`}>
            <h1 className='cursor-pointer text-[1.5vw] uppercase hover:underline xl:text-[1.4vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-center  portrait:xs:text-[3.8vw] portrait:md:text-[2.5vw]'>
              {product.name}
            </h1>
          </Link>
          <p className='text-center text-[1.2vw] italic text-gray-600 xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-center portrait:text-[1.8vw] portrait:xs:text-[2.7vw] portrait:md:text-[2vw]'>
            {product?.tags.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p className='text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1.1vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-center portrait:text-[2.3vw] portrait:xs:text-[3.2vw] portrait:md:text-[2.5vw] '>
            ${product.price}
          </p>
          <div className='flex w-fit  gap-2 rounded-full border border-green-gray px-2 py-1 2xl:py-[3px] 4xl:py-[2px] portrait:self-center'>
            <button onClick={() => decrementCart(product.id)}>
              <img
                src={minus}
                alt='minus qty icon'
                className='w-2 xl:w-3 4xl:w-4 portrait:xs:w-5'
              />
            </button>
            <p className='text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.4vw] portrait:xs:text-[3vw] portrait:xs:py-[1px] portrait:md:text-[2vw] portrait:md:px-2'>
              {item.qty}
            </p>
            <button onClick={() => incrementCart(product.id)}>
              <img
                src={plus}
                alt='plus qty icon'
                className='w-2 xl:w-3 4xl:w-4 portrait:xs:w-5'
              />
            </button>
          </div>
        </div>
        <div className='ml-8'>
          <button
            onClick={() => {
              removeFromCart(product.id);
            }}
            className='block   border border-green-gray/50 py-1 px-2 text-[1.2vw] transition-all duration-500 hover:bg-gray-100 3xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[2vw] portrait:xs:text-[3.1vw] portrait:md:text-[2.2vw]'
          >
            remove
          </button>
        </div>
      </motion.div>
      <div className='mx-auto w-5/6 border-b-2 border-gray-300'></div>
    </>
  );
};

export default CartCard;
