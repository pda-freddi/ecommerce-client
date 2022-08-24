import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { client } from "../../api/client.js";

const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    const response = await client.post("/customer/login", payload);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    localStorage.setItem("lastLogin", Date.now().toString());
    return response.data;
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    const response = await client.post("/customer/logout");
    if (response.error) {
      if (response.status === 401) {
        dispatch(clearAuthentication());
        localStorage.setItem("lastLogin", "");
      }
      return rejectWithValue(response.data);
    }
    localStorage.setItem("lastLogin", "");
    return response.data;
  }
);

const getInitialState = () => {
  const lastLogin = localStorage.getItem("lastLogin");
  if (lastLogin) {
    const now = Math.floor(Date.now() / 1000);
    const timeDifference = now - Math.floor(parseInt(lastLogin) / 1000);
    if (timeDifference < 3600) {
      return {
        status: "succeeded",
        isAuthenticated: true,
        error: null
      };
    }
  }
  return {
      status: "idle",
      isAuthenticated: false,
      error: null
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    clearAuthentication: (state) => {
      state.status = "idle";
      state.isAuthenticated = false;
      state.error = null;
    }
  },
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

export const { clearAuthentication } = authSlice.actions;

export { login, logout };