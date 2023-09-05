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


  const images = document.querySelectorAll('.product-picture-wrapper');

  const productsPerPage = shownProducts?.slice(productPage, productPage + 12);

  const visibleProducts = productsPerPage.map((product) => {
    return product.id;
  });

  // let imgId = [];

  // const idTracker = () =>
  //   Array.from(images).map((img) => {
  //     if (visibleProducts.includes(+img.id)) imgId.push(+img.id);
  //   });

  // console.log(imgId);

  const reportIn = (childId) => {
    setReportId((prev) => [...prev, childId]);
  };


  // console.log('report in', reportId)
  useEffect(() => {
    if (reportId.length === visibleProducts.length) {
      setLoading(false);
      // setReportId([])
    } 
  }, [reportId.length]);

  useEffect(() => {
    // setReportId([]);

    if(productPage !== prevPage) {
      // console.log('report before', reportId)
      setLoading(true);
      setPrevPage(productPage);
      setReportId([])
    }
    // console.log('pp', productPage)
  }, [productPage])


  // console.log('visible prods', visibleProducts)
  // console.log('product page', productPage)
  
  useEffect(() => {
    // console.log('report after', reportId)
    // console.log('loading', loading)
  }, [loading])

  return (
    !productsLoading && (
      <main className='mx-6 mb-4 grid max-w-7xl grid-cols-1 justify-items-center gap-x-4 gap-y-8 xs:grid-cols-2 sm:mx-12 md:grid-cols-3 md:gap-x-8 lg:grid-cols-4'>
      <Spinner loading={loading}/>

        {productsPerPage.map((product) => {
          return (
            <div key={product.id}>
              <ProductCard
                product={product}
                loading={loading}
                setLoading={setLoading}
                reportIn={reportIn}
              />
            </div>
          );
        })}
      </main>
    )
  );
};

export default AllProductsSection;
