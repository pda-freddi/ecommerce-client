import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client.js";

const getCart = createAsyncThunk(
  "cart/getCart",
  async (_, { getState, rejectWithValue }) => {
    if (!getState().auth.isAuthenticated) {
      return rejectWithValue("Authentication required.");
    }
    const response = await client.get("/cart");
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const addItemToCart = createAsyncThunk(
  "cart/addItem",
  async (payload, { getState, rejectWithValue }) => {
    if (!getState().auth.isAuthenticated) {
      return rejectWithValue("Authentication required.");
    }
    const response = await client.post("/cart", payload);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const updateItemInCart = createAsyncThunk(
  "cart/updateItem",
  async ({ cartItemId, payload }, { getState, rejectWithValue }) => {
    if (!getState().auth.isAuthenticated) {
      return rejectWithValue("Authentication required.");
    }
    const response = await client.put(`/cart/${cartItemId}`, payload);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const deleteItemInCart = createAsyncThunk(
  "cart/deleteItem",
  async (cartItemId, { getState, rejectWithValue }) => {
    if (!getState().auth.isAuthenticated) {
      return rejectWithValue("Authentication required.");
    }
    const response = await client.delete(`/cart/${cartItemId}`);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response.data;
  }
);

const initialState = {
  status: "idle",
  cart: null,
  error: null
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.status = "loading";
        state.cart = null;
        state.error = null;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload;
        state.error = null;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.status = "failed";
        state.cart = null;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateItemInCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(updateItemInCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(updateItemInCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteItemInCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteItemInCart.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(deleteItemInCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase("auth/logout/fulfilled", (state) => {
        state.status = "idle";
        state.cart = null;
        state.error = null;
      })
      .addCase("customer/deleteCustomer/fulfilled", (state) => {
        state.status = "idle";
        state.cart = null;
        state.error = null;
      })
  }
});

export default cartSlice.reducer;

export { getCart, addItemToCart, updateItemInCart, deleteItemInCart };