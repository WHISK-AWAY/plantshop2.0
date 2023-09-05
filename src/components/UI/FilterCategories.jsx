import React from 'react';

const FilterCategories = (props) => {
  return (
    <div className="flex gap-2 text-center font-light justify-center items-center">
      <ul className="text-center ">{props.children}</ul>
    </div>
  );
};

export default FilterCategories;
