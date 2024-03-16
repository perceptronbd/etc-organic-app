export const selectBranch = {
  id: "branch",
  name: "branch",
  placeholder: "Select Branch",
  required: true,
  type: "select",
  selectOpts: {
    "Select Branch": [
      { value: "Online", label: "Online" },
      { value: "Dagan", label: "Dagan Bhuiyan" },
      { value: "Feni", label: "Feni" },
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
