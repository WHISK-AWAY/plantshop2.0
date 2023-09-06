import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  productPageChange,
  selectFilteredProducts,
} from '../slices/product/productSlice';
import leftArrow from '../assets/left-arrow.svg';
import rightArrow from '../assets/right-arrow.svg';

const ProductPagination = () => {
  const dispatch = useDispatch();

  const filteredProducts = useSelector(selectFilteredProducts);

  const handlePageChange = (pageInfo) => {
    if (filteredProducts.length < 12) return;
    dispatch(productPageChange(pageInfo));
  };

  return (
    <div className="flex max-h-[7%]  gap-6 font-raleway pt-[3%] md:pb-[3%] pb-[8%] ">
      <button
        className="h-full w-fit"
        onClick={() => handlePageChange('previous')}
      >
        <img src={leftArrow} alt="left arrow icon" className="w-4 lg:w-5 3xl:w-6" />
      </button>
      
    
      <button
        className=" h-full w-fit "
        onClick={() => handlePageChange(['next', filteredProducts?.length])}
      >
        <img src={rightArrow} alt="right arrow icon" className="w-4 lg:w-5 3xl:w-6" />
      </button>
    </div>
  );
};

export default ProductPagination;
