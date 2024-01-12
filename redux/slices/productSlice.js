import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { setProducts, setProduct } = productSlice.actions;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
