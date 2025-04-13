import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import IApiError from "../../types/IApiError";
import ICategory from "../../types/ICategory";
import appFetch from "../../utils/appFetch";
import FetchStateEnum from "../../constant/fetchStateEnum";

interface ICategoryState {
  data: ICategory[] | null;
  loading: boolean;
  status: FetchStateEnum
  error: string | null;
}

const initialState: ICategoryState = {
  data: null,
  loading: false,
  status: FetchStateEnum.IDLE,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.status = FetchStateEnum.PENDING;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.status = FetchStateEnum.FULFILLED;
        state.data = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.status = FetchStateEnum.REJECTED;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await appFetch<ICategory[]>({
        url: `/category`,
        method: "get",
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
