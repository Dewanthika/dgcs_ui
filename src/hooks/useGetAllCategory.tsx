import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../store/store.ts";
import { getCategory } from "../store/selectors/categorySelector.ts";
import { fetchCategory } from "../store/slice/categorySlice.ts";
import FetchStateEnum from "../constant/fetchStateEnum";

const useGetAllCategory = () => {
  const value = useAppSelector(getCategory);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    await dispatch(fetchCategory());
  };

  useEffect(() => {
    if (!value || value?.status === FetchStateEnum.IDLE) {
      fetchData();
    }
  }, [dispatch, value?.status]);

  const isLoading = value?.status !== FetchStateEnum.FULFILLED;
  return {
    data: value.data || [],
    isLoading,
    error: value?.status === FetchStateEnum.REJECTED ? "An error occurred" : undefined,
    fetchData,
  };
};

export default useGetAllCategory;
