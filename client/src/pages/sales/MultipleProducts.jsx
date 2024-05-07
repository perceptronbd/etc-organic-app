// `MultipleProducts` is a component that displays a list of products with the ability to filter by category and branch.
// It uses Redux for state management to fetch product data and a custom hook `useBranchOpt` to get branch options.
// The component also includes a `SalesProducts` component for product selection and a `CustomerDetails` component for customer information.

// Usage:
// <MultipleProducts />

import React, { useEffect, useMemo, useState } from "react";
import SalesProducts from "./SalesProducts";
import CustomerDetails from "./CustomerDetails";
import { useBranchOpt } from "../../hooks";
import { Button, SelectInput } from "../../components";
import { useSelector } from "react-redux";
import { extractCategories } from "../../utils/groupByCategory";
import FilterBtns from "../../components/button/FilterBtns";

export const MultipleProducts = () => {
  const productsData = useSelector((state) => state.product.products);
  const productsWithQuantity = productsData.map((product) => ({
    ...product,
    quantity: 0,
  }));

  const categories = extractCategories(productsWithQuantity);

  const { branchOpts } = useBranchOpt();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Define a memoized function to filter products based on selected category and branch
  const newFilteredProducts = useMemo(() => {
    // If both selectedCategory and selectedBranch are "all", return all products
    if (selectedCategory === "all" && selectedBranch === "all") {
      // console.log("condition 1");
      return productsWithQuantity;
    }

    // If either selectedCategory or selectedBranch is "all", filter products accordingly
    if (selectedCategory === "all" || selectedBranch === "all") {
      // console.log("condition 2 or 3");
      // Filter products based on the condition that either category or branch matches "all"
      return productsWithQuantity.filter(
        (p) =>
          // If selectedCategory is "all", include the product regardless of its category. If not include the product with selected category
          (selectedCategory === "all" ? true : p.category === selectedCategory) &&
          // If selectedBranch is "all", include the product regardless of its branch. If not include the product with selected branch
          (selectedBranch === "all" ? true : p.branchIds?.includes(selectedBranch))
      );
    }

    // If neither selectedCategory nor selectedBranch is "all", filter products based on both criteria
    // console.log("condition 4");
    // Filter products that match both the selected category and branch
    return productsWithQuantity.filter(
      (p) => p.category === selectedCategory && p.branchIds?.includes(selectedBranch)
    );
  }, [selectedBranch, selectedCategory, productsWithQuantity]);

  useEffect(() => {
    setFilteredProducts(newFilteredProducts);
  }, [selectedBranch, selectedCategory]);

  const onBranchesChanged = (value) => {
    if (value === "Select Branch") {
      setSelectedBranch("all");
    } else {
      const newSelectedBranch = branchOpts.Branches.filter((branch) => branch.value === value);
      setSelectedBranch(newSelectedBranch[0].value);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 pb-4">
      <FilterBtns
        data={categories}
        selectedState={selectedCategory}
        setSelectedState={setSelectedCategory}
      />
      <div className="flex gap-6 pt-6">
        <div className="w-full xl:max-w-2xl">
          <SalesProducts products={filteredProducts} />
        </div>
        <div className="w-lg border-l border-black pl-6 xl:max-w-sm">
          <div>
            <SelectInput
              id="branch"
              name="branch"
              placeholder="Select Branch"
              required={true}
              type="select"
              selectOpts={branchOpts}
              onValueChange={(value) => onBranchesChanged(value)}
            />
          </div>
          <div className="mt-4">
            <CustomerDetails />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center xl:max-w-4xl">
        <Button type={"submit"} className="mt-4 px-12">
          Done
        </Button>
      </div>
    </div>
  );
};
