import { getAllProductsApi } from "../../api";
import { Style, logs } from "../../utils/logs";

const products = async () => {
  const response = await getAllProductsApi();
  logs("getProducts", [response], Style.effects);
  if (response.status === 200) {
    return response.data;
  } else {
    return [{ value: null, label: "No Products found!" }];
  }
};

export const selectProducts = {
  id: "products",
  name: "products",
  placeholder: "Select Products",
  required: true,
  type: "select",
  selectOpts: {
    "Select Products": products(),
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
      { value: "online", label: "Online" },
      { value: "dagun", label: "Dagun Bhuiyan" },
      { value: "feni", label: "Feni" },
    ],
  },
};
