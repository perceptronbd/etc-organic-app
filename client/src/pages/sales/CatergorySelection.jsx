import React, { useState } from "react";
import { Button } from "../../components";

const CatergorySelection = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          className={`${
            selectedCategory === category
              ? " border-[#A057FF] bg-[#A057FF] text-white"
              : "border-black hover:border-[#A057FF] hover:text-[#A057FF]"
          } rounded-full border  px-5 py-1 text-sm font-semibold transition-all duration-150`}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CatergorySelection;

//not working
//    <Button
//      key={category}
//      className={`${
//        selectedCategory === category && "border-[#A057FF] bg-[#A057FF] text-white"
//      } rounded-full border border-black bg-white px-5 py-1 text-sm font-semibold text-black hover:text-white`}
//      onClick={() => setSelectedCategory(category)}
//    >
//      {category}
//    </Button>;
