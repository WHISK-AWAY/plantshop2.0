import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustWishlist, selectWishlist } from '../slices/users/wishlistSlice';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();

  const wishlist = useSelector(selectWishlist);

  const handleRemove = (productId) => {
    dispatch(
      adjustWishlist({
        productId,
        action: 'delete',
        wishlistId: wishlist[0]?.id,
      })
    );
  };

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
        className='flex h-52 items-center justify-between gap-6 md:mx-16 portrait:xs:gap-3 portrait:xs:px-1 portrait:xxs:gap-1'
      >
        <picture className='h-36 2xl:h-40 aspect-[3/4]'>
          <source
            type='image/webp'
            srcSet={`${product.imageURL.split('.').at(0)}.webp`}
            width={1070}
            height={1400}
          />
          <source
            type='image/png'
            srcSet={product.imageURL}
            width={1070}
            height={1400}
          />
          <img
            src={`${product.imageURL}`}
            alt={`product photo of ${product.name}`}
            width={1070}
            height={1400}
          />
        </picture>
        <div className=' min-w-48 flex flex-col  gap-2 justify-center items-center'>
          <Link to={`/products/${product.id}`}>
            <h1 className='cursor-pointer text-[1.5vw] uppercase hover:underline xl:text-[1.4vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:xs:text-[3.8vw]  portrait:md:text-[2.5vw] portrait:text-center portrait:xxs:text-[4vw] portrait:xxs:w-full'>
              {product.name}
            </h1>
          </Link>
          <p className='portrait:text-center text-[1.2vw] italic text-gray-600 xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[1.8vw] portrait:xs:text-[2.7vw] portrait:md:text-[2vw] portrait:xxs:text-[2.7vw]'>
            {product?.tags?.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p className='text-[1.5vw] xl:text-[1.3vw] 2xl:text-[1.1vw] 4xl:text-[1vw] 5xl:text-[.8vw] 6xl:text-[.6vw] portrait:text-[2.3vw] portrait:xs:text-[3.2vw] portrait:md:text-[2.5vw] portrait:text-center portrait:xxs:text-[3.6vw]'>
            ${product.price}
          </p>
        </div>
        <div className='ml-8 portrait:xxs:ml-1'>
          <button
            onClick={() => handleRemove(product.id)}
            className='block   border border-green-gray/50 py-1 px-2 text-[1.2vw] transition-all duration-500 hover:bg-gray-200 3xl:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.6vw] 6xl:text-[.5vw] portrait:text-[2vw] portrait:xs:text-[3.1vw] portrait:md:text-[2.2vw] portrait:xxs:text-[3vw]'
          >
            remove
          </button>
        </div>
      </motion.div>
      <div className='mx-auto w-5/6 border-b-2 border-gray-300'></div>
    </>
  );
};

export default WishlistCard;
