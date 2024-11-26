import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";

// Product list thunk......................................................................................................
export const fetchProductListData = createAsyncThunk(
  "productList/fetchProductListData",
  async (requestData, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.put(
        `${API_BASE_URL}product/list`,
        requestData,
        {
          headers: {
            token: `Bearer ${token}`,
            storeCode: `${storeCode}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("response in thunk::", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("Error response:", error.response);
      console.log("Error message:", error.message);

      console.log("error:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
