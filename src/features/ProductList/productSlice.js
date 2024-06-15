import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productItems: [],
  categories: ["men's cloting", "jewelery", "electronics", "women's cloting"],
  laoding: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProductSuccess: (state, action) => {
      state.loading = false;
      state.productItems = action.payload;
    },
    setProductsError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setProductsStart, setProductSuccess, setProductsError } =
  productSlice.actions;

export default productSlice.reducer;
