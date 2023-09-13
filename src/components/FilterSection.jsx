import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  adjustFilter,
  selectFilterBy,
  selectUseSearch,
} from '../slices/product/productSlice';
import FilterDropdownMenu from './UI/FilterDropdownMenu.jsx';

const FilterSection = () => {
  const dispatch = useDispatch();
  const [display, setDisplay] = useState('hidden');
  const timeout = useRef(null);

  const filters = useSelector(selectFilterBy);
  const useSearch = useSelector(selectUseSearch);

  const handleHover = () => {
    setDisplay('absolute');
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
  };

  const handleHide = () => {
    setDisplay('hidden');
  };

  const handleFilter = (filter) => {
    dispatch(adjustFilter(filter));
  };

  return (
    <div className='relative my-[6%] flex items-center justify-center md:my-[3%] 5xl:mt-[4%] 6xl:mt-[3%]'>
      <ul className='flex justify-center gap-12 font-raleway text-[4vw] md:text-[1.1vw] 3xl:text-[.9vw] 5xl:text-[.7vw] portrait:lg:text-[1.7vw] portrait:md:text-[2vw] landscape:text-[.8rem]'>
        <button onClick={() => handleFilter('')}>
          <h2>ALL</h2>
        </button>
        <div
          onMouseEnter={handleHover}
          onMouseLeave={handleHide}
          className='group relative'
        >
          <button
            onClick={() => {
              if (display === 'hidden') {
                handleHover();
              } else {
                handleHide();
              }
            }}
          >
            <h2 className={`group relative uppercase`}>
              {useSearch
                ? 'Filter By: Search Term'
                : `Filter By: ${filters.length ? filters.join(', ') : 'All'}`}
            </h2>
          </button>
        </div>
      </section>

      <FilterDropdownMenu
        handleHover={handleHover}
        handleHide={handleHide}
        display={display}
      />
    </div>
  );
};

export default FilterSection;
