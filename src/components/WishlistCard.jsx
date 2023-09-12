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
        className='flex h-52 items-center portrait:md:h-64 justify-between gap-6 md:mx-16 portrait:xs:gap-2 portait:md:gap-10 portrait:xs:px-1 portrait:gap-1 portrait:lg:h-96 landscape:xl:mx-36 landscape:5xl:h-64'
      >
        <picture className='h-36 landscape:xl:h-44 landscape:5xl:h-56 2xl:h-40 aspect-[3/4] portrait:md:aspect-square portrait:lg:h-52'>
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
            <h1 className='cursor-pointer text-[2vw] uppercase hover:underline landscape:xl:text-[1.3rem] 2xl:text-[1.2vw] 4xl:text-[1vw] landscape:5xl:text-[1.5rem] 6xl:text-[.6vw]   portrait:md:text-[1.4rem] portrait:lg:text-[1.4rem] portrait:text-center portrait:text-[4vw] portrait:xxs:w-full landscape:lg:text-[1rem]'>
              {product.name}
            </h1>
          </Link>
          <p className='portrait:text-center text-[1.7vw] italic text-gray-600 landscape:xl:text-[1rem] 4xl:text-[.8vw] landscape:5xl:text-[1.2rem] 6xl:text-[.5vw] portrait:text-[3vw] portrait:xs:text-[3w] portrait:md:text-[2.5vw] landscape:lg:text-[.6rem]'>
            {product?.tags?.map(({ tagName }) => tagName).join(', ')}
          </p>
          <p className='text-[2vw] landscape:xl:text-[1.3rem] 2xl:text-[1.1vw] 4xl:text-[1vw] landscape:5xl:text-[1.5rem] 6xl:text-[.6vw] portrait:md:text-[1.4rem]  portrait:text-center portrait:text-[3.6vw] portrait:lg:text-[1.7rem]'>
            ${product.price}
          </p>
        </div>
        <div className='ml portrait:xxs:ml-1'>
          <button
            onClick={() => handleRemove(product.id)}
            className='block   border border-green-gray/50 py-1 px-2 text-[1.9vw] landscape:lg:text-[.8rem] transition-all duration-500 hover:bg-gray-200 3xl:text-[1vw] 4xl:text-[.8vw] landscape:5xl:text-[1.5rem] 6xl:text-[.5vw]  portrait:md:text-[2.2vw] portrait:lg:text-[.8rem] portrait:text-[3vw] landscape:short:text-[1rem]'
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
