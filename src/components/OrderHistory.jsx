import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  fetchUserOrders,
  resetStatus,
  selectOrders,
} from '../slices/users/orderSlice';
import { selectAuth } from '../slices/users/authSlice';

import { motion } from 'framer-motion';

const OrderHistory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState([]);

  const { auth, token } = useSelector(selectAuth);
  const id = auth.id;
  const { order, status } = useSelector(selectOrders);

  useEffect(() => {
    if (auth && auth.id) {
      dispatch(fetchUserOrders({ id, token }));
    }
    return () => {
      dispatch(resetStatus());
    };
  }, [auth]);

  useEffect(() => {
    setUserOrders(order || []);
  }, [order]);

  const orderDetails = (orderId) => {
    navigate(`/account/orderhistory/${orderId}`);
  };


  return (
    <div className=" portrait:h-[calc(100dvh_-_5rem)] portrait:lg:h-[calc(100dvh_-_140px)] h-[calc(100vh_-_5rem)] w-screen  bg-[url('/assets/misc_bg/acc5.webp')] bg-cover bg-center pt-36 font-outfit md:h-[calc(100dvh_-_4rem)] lg:h-[calc(100dvh_-_82px)] xl:h-[calc(100dvh_-_100px)] 2xl:h-[calc(100dvh_-_105px)] 5xl:h-[calc(100dvh_-_159px)] 6xl:h-[calc(100dvh_-_200px)]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          delay: 0.1,
          duration: 0.5,
          ease: [0.17, 0.67, 0.83, 0.67],
        }}
        className='min-w-xxs portrait:lg:mt-16 w-sm 5xl:min-w-xl  absolute  top-16 mx-auto  w-full pt-16 2xl:top-28 5xl:top-44 6xl:top-64  '
      >
        <p className='font-extrabold pb-3 text-center text-xl font-bold text-white md:text-4xl'>
          PREVIOUS ORDERS
        </p>

        {userOrders?.length > 0 ? (
          <div className=' flex  flex-col items-center justify-center  overflow-x-auto font-outfit font-thin '>
            <table className='w-5/6  bg-white text-center text-xs text-gray-500 dark:text-gray-400'>
              <thead className='bg-green-gray text-[2vw] uppercase text-white md:text-[1vw] '>
                <tr className=''>
                  <th scope='col' className='px-6 py-3 '>
                    Order Id
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Date of Order
                  </th>
                  <th scope='col' className='px-6 py-3 text-center'>
                    Item Qty
                  </th>
                  <th scope='col' className='px-6 py-3 text-right'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order) => {
                  return (
                    <tr
                      onClick={() => orderDetails(order.id)}
                      key={order.id}
                      className='cursor-pointer hover:text-primary-promo-banner'
                    >
                      <th scope='col' className='px-6 py-3'>
                        {order.id}
                      </th>
                      <th scope='col' className='px-6 py-3'>
                        {order.createdAt.slice(0, 10)}
                      </th>
                      <th scope='col' className='px-6 py-3 text-center'>
                        {order.totalQty}
                      </th>
                      <th scope='col' className='px-6 py-3 text-right'>
                        ${order.finalPrice}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className='mx-auto text-center text-lg text-white'>
            No previous orders
          </p>
        )}

        <div className=' m-auto flex justify-center text-center pt-4'>
          <Link
            to='/account'
            className='inline-block w-1/4 border border-white py-1 align-baseline text-sm text-white transition-all duration-500 hover:bg-primary-bright-white/20  portrait:xxs:w-[80%] portrait:md:w-2/5'
          >
            back
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderHistory;
