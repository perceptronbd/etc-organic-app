export const selectCategory = {
  id: "category",
  name: "category",
  placeholder: "Select Category",
  required: true,
  type: "select",
  selectOpts: {
    "Select Category": [
      { value: "Organic Food", label: "Organic Food" },
      { value: "Safe Food", label: "Safe Food" },
      { value: "Mushroom", label: "Mushroom" },
      { value: "Natural Medicine", label: "Natural medicine" },
      { value: "Healthcare Devices", label: "Healthcare devices" },
      { value: "Others", label: "Others" },
    ],
  },
};
