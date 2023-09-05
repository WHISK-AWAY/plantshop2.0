import React from 'react';
import FilterCategories from './FilterCategories.jsx';
import FilterHeader from './FilterHeader.jsx';
import FilterTag from './FilterTag.jsx';

const FilterDropdownMenu = (props) => {
  const { handleHide, handleHover, display } = props;

  return (
    <div
      onClick={handleHide}
      onMouseEnter={handleHover}
      onMouseLeave={handleHide}
      className={` absolute 6xl:top-8 top-5 3xl:top-5 5xl:top-6 md:top-3 lg:top-4 xl:top-6 h-[15dvh] md:h-[17dvh] 5xl:h-[16dvh] w-full portrait:w-full md:w-[40%] ${display} z-10 flex justify-center gap-10 bg-green-gray/90 text-center font-outfit text-white font-light 4xl:h-[15dvh] 5xl:w-[45%] 6xl:w-[50%] portrait:md:top-7 `}
    >
      <div className='flex  items-center justify-center gap-6 text-center'>
        <div className=''>
          <FilterHeader>Size</FilterHeader>
          <FilterCategories>
            <FilterTag>Small</FilterTag>
            <FilterTag>Medium</FilterTag>
            <FilterTag>Large</FilterTag>
          </FilterCategories>
        </div>
        <div className=''>
          <FilterHeader>Light</FilterHeader>
          <FilterCategories>
            <FilterTag>Low/Artificial</FilterTag>
            <FilterTag>Partial/Bright indirect</FilterTag>
            <FilterTag>Direct sunlight</FilterTag>
          </FilterCategories>
        </div>
        <div className=''>
          <FilterHeader>Type</FilterHeader>
          <FilterCategories>
            <FilterTag>Small</FilterTag>
            <FilterTag>Medium</FilterTag>
            <FilterTag>Large</FilterTag>
          </FilterCategories>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdownMenu;
