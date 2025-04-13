// src/store/user/userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import appFetch from "../../utils/appFetch";
import IUser from "../../types/IUser";
import IApiError from "../../types/IApiError";

interface UserState {
  data: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserByEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserByEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserByEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;

export const fetchUserByEmail = createAsyncThunk(
  "user/fetchUserByEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await appFetch<IUser>({
        url: `/user/find-by-email`,
        method: "post",
        data: {
          email,
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data as IApiError);
      }
      throw error;
    }
  }
);
