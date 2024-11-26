import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../Constant/apiContant";
import { triggerToast } from "../../components/Toaster";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}auth/signin`,
        formData,
        {
          headers: {
            token: "essentials",
          },
        }
      );
      console.log(response.data.data);

      const { token, ...user } = response.data.data;
      const { storeId } = response.data.data;

      const storeCode = response.data.data?.store?.storeCode;

      if (token && user && storeCode) {
        localStorage.setItem("storeId", storeId);

        localStorage.setItem("token", token);
        localStorage.setItem("storeCode", storeCode);
        sessionStorage.setItem("isLoggedIn", "true");
        triggerToast("success", "Login successfully");
        return { token, user };
      }
    } catch (error) {
      console.log("error :", error);
      // Extract and format error messages
      const errorDetails = error.response?.data?.data || {}; // Extract field errors
      console.log("errordetail::", errorDetails);
      triggerToast("error", errorDetails.non_field_message);
      return rejectWithValue(errorDetails); // Return the error details
    }
  }
);
