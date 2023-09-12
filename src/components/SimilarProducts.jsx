import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductCard from './ProductCard.jsx';

import {
  selectSimilar,
  selectSimilarPage,
  similarPageChange,
} from '../slices/product/productSlice';

import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const SimilarProducts = () => {
  const dispatch = useDispatch();

  const similarProducts = useSelector(selectSimilar);
  const similarPage = useSelector(selectSimilarPage);

  const handlePageChange = (pageInfo) => {
    dispatch(similarPageChange(pageInfo));
  };

  return (
    <section className='min-h-96 mx-auto mt-[16%] w-screen max-w-6xl pb-[5%] landscape:lg:mt-[14%] landscape:4xl:mt-[10%] landscape:5xl:mt-[9%] 6xl:mt-[3%] portrait:md:mt-20'>
      <h2 className='my-4 ml-4 text-center font-outfit text-[4.6vw] text-[#212922] md:text-[2vw] xl:text-[1.7vw] 4xl:text-[1.5vw] 5xl:text-[1.2vw] 6xl:text-[1vw] portrait:md:text-[2.6vw]'>
        YOU MIGHT ALSO LIKE
      </h2>
      <div className='flex md:items-center'>
        <button
          className='flex h-full min-w-[52px] max-w-sm items-center justify-center 4xl:mr-10'
          onClick={() => handlePageChange('previous')}
        >
          <img src={leftArrow} alt='left arrow icon' className='w-0 lg:w-8' />
        </button>

        <div className='mx-auto grid grid-cols-1 justify-items-center gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-4'>
          {/*
          {similarProducts && window.innerWidth <= 768
            ? similarProducts
                .slice(similarPage, similarPage + 2)
                .map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })
            : similarProducts
                .slice(similarPage, similarPage + 4)
                .map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
                */}

          {similarProducts &&
            // window.innerWidth <= 500 &&
            similarProducts
              .slice(similarPage, similarPage + 4)
              .map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
        </div>
        <button
          className='flex h-full min-w-[52px] max-w-sm items-center justify-center 4xl:ml-10'
          onClick={() => handlePageChange(['next', similarProducts.length])}
        >
          <img src={rightArrow} alt='right arrow icon' className='w-0 lg:w-8' />
        </button>
      </div>
    </section>
  );
};

export default SimilarProducts;
