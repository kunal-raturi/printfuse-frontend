import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../Thunk/authTunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: null,
    success: null,
    ///
  },
  reducers: {
    resetError(state) {
      state.error = null;
    },
    resetSuccess(state) {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    // Login--------------------------------------------------------------
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.error = null;
        state.success = "Login successful";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed"; //action.error.message
      });
  },
});

export const { resetError, resetSuccess } = authSlice.actions;

export default authSlice.reducer;
