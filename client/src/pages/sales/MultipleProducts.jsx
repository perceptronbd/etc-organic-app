import React from "react";
import CatergorySelection from "./CatergorySelection";

export const MultipleProducts = () => {
  const categories = ["All", "Category 1", "Category 2", "Category 3", "Category 4"];
  return (
    <div className="rounded-lg bg-white p-6">
      <CatergorySelection categories={categories} />
    </div>
  );
};
