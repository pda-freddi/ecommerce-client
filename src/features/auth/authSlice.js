import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client.js";

const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    const response = await client.post("/customer/login", payload);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    const response = await client.post("/customer/logout");
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const initialState = {
  status: "idle",
  isAuthenticated: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase("customer/deleteCustomer/fulfilled", (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.error = null;
      })
  }
});

export default authSlice.reducer;

export { login, logout };