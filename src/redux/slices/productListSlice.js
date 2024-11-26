import { createSlice } from "@reduxjs/toolkit";
import { fetchProductListData } from "../Thunk/productListThunk";

const productListSlice = createSlice({
  name: "productList",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductListData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductListData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchProductListData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProductListData = (state) => state.productList.data;
export const selectProductListLoading = (state) => state.productList.loading;
export const selectProductListError = (state) => state.productList.error;

export default productListSlice.reducer;
