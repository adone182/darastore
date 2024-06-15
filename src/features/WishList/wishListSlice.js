import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishItems: [],
};

export const wishListSlice = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addItemToWishList: (state, action) => {
      const newItem = action.payload;
      state.wishItems.push(newItem);
    },
    removeItemFromWishList: (state, action) => {
      const itemToRemove = action.payload;
      state.wishItems = state.wishItems.filter(
        (item) => item.id !== itemToRemove
      );
    },
    removeAllItemFromWishList: (state, action) => {
      state.wishItems = [];
    },
  },
});

export const {
  addItemToWishList,
  removeItemFromWishList,
  removeAllItemFromWishList,
} = wishListSlice.actions;

export default wishListSlice.reducer;

export const selectWishListItems = (state) => state.wishList?.wishItems;
export const selectWishListTotalItems = (state) =>
  state.wishList?.wishItems?.length;
