import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBranchApi } from '../../api';
import { Style, logs } from '../../utils/logs';
import { trycatch } from '../../utils/trycatch';


export const getBranch = createAsyncThunk(
    'branch/getBranch',
    async (thunkAPI) => {
        const [apiRes, apiErr]=await trycatch(
            getBranchApi()
          );

            if(apiErr){
                logs("Error: getAllProducts", [apiErr.response], Style.danger);
                return apiErr;
            }

            logs("Success: getAllProducts", [apiRes], Style.success);

            return apiRes.data;
    }
)

const initialState = {
    branches : [],
    status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
    message: ''
    }

export const branchSlice = createSlice({
  name: 'branch',
    initialState,
 
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getBranch.pending, (state, ) => {
        state.message = 'loading'
        state.status = 'loading'
    }).addCase(getBranch.fulfilled, (state, action) => {
        logs("productSlice: fulfilled..",[action], Style.code);
        state.status = 'success'
        state.products = action.payload
    }).addCase(getBranch.rejected, (state, action) => {
        logs("productSlice: rejected..",[ action], Style.code);
        state.message = action.error.message
        state.status = 'error'
    })
  }
})

// Action creators are generated for each case reducer function
//export const { decrement } = productSlice.actions

export default branchSlice.reducer