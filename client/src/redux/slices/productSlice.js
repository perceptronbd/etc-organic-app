import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllProductsApi } from '../../api';
import { trycatch } from '../../utils/trycatch';


export const getAllProducts = createAsyncThunk(
    'product/getAllProducts',
    async (thunkAPI) => {
        const [apiRes, apiErr]=await trycatch(
            getAllProductsApi()
          );

        

            if(apiErr){
                // logs("Error: getAllProducts", [apiErr.response], Style.danger);
                return apiErr;
            }

            //logs("Success: getAllProducts", [apiRes], Style.success);

            return apiRes.data;
    }
)

const initialState = {
    products : [],
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    message: ''
    }

export const productSlice = createSlice({
  name: 'product',
    initialState,
 
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getAllProducts.pending, (state, ) => {
        state.message = 'loading'
        state.status = 'loading'
    }).addCase(getAllProducts.fulfilled, (state, action) => {
        //logs("productSlice: fulfilled..",[action], Style.code);
        state.status = 'success'
        state.products = action.payload
    }).addCase(getAllProducts.rejected, (state, action) => {
        //logs("productSlice: rejected..",[ action], Style.code);
        state.message = action.error.message
        state.status = 'error'
    })
  }
})

// Action creators are generated for each case reducer function
export const { decrement } = productSlice.actions

export default productSlice.reducer