import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCart,
  purgeCart,
  selectCartLoading,
  fetchCart,
} from '../slices/users/cartSlice';
import CartCard from './CartCard.jsx';
import CartSubtotal from './CartSubtotal.jsx';
import { selectProductLoading } from '../slices/product/productSlice';

import btnHover from '../style_utils';
import Spinner from './UI/Spinner';

export default function CartView() {
  const dispatch = useDispatch();
  const cartLoading = useSelector(selectCartLoading);
  const cart = useSelector(selectCart);
  const productsLoading = useSelector(selectProductLoading);

  const [loading, setLoading] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);


  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  function emptyCart() {
    dispatch(purgeCart());
  }

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/bg_img/cart.webp';

    img.onload = () => {
      setImgLoaded(true);
    };
  }, []);

  useEffect(() => {
    if (imgLoaded && !cartLoading && !productsLoading) {
      setLoading(false);
    }
  }, [cartLoading, imgLoaded, productsLoading]);

  btnHover();

  return (
    <>
      <Spinner loading={loading} />

      <div className='relative xl:pt-28 5xl:pt-44 6xl:pt-56'>
        <main className="cart-page-wrapper font-green-gray absolute top-0 left-0 h-screen w-screen overflow-hidden bg-opacity-90 bg-[url('/assets/bg_img/cart.webp')] bg-cover bg-fixed bg-bottom bg-no-repeat font-outfit  pt-3   portrait:w-full landscape:lg:pt-20">
          <h1 className='mb-4 text-center text-[2.7vw] font-bold text-green-gray mix-blend-multiply lg:text-[2.6vw] xl:text-[2.3vw] 3xl:text-[2.3vw] 4xl:text-[2.1vw] 5xl:text-[1.8vw] 6xl:text-[1.5vw] portrait:text-center portrait:md:text-[4vw] portrait:pt-20 portrait:text-[5vw]  landscape:lg:pt-28 landscape:short:text-[1.7rem] landscape:short:pt-28 landscape:md:pt-[9%] landscape:5xl:pt-32 landscape:6xl:pt-44 landscape:pt-10 portrait:lg:pt-28 landscape:xs:pt-10'>
            CART
          </h1>
          <div className='mx-auto max-h-[70vh]  w-fit max-w-[1200px] overflow-y-auto border border-green-gray bg-white/80 p-2 md:min-w-[700px] 4xl:min-w-[1000px] 5xl:max-h-[65vh] 5xl:min-w-[900px]  portrait:border-green-gray portrait:xs:min-h-[80vh] portrait:w-[96vw] portrait:xs:w-[94vw] portrait:xs:p-2 portrait:md:min-h-[80vh] portrait:lg:max-h-[70vh] portrait:h-[90svh] landscape:w-[95svw] landscape:h-[59svh] landscape:xs:h-[65svh] landscape:lg:w-[90svw] landscape:xl:h-[80svh] '>
            {cart?.expandedCart && cart?.expandedCart.length > 0 ? (
              <>
                <div className='h-full overflow-y-auto'>
                  {cart.expandedCart.map((item) => {
                    return (
                      <div key={item.product.id}>
                        <CartCard product={item.product} item={item} />
                      </div>
                    );
                  })}
                </div>
                <CartSubtotal />
                <div className='mx-auto my-3 mb-6 flex w-full  flex-col items-center md:w-2/5 lg:w-3/5 2xl:w-full portrait:md:w-4/5 portrait:lg:w-3/4'>
                  <Link
                    className='btn mx-auto block w-full py-2 text-center text-[1.4vw] text-white duration-700 ease hover:scale-[1.04] transition-all md:w-3/4 2xl:w-2/4 5xl:w-2/4 5xl:text-[.8vw] 6xl:text-[.7vw] portrait:text-[4vw] portrait:md:text-[2.5vw] landscape:short:text-[1rem] landscape:3xl:text-[1.1rem]'
                    to='/shipping'
                  >
                    <span>PROCEED TO PAYMENT</span>
                  </Link>
                  <button
                    onClick={emptyCart}
                    className='text-[1.3vw] landscape:4xl:text-[1.1rem] 5xl:text-[.8vw] 6xl:text-[.7vw]  portrait:md:text-[2.5vw] portrait:text-[4vw] portrait:pt-3 pt-2 landscape:short:text-[.9rem]'
                  >
                    empty cart
                  </button>
                </div>
              </>
            ) : (
              <div className='mx-auto flex h-full w-fit flex-col items-center justify-center pt-10 text-center text-green-gray'>
                <h2 className='text-[1rem]  xl:text-[2vw] 2xl:text-[1.6vw] 4xl:text-[1.3vw] 5xl:text-[1.1vw] portrait:text-[5vw] portrait:md:text-[3.7vw]'>
                  Your cart is empty...
                </h2>
                <p className='text-[.9rem] xl:text-[1.5vw] 2xl:text-[1.2vw] 4xl:text-[1vw] 5xl:text-[.9vw] portrait:text-[3.7vw] portrait:md:text-[1.4rem]'>
                  Can we recommend something from our shop?
                </p>
                <Link
                  className='btn mt-8 self-center text-[1.3vw] py-1 px-4  text-white hover:scale-[1.04] transition-all ease duration-700 2xl:text-[1vw] 4xl:text-[.8vw] portrait:px-6 portrait:text-[4vw] portrait:md:text-[2.8vw] '
                  to={'/products'}
                >
                  <span>shop now</span>
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
