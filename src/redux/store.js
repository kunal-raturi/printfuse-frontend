import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import categoryReducer from "../redux/slices/categorySlice";
import produceListReducer from "../redux/slices/productListSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    productList: produceListReducer,
  },
});
