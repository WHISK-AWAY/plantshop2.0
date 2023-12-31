import React from 'react';
import { useDispatch } from 'react-redux';
import { adjustFilter } from '../../slices/product/productSlice';

const FilterTag = (props) => {
  const dispatch = useDispatch();

  const handleFilterClick = (e) => {
    dispatch(adjustFilter(e.target.innerHTML));
  };

  return (
    <button
      className="block hover:underline underline-offset-2  text-[3.8vw] md:text-[1vw] 3xl:text-[.9vw]  4xl:text-[.8vw] landscape:5xl:text-[.6vw] landscape:6xl:text-[.5vw] lowercase portrait:lg:text-[2.3vw] font-light text-center portrait:md:text-[1.7vw]  landscape:text-[.9rem]"
      onClick={handleFilterClick}
    >
      <li>{props.children}</li>
    </button>
  );
};

export default FilterTag;
