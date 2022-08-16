import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client.js";

const getCustomerInfo = createAsyncThunk(
  "customer/getInfo",
  async (_, { rejectWithValue }) => {
    const response = await client.get("/customer");
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const updateCustomerInfo = createAsyncThunk(
  "customer/updateInfo",
  async (payload, { rejectWithValue }) => {
    const response = await client.put("/customer", payload);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const deleteCustomer = createAsyncThunk(
  "customer/deleteCustomer",
  async (_, { rejectWithValue }) => {
    const response = await client.delete("/customer");
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const initialState = {
  status: "idle",
  customer: null,
  error: null
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCustomerInfo.pending, (state) => {
        state.status = "loading";
        state.customer = null;
        state.error = null;
      })
      .addCase(getCustomerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = action.payload;
        state.error = null;
      })
      .addCase(getCustomerInfo.rejected, (state, action) => {
        state.status = "failed";
        state.customer = null;
        state.error = action.payload;
      })
      .addCase(updateCustomerInfo.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateCustomerInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateCustomerInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteCustomer.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customer = null;
        state.error = null;
      })
      .addCase(deleteCustomer.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  }
});

export default customerSlice.reducer;

export {
  getCustomerInfo,
  updateCustomerInfo,
  deleteCustomer
}