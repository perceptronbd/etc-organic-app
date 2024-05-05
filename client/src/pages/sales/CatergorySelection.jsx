import React, { useState } from "react";
import { Button } from "../../components";

const CatergorySelection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  console.log("selected categories", selectedCategory);

  return (
    <div className="flex gap-4">
      {categories.map((category) => (
        <button
          key={category}
          className={`${
            selectedCategory === category
              ? "border-[#A057FF] bg-[#A057FF] text-white"
              : "hover:border-[#A057FF] hover:text-[#A057FF] "
          } rounded-full border border-black px-5 py-1 text-sm font-semibold transition-all duration-150`}
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
