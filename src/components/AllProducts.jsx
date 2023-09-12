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
      <div className='flex flex-col justify-between items-center portrait:pt-20 landscape:pt-8 landscape:lg:pt-24'>
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
