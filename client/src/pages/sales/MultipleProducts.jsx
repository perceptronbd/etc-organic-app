import React, { useState } from "react";
import CatergorySelection from "./CatergorySelection";
import SalesProducts from "./SalesProducts";
import CustomerDetails from "./CustomerDetails";
import { useBranchOpt } from "../../hooks";
import { Button, SelectInput } from "../../components";
import { useSelector } from "react-redux";

export const MultipleProducts = () => {
  const productsData = useSelector((state) => state.product.products);
  const productsWithQuantity = productsData.map((product) => ({
    ...product,
    quantity: 0,
  }));

  console.log("product with quantity", productsWithQuantity);

  // This will be replaced by api => the category will come from an api using custom hook
  const categories = Array.from(new Set(productsWithQuantity.map((product) => product.category)));
  categories.unshift("All");

  const { branchOpts } = useBranchOpt();
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const filteredProducts =
    selectedBranch === "all"
      ? productsWithQuantity
      : productsWithQuantity.filter((p) => p.branch === selectedBranch);

  const onBranchesChanged = (value) => {
    console.log("value: " + value);
    if (value === "Select Branch") {
      setSelectedBranch("all");
    } else {
      const newSelectedBranch = branchOpts.Branches.filter((branch) => branch.value === value);
      setSelectedBranch(newSelectedBranch[0].label);
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 ">
      <CatergorySelection
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
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
      <div className="flex w-full justify-center ">
        <Button type={"submit"} className="px-12 ">
          Done
        </Button>
      </div>
    </div>
  );
};
