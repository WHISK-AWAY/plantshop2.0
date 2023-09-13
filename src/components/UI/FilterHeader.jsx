import React from 'react';

const FilterHeader = (props) => {
  return (
    <h2 className="mb-2  text-[3.9vw] md:text-[1.4vw] 2xl:text-[1.3vw] 3xl:text-[1.2vw] 4xl:text-[1vw] landscape:5xl:text-[.6vw] text-white uppercase portrait:lg:text-[2.6vw] text-thin tracking-widest portrait:md:text-[2.5vw] landscape:text-[1rem]">
      {props.children}
    </h2>
  );
};

export default FilterHeader;
