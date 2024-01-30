import { configureStore } from '@reduxjs/toolkit';
import branchReducer from './slices/branchSlice';
import productReducer from './slices/productSlice';

export default configureStore({
  reducer: {
     product: productReducer,
     branch: branchReducer,
  },
})