import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getBranchApi } from '../../api';
import { trycatch } from '../../utils/trycatch';


export const getBranch = createAsyncThunk(
    'branch/getBranch',
    async (thunkAPI) => {
        const [apiRes, apiErr]=await trycatch(
            getBranchApi()
          );

            if(apiErr){
                // logs("Error: getBranch", [apiErr.response], Style.danger);
                return apiErr;
            }

            // logs("Success: getBranch", [apiRes], Style.success);

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
        // logs("branchSlice: fulfilled..",[action], Style.code);
        state.status = 'success'
        state.branches = action.payload.branches
    }).addCase(getBranch.rejected, (state, action) => {
        // logs("branchSlice: rejected..",[ action], Style.code);
        state.message = action.error.message
        state.status = 'error'
    })
  }
})

export default branchSlice.reducer