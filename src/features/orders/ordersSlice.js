import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client.js";
import { clearAuthentication } from "../auth/authSlice.js";

const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await client.get("/order");
    if (response.error) {
      if (response.status === 401) {
        dispatch(clearAuthentication());
        localStorage.setItem("lastLogin", "");
      }
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { dispatch, rejectWithValue }) => {
    const response = await client.post("/order", payload, true);
    if (response.error) {
      if (response.status === 401) {
        dispatch(clearAuthentication());
        localStorage.setItem("lastLogin", "");
      }
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (orderId, { dispatch, rejectWithValue }) => {
    const response = await client.delete(`/order/${orderId}`);
    if (response.error) {
      if (response.status === 401) {
        dispatch(clearAuthentication());
        localStorage.setItem("lastLogin", "");
      }
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const initialState = {
  status: "idle",
  orders: null,
  error: null
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = "loading";
        state.orders = null;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.status = "failed";
        state.orders = null;
        state.error = action.payload;
      })
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase("auth/logout/fulfilled", (state) => {
        state.status = "idle";
        state.orders = null;
        state.error = null;
      })
      .addCase("customer/deleteCustomer/fulfilled", (state) => {
        state.status = "idle";
        state.orders = null;
        state.error = null;
      })
  }
});

export default ordersSlice.reducer;

export { getOrders, createOrder, deleteOrder };