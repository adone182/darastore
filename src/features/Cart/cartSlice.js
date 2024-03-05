import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      const existingItemIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );

      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity += 1;
        state.cartItems[existingItemIndex].totalPrice =
          state.cartItems[existingItemIndex].quantity * newItem.price;
      } else {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemIdToRemove
      );
    },
    editItemInCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemToEditIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );

      if (itemToEditIndex !== -1) {
        state.cartItems[itemToEditIndex].quantity = quantity;
        state.cartItems[itemToEditIndex].totalPrice =
          quantity * state.cartItems[itemToEditIndex].price;
      }
    },
    addQuantityProduct: (state, action) => {
      const productId = action.payload;
      const itemToIncrement = state.cartItems.find(
        (item) => item.id === productId
      );
      if (itemToIncrement) {
        itemToIncrement.quantity += 1;
        itemToIncrement.totalPrice =
          itemToIncrement.quantity * itemToIncrement.price;
      }
    },
    minQuantityProduct: (state, action) => {
      const productId = action.payload;
      const itemToDecrement = state.cartItems.find(
        (item) => item.id === productId
      );
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity -= 1;
        itemToDecrement.totalPrice =
          itemToDecrement.quantity * itemToDecrement.price;
      }
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  editItemInCart,
  addQuantityProduct,
  minQuantityProduct,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrices = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.price, 0);
