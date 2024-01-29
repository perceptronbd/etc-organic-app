export const selectBranch = {
  id: "branch",
  name: "branch",
  placeholder: "Select Branch",
  required: true,
  type: "select",
  selectOpts: {
    "Select Branch": [
      { value: "online", label: "Online" },
      { value: "dagun", label: "Dagun Bhuiyan" },
      { value: "feni", label: "Feni" },
    ],
  },
};

export const selectDesignation = {
  id: "designation",
  name: "designation",
  placeholder: "Designation",
  required: true,
  type: "select",
  selectOpts: {
    "Select Designation": [
      { value: "admin", label: "Admin" },
      { value: "productManager", label: "Product Manager" },
      { value: "salesManager", label: "Sales Manager" },
    ],
  },
};
