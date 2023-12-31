import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import box from '../assets/box.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSingleProduct,
  fetchSingleProduct,
  resetStatusError,
  fetchAllProducts,
  selectProductLoading,
} from '../slices/product/productSlice.js';
import LikedProduct from './UI/LikedProduct.jsx';
import { addOneToCart } from '../slices/users/cartSlice.js';
import SimilarProducts from './SimilarProducts.jsx';
import toast from 'react-hot-toast';
import btnHover from '../style_utils.js';

import Spinner from './UI/Spinner.jsx';
import { motion } from 'framer-motion';

const singleProduct = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();

  const productLoading = useSelector(selectProductLoading);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    dispatch(fetchSingleProduct(productId));
    dispatch(fetchAllProducts());
    return () => dispatch(resetStatusError());
  }, [dispatch, productId]);

  const singleProduct = useSelector(selectSingleProduct);

  function addToCart() {
    dispatch(addOneToCart(productId));
  }

  const [fullDescription, setFullDescription] = useState(
    singleProduct.shortDescription
  );

  const handleFullDescription = () => {
    if (fullDescription === singleProduct.shortDescription) {
      setFullDescription(singleProduct.description);
    } else {
      setFullDescription(singleProduct.shortDescription);
    }
  };

  useEffect(() => {
    setFullDescription(singleProduct.shortDescription);
  }, [singleProduct.shortDescription]);

  const notify = () => toast.success('Product added to cart!');

  // strip the extension from the product image filename to be re-used as [.webp|.png]
  const imageBaseURL = singleProduct?.imageURL?.split('.').at(0);

  useEffect(() => {
    setLoading(true);
  }, [productId]);

  btnHover();

  return (
    <>
      <Spinner loading={loading} />
      {imageBaseURL && !productLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5,
            ease: [0.17, 0.67, 0.83, 0.67],
          }}
          className='portrait:lg:flex portrait:lg:flex-col portrait:lg:gap-16 '
        >
          <main className='flex justify-center font-raleway text-[#212922] md:h-[470px] landscape:3xl:mt-[1%] 4xl:mx-auto 4xl:min-h-[690px] 4xl:w-[1700px] 6xl:w-[2200px] portrait:px-4  portrait:md:mt-10  landscape:pt-16 landscape:lg:pt-24 landscape:xl:pt-32 landscape:5xl:pt-44 portrait:lg:pt-36 landscape:short:pt-28 portrait:h-[100svh]'>
            <div className='pt-8 portrait:pt-44 portrait:xs:pt-28 flex flex-col justify-center md:flex-row md:gap-5 portrait:md:w-screen portrait:md:gap-4 portrait:lg:gap-20 portrait:md:mx-7 portrait:h-[100svh]'>
              {/**mobile header only */}
              <div className='mx-auto w-fit md:mx-0 portrait:md:w-1/2 portrait:lg:w-fit '>
                <header className='flex justify-center pb-4 text-center  font-outfit text-[4.9vw] landscape:text-[1.4rem] font-medium-light uppercase text-green-gray md:hidden '>
                  {singleProduct.name}
                </header>
                <div className='relative'>
                  <div className='absolute top-4 right-4 md:hidden'>
                    <LikedProduct />
                  </div>
                  <picture
                    onLoad={() => setLoading(false)}
                    className='h-96 md:h-full picture-wrapper'
                  >
                    <source
                      type='image/webp'
                      srcSet={imageBaseURL + '.webp'}
                      width={1070}
                      height={1400}
                    />
                    <source
                      type='image/png'
                      srcSet={singleProduct?.imageURL}
                      width={1070}
                      height={1400}
                    />
                    <img
                      className='h-96 w-80  landscape:md:h-full 4xl:w-[460px]'
                      src={`${singleProduct.imageURL}`}
                      alt='error showing photo'
                      width={1070}
                      height={1400}
                    />
                  </picture>
                </div>
              </div>
              {/**desktop header */}
              <div className=' md:mx-0 md:w-1/3 portrait:md:w-3/6  portrait:w-full landscape:lg:mx-12 landscape:mx-5'>
                <div className='mb-[5%] hidden flex-col  items-end justify-center md:flex'>
                  <header className=' self-center pr-6 font-outfit text-[2.3vw] landscape:lg:text-[1.7vw] uppercase text-green-gray landscape:4xl:text-[1.5vw] portrait:md:text-[3vw] landscape:6xl:text-[2.4rem]'>
                    {singleProduct.name}
                  </header>
                  <LikedProduct />
                </div>

                <div className='mb-0 flex justify-between p-2 text-[2.5vw] md:mb-4 md:border-b-4 md:p-0  md:text-[1vw] landscape:xs:text-[.7rem] 3xl:text-[.7vw] portrait:md:text-[1.9vw] portrait:text-[3.3vw] '>
                  <p>
                    {singleProduct?.tags
                      ?.map(({ tagName }) => tagName)
                      .join(', ')}
                  </p>
                </div>
                <p className='mb-2 text-[3.7vw] font-bold text-[#212922] md:mb-4 md:text-[2vw]  xl:text-[1.6vw] 4xl:text-[1.3vw] portrait:md:text-[1.5rem]  portrait:lg:text-[1.8rem] portrait:text-[4.9vw]'>
                  ${singleProduct.price}
                </p>

                {fullDescription && (
                  <p
                    className='mb-8 min-w-full  cursor-pointer text-justify text-[2.8vw] leading-tight md:text-[1vw] 4xl:text-[.7vw] portrait:text-[3.5vw]  portrait:md:text-[1rem] portrait:lg:text-[1.1rem] landscape:text-[.7rem] landscape:xl:text-[.8rem]'
                    onClick={handleFullDescription}
                  >
                    {fullDescription}

                    {fullDescription === singleProduct.shortDescription ? (
                      <span className='font-bold '> see more</span>
                    ) : (
                      <span className='font-bold'> see less</span>
                    )}
                  </p>
                )}

                <div className=' mb-3 md:border-b-4 md:pb-4'>
                  <button
                    onClick={() => {
                      notify();
                      addToCart();
                    }}
                    className='btn ease mx-auto block w-full transition-all duration-500 hover:scale-[1.02]  py-2 font-light font-outfit text-[3.8vw] text-white md:text-[2vw] landscape:lg:text-[1.7vw] landscape:4xl:text-[1.5vw] landscape:5xl:text-[1.2vw] portrait:md:text-[2.1vw] portrait:text-[5vw] landscape:6xl:text-[2.2rem]'
                  >
                    <span>ADD TO CART</span>
                  </button>
                </div>
                <div className='flex items-center gap-2'>
                  <img
                    src={box}
                    alt='shipping box icon'
                    className='w-4 4xl:w-[6] portrait:md:w-6'
                  />
                  <p className='text-[2.5vw] md:text-[1vw] 4xl:text-[.8vw] 5xl:text-[.7vw] portrait:md:text-[1.7vw] portrait:lg:tex-[1.9vw] portrait:text-[3.7vw] landscape:text-[.7rem]'>
                    Free shipping in the USA
                  </p>
                </div>
              </div>
            </div>
          </main>
          <SimilarProducts />
        </motion.div>
      )}
    </>
  );
};

export default singleProduct;
