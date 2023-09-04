import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../slices/users/cartSlice';
import toast from 'react-hot-toast';
import { selectProductLoading } from '../slices/product/productSlice';
import Spinner from './UI/Spinner.jsx';
import 'lazysizes';

import { LazyLoadImage } from 'react-lazy-load-image-component';
// import testImg from '../../public/assets/product_img/';

const ProductCard = (props) => {
  const { product, loading, setLoading } = props;
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);

  
  function addToCart() {
    dispatch(addOneToCart(product.id));
    toast.success('Product added to cart!');
  }
  
  const imageBaseURL = product?.imageURL.split('.').at(0);
  const lqImg = imageBaseURL + '-lq_1.wepb';


  return !productsLoading ? (
    <div key={product.id} className='group font-raleway'>
      <div className='relative'>
        <Link
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          to={`/products/${product.id}`}
        >


          <div
            className={` w-full h-full`}
            style={{
              backgroundImage: `url(${imageBaseURL}-lq_1.webp)`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <picture id={product.id} className='group relative w-full product-picture-wrapper'
            onLoad={() => setLoading(false)}
            >
              {/* Product images are a few pixels off of given h/w below, but this is good enough for preventing layout shift */}

              <source
                type='image/webp'
                srcSet={`${imageBaseURL}.webp`}
                width={1070}
                height={1400}
                // loading='lazy'
              />
              <source
                type='image/png'
                srcSet={product.imageURL}
                // loading='lazy'
                width={1070}
                height={1400}
              />

              <img src={product.imageURL} loading='lazy' alt='' className='opacity-0' onLoad={(e) => e.target.classList.remove('opacity-0')}/>
            </picture>
          </div>
          {/**
          <LazyLoadImage
          src={`${product.imageURL}`}
          alt='Picture of plant on a counter'
          placeholderSrc={lqImg}
          effect='opacity'
          // visibleByDefault={true}
          // width={1070}
          // height={1400}
          // className="group relative w-full"
          />
        */}
        </Link>
        <button
          onClick={addToCart}
          className='ease bottom-0 mx-auto flex w-full justify-center bg-green-gray py-1  font-medium text-white opacity-80 transition duration-500 hover:opacity-100 group-hover:visible md:invisible md:absolute md:opacity-60 portrait:visible'
        >
          ADD TO CART
        </button>
      </div>
      <Link to={`/products/${product.id}`}>
        <p className='pt-3 portrait:xs:pt-1 portrait:md:pt-3 text-center text-[3.9vw] font-medium-light uppercase md:mb-1 md:text-[1.3vw] 5xl:text-[.8vw] lg:text-[1.2vw] 3xl:text-[1vw] 6xl:text-[.7vw] portrait:xs:text-[4vw] portrait:md:text-[2.2vw] portrait:lg:text-[2vw]'>
          {product.name}
        </p>
        <p className='text-center text-[3.7vw] md:text-[1.3vw] 3xl:text-[.9vw] 6xl:text-[.7vw] portrait:xs:text-[4vw]  portrait:md:text-[2.3vw] 5xl:text-[.4]'>
          ${product.price}
        </p>
      </Link>
    </div>
  ) : (
    <Spinner />
  );
};

export default ProductCard;
