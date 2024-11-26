import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryData } from "../Thunk/categoryThunk";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectCategoyData = (state) => state.category.data;
export const selectCategoryLoading = (state) => state.category.loading;
export const selectCategoryError = (state) => state.category.error;

export default categorySlice.reducer;
