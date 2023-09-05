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
      <div className='flex justify-center'>
        <section>
          <FilterSection />
          <Sort />
          <AllProductsSection />

          <ProductPagination />
        </section>
      </div>
    </>
  ) : (
    <Spinner />
  );
}

export default AllProducts;
