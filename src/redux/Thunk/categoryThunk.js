import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";

// category thunk......................................................................................................
export const fetchCategoryData = createAsyncThunk(
  "category/fetchCategoryData",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem("token");
    const storeCode = localStorage.getItem("storeCode");

    try {
      const response = await axios.get(`${API_BASE_URL}home/category`, {
        headers: {
          token: `Bearer ${token}`,
          storeCode: `${storeCode}`,
        },
      });
    //   console.log("response in thunk::", response.data.data);
      return response.data.data;
    } catch (error) {
      console.log("error:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);
