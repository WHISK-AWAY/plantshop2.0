import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOneToCart } from '../slices/users/cartSlice';
import toast from 'react-hot-toast';
import { selectProductLoading } from '../slices/product/productSlice';

const ProductCard = (props) => {
  const { product, loading, setLoading, reportIn } = props;
  const dispatch = useDispatch();

  const productsLoading = useSelector(selectProductLoading);

  function addToCart() {
    dispatch(addOneToCart(product.id));
    toast.success('Product added to cart!');
  }

  const imageBaseURL = product?.imageURL.split('.').at(0);
  const lqImg = imageBaseURL + '-lq_1.wepb';

  return (
    !productsLoading && (
      <div key={product.id} className='group font-raleway'>
        <div className='relative'>
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to={`/products/${product.id}`}
          >
            <div
              className={` w-full h-full landscape:xs:w-56 landscape:sm:w-72`}
              style={{
                backgroundImage: `url(${imageBaseURL}-lq_1.webp)`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <picture
                id={product.id}
                className='group relative w-full  product-picture-wrapper'
                onLoad={() => reportIn !== undefined && reportIn(product.id)}
              >
                {/* Product images are a few pixels off of given h/w below, but this is good enough for preventing layout shift */}

                <source
                  type='image/webp'
                  srcSet={product.imageURL.split('.').at(0) + '.webp'}
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
                  src={product.imageURL}
                  alt='`image of the ${product}`'
                  className='opacity-0'
                  onLoad={(e) => e.target.classList.remove('opacity-0')}
                />
              </picture>
            </div>
          </Link>
          <button
            onClick={addToCart}
            className='ease bottom-0 mx-auto flex w-full justify-center bg-green-gray py-1  font-medium text-white opacity-80 transition duration-500 hover:opacity-100 group-hover:visible lg:invisible md:absolute md:opacity-60 portrait:visible'
          >
            ADD TO CART
          </button>
        </div>
        <Link to={`/products/${product.id}`}>
          <p className='pt-3 portrait:xs:pt-1 landscape:xs:w-56 landscape:sm:w-72 portrait:md:pt-3 text-center landscape:text-[1rem] font-medium-light uppercase md:mb-1 md:text-[1.3vw] 5xl:text-[.8vw] lg:text-[1.2vw] 3xl:text-[1vw] 6xl:text-[.7vw] portrait:text-[4vw] portrait:md:text-[1.1rem] portrait:lg:text-[2vw]'>
            {product.name}
          </p>
          <p className='text-center landscape:text-[.9rem] md:text-[1.3vw] landscape:3xl:text-[1rem] 6xl:text-[.7vw] portrait:text-[4vw]  portrait:md:text-[2vw] 5xl:text-[.4]'>
            ${product.price}
          </p>
        </Link>
      </div>
    )
  );
};

export default ProductCard;
