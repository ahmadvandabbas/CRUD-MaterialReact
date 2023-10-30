import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.loading = true;
    },
    setFalseLoading: (state) => {
      state.loading = false;
    },
  },
});
export const { setIsLoading, setFalseLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
