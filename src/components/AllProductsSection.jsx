import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.jsx';
import {
  selectFilteredProducts,
  selectProductPage,
  selectSearchedItems,
  selectUseSearch,
  selectProductLoading,
} from '../slices/product/productSlice';
import { useSelector } from 'react-redux';

import Spinner from './UI/Spinner.jsx';
import {motion} from 'framer-motion'

const AllProductsSection = () => {
  const filteredProducts = useSelector(selectFilteredProducts);
  const searchedItems = useSelector(selectSearchedItems);
  const productPage = useSelector(selectProductPage);
  const useSearch = useSelector(selectUseSearch);
  const productsLoading = useSelector(selectProductLoading);

  const shownProducts = useSearch ? searchedItems : filteredProducts;

  const [loading, setLoading] = useState(true);
  const [reportId, setReportId] = useState([]);
  const [prevPage, setPrevPage] = useState(null);



  const productsPerPage = shownProducts?.slice(productPage, productPage + 12);

  const visibleProducts = productsPerPage.map((product) => {
    return product.id;
  });



  const reportIn = (childId) => {
    setReportId((prev) => [...prev, childId]);
  };


  useEffect(() => {
    if (reportId.length === visibleProducts.length) {
      setLoading(false);
    } 
  }, [reportId.length]);

  useEffect(() => {

    if(productPage !== prevPage) {
      setLoading(true);
      setPrevPage(productPage);
      setReportId([])
    }
  }, [productPage])

  
  useEffect(() => {
  }, [loading])

  return (
    !productsLoading && (
      <main className='mx-6 mb-4 grid max-w-7xl grid-cols-1 justify-items-center gap-x-4 gap-y-8 xs:grid-cols-2 sm:mx-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4'>
      <Spinner loading={loading}/>

        {productsPerPage.map((product) => {
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.1,
                duration: 0.5,
                ease: [0.17, 0.67, 0.83, 0.67],
              }}
              key={product.id}
            >
              <ProductCard
                product={product}
                loading={loading}
                setLoading={setLoading}
                reportIn={reportIn}
              />
            </motion.div>
          );
        })}
      </main>
    )
  );
};

export default AllProductsSection;
