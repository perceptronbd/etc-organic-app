export const selectProducts = {
  id: "products",
  name: "products",
  placeholder: "Select Products",
  required: true,
  type: "select",
  selectOpts: {
    "Select Products": [
      { value: "category-1", label: "Category 01" },
      { value: "category-2", label: "Category 02" },
    ],
  },
};

export const selectBranch = {
  id: "branch",
  name: "branch",
  placeholder: "Select Branch",
  required: true,
  type: "select",
  selectOpts: {
    "Select Branch": [
      { value: "dagun", label: "Dagun Bhuiyan" },
      { value: "feni", label: "Feni" },
    ],
  },
};
