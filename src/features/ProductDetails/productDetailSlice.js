import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  item: null,
};

export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState,
  reducers: {
    getDetailProduct: (state, action) => {
      const detailProduct = action.payload;
      state.item = detailProduct;
    },
  },
});

export const { getDetailProduct } = productDetailSlice.actions;
export default productDetailSlice.reducer;

export const selectedItemDetail = (state) => state.productDetail.item;
console;
