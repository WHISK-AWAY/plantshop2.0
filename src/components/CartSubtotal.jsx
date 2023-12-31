import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCartSubtotal } from '../slices/users/cartSlice';

const CartSubtotal = () => {
  const dispatch = useDispatch();
  const subtotal = useSelector(selectCartSubtotal);

  return (
    <div className="pt-3">
      <h2 className=" portrait:md:text-[2.4vw] text-[1.6vw] 6xl:text-[.7vw] landscape:4xl:text-[1.2rem] landscape:3xl:text-[1.3vw] 5xl:text-[.8vw] pt-2 text-center portrait:text-[4vw] landscape:short:text-[1.2rem]">SUBTOTAL: {subtotal.toFixed(2)}</h2>
    </div>
  );
};

export default CartSubtotal;
