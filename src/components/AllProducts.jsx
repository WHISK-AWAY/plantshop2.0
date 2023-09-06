import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adjustFilter,
  fetchAllProducts,
  resetStatusError,
} from '../slices/product/productSlice';
import FilterSection from './FilterSection.jsx';
import AllProductsSection from './AllProductsSection.jsx';
import ProductPagination from './ProductPagination.jsx';
import Sort from './Sort.jsx';
import { selectProductLoading } from '../slices/product/productSlice';
import Spinner from './UI/Spinner.jsx';

const AllProducts = () => {
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);

  useEffect(() => {
    dispatch(fetchAllProducts());

    return () => {
      dispatch(resetStatusError());
      dispatch(adjustFilter(''));
    };
  }, [dispatch]);

  return !productsLoading ? (
    <>
      <div className='flex flex-col justify-between items-center md:min-h-[calc(100vh_-_4rem)]  lg:min-h-[calc(100dvh_-_82px)] xl:min-h-[calc(100dvh_-_100px)] 2xl:min-h-[calc(100dvh_-_105px)]  5xl:min-h-[calc(100dvh_-_159px)]  6xl:min-h-[calc(100dvh_-_200px)]   portrait:xs:min-h-[calc(100dvh_-_5rem)] portrait:md:min-h-[calc(100dvh_-_110px)] portrait:lg:min-h-[calc(100dvh_-_140px)] portrait:xxs:h-[calc(100dvh_-_5rem)]'>
        <FilterSection />
        <Sort />
        <AllProductsSection />
       
        <ProductPagination />
        
      </div>
    </>
  ) : (
    <Spinner />
  );
};

export default AllProducts;
