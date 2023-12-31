import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from '../slices/checkout/checkoutSlice';
import { purgeCart } from '../slices/users/cartSlice';

export default function OrderConfirmation() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const status = searchParams.get('status');
  const orderId = searchParams.get('orderid');

  useEffect(() => {
    if (status && orderId) {
      dispatch(updateOrderStatus({ orderId, status }));
      if (status === 'complete') {
        window.localStorage.removeItem('cart');
        setTimeout(() => {
          dispatch(purgeCart());
        }, 1000);
      }
    }
  }, [orderId, status]);

  return (
    <div className="relative bg-[url('/assets/bg_img/order_conf_page.webp')] bg-cover bg-center font-outfit h-[100svh]">
      <div className='flex h-full items-center justify-center pb-20 xl:pb-36 5xl:pb-56 landscape:pt-10'>
        <div className='relative z-10 w-4/6 bg-green-gray bg-opacity-60 p-[3%]  3xl:w-fit portrait:w-full portrait:md:w-4/5 portrait:md:py-8 landscape:w-screen landscape:lg:w-fit'>
          {status && status === 'complete' ? (
            <>
              <div className=''>
                <h1 className='pb-4 text-center text-[2.3vw] font-bold tracking-wide text-primary-bright-white  3xl:text-[2.1vw] 4xl:text-[1.9vw]  portrait:md:text-[2rem] portrait:text-[5vw]'>
                  THANK YOU FOR YOUR PURCHASE!
                </h1>
                <div>
                  <p className='text-center text-[1.5vw] tracking-wide text-primary-bright-white 3xl:text-[1.3vw] landscape:4xl:text-[1.1vw] 5xl:text-[.8vw]  portrait:md:text-[1.4rem] portrait:text-[4.3vw] landscape:text-[1rem]'>
                    Your order confirmation is #{orderId}
                  </p>
                </div>
                <p className='text-center text-[1.3vw] text-primary-bright-white 3xl:text-[1vw] landscape:4xl:text-[.9vw] 5xl:text-[.7vw]  portrait:md:text-[1.3rem] portrait:text-[3.8vw] portrait:xxs:pt-3 landscape:text-[.7rem] landscape:xl:text-[.9rem]'>
                  We are starting on your order right away, and you should
                  receive your order confirmation email shortly!
                </p>
              </div>

              <div className='mt-2 portrait:xs:mt-4 text-center text-[1.3vw] tracking-wide text-primary-bright-white 3xl:text-[1vw]  landscape:4xl:text-[.9vw] 5xl:text-[.7vw] portrait:md:text-[1.3rem]  portrait:text-[3.8vw] landscape:text-[.6rem] landscape:xl:text-[.9rem]'>
                <p className='font-light'>
                  While you are waiting on your order, take a look at our new{' '}
                  <Link to={'/products'} className='font-semibold underline'>
                    new arivals
                  </Link>
                </p>
              </div>
            </>
          ) : (
            <div className='text-white flex flex-col items-center  text-center gap-2 5xl:gap-5'>
              <p className='text-center text-lg uppercase 5xl:text-[1.5vw] portrait:lg:text-[3vw]'>
                Checkout canceled
              </p>
              <p className='font-light text-sm 5xl:text-[.7vw] portrait:lg:text-[2vw]'>
                It's okay to change your mind! and it's okay to change your mind
                again! shop our{' '}
                <Link to={'/products'} className='font-semibold underline'>
                  new arivals
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
