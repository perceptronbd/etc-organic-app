import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { router } from "expo-router";
import { baseURL } from "../../api/instances/baseURL";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    isSignedIn: false,
    error: false,
    errorMessage: "",
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsSignedIn: (state, action) => {
      state.isSignedIn = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isSignedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(asyncLogin.pending, (state) => {
        state.loading = true;
        console.log("asyncLogin.pending...");
      })
      .addCase(asyncLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isSignedIn = true;
        state.user = action.payload.data;
        state.error = false;
        state.errorMessage = "";
        router.push("/(drawer)/(tabs)/home");
        console.log("asyncLogin.fulfilled", action);
      })
      .addCase(asyncLogin.rejected, (state, action) => {
        state.loading = false;
        state.isSignedIn = false;
        state.error = true;
        state.errorMessage = action.payload.message;
        console.log("asyncLogin.rejected", action);
      });
  },
});

export const asyncLogin = createAsyncThunk(
  "user/asyncLogin",
  async (user, thunkAPI) => {
    try {
      const res = await baseURL.post("/login", user);
      console.log("loginUser res:", res);
      return thunkAPI.fulfillWithValue(res.data);
    } catch (error) {
      console.log("loginUser error:", error.response);
      if (error.response && error.response.data.message) {
        return thunkAPI.rejectWithValue(error.response.data);
      } else {
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  },
);

export const { setUser, setIsSignedIn, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export const selectIsSignedIn = (state) => state.user.isSignedIn;

export default userSlice.reducer;
