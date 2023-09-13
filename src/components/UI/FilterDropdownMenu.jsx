import React from 'react';
import FilterCategories from './FilterCategories.jsx';
import FilterHeader from './FilterHeader.jsx';
import FilterTag from './FilterTag.jsx';

const FilterDropdownMenu = (props) => {
  const { handleHide, handleHover, display } = props;


  return (
    <div
      onMouseEnter={handleHover}
      onMouseLeave={handleHide}
      className={` absolute landscape:6xl:top-5 top-5 3xl:top-5 landscape:5xl:top-4  landscape:lg:top-4 landscape:xl:top-4 h-[19dvh] md:h-[17dvh] landscape:5xl:h-[16dvh] w-full portrait:w-screen md:w-[300px] landscape:lg:w-[400px] landscape:2xl:w-[500px] landscape:6xl:w-[700px] landscape:5xl:w-[650px] ${display} z-10 flex justify-center gap-10 bg-green-gray/90 text-center font-outfit text-white font-light landscape:4xl:h-[15dvh] landscape:5xl:w-[45%] landscape:6xl:w-[50%] portrait:md:top-7 landscape:w-screen landscape:h-36 landscape:top-6 landscape:md:top-4 portrait:sm:top-6 `}
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
            <FilterTag>Pet safe</FilterTag>
            <FilterTag>Air-purifying</FilterTag>
            <FilterTag>Easy-care</FilterTag>
          </FilterCategories>
        </div>
      </div>
    </div>
  );
};

export default FilterDropdownMenu;
