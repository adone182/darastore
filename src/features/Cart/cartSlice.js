import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItemToCart: (state, action) => {
    //   const newItem = action.payload;
    //   const existingItemIndex = state.cartItems.findIndex(
    //     (product) => product.id === newItem.id
    //   );

    //   const countItem = newItem.quantity ? newItem.quanitty : 1;
    //   const countPrice = newItem.totalPrice
    //     ? newItem.totalPrice
    //     : newItem.price;

    //   console.log("Processed countItem:", countItem, "countPrice:", countPrice);
    //   if (existingItemIndex !== -1) {
    //     const updatedQuantity =
    //       state.cartItems[existingItemIndex].quantity + countItem;
    //     console.log("Updated quantity for existing item:", updatedQuantity);

    //     state.cartItems[existingItemIndex].quantity = updatedQuantity;
    //     state.cartItems[existingItemIndex].totalPrice =
    //       state.cartItems[existingItemIndex].quantity * newItem.price;
    //   } else {
    //     const newQuantity = countItem;
    //     const newTotalPrice = countPrice;
    //     console.log(
    //       "Adding new item with quantity:",
    //       newQuantity,
    //       "and totalPrice:",
    //       newTotalPrice
    //     );

    //     state.cartItems.push({
    //       ...newItem,
    //       quantity: newQuantity,
    //       totalPrice: newTotalPrice,
    //     });
    //   }
    // },
    addItemToCart: (state, action) => {
      const newItem = action.payload;
      console.log("New item to add:", newItem);

      const existingItemIndex = state.cartItems.findIndex(
        (product) => product.id === newItem.id
      );

      const countItem = newItem.quantity ? newItem.quantity : 1;
      const countPrice = newItem.totalPrice
        ? newItem.totalPrice
        : newItem.price;

      console.log("Processed countItem:", countItem, "countPrice:", countPrice);

      if (existingItemIndex !== -1) {
        const updatedQuantity =
          state.cartItems[existingItemIndex].quantity + countItem;
        console.log("Updated quantity for existing item:", updatedQuantity);

        state.cartItems[existingItemIndex].quantity = updatedQuantity;
        state.cartItems[existingItemIndex].totalPrice =
          state.cartItems[existingItemIndex].quantity * newItem.price;
      } else {
        const newQuantity = countItem;
        const newTotalPrice = countPrice;
        console.log(
          "Adding new item with quantity:",
          newQuantity,
          "and totalPrice:",
          newTotalPrice
        );

        state.cartItems.push({
          ...newItem,
          quantity: newQuantity,
          totalPrice: newTotalPrice,
        });
      }
    },
    removeItemFromCart: (state, action) => {
      const itemIdToRemove = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== itemIdToRemove
      );
    },
    removeAllItemFromCart: (state, action) => {
      state.cartItems = [];
    },
    addQuantityProduct: (state, action) => {
      const productId = action.payload;
      const itemToIncrementIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );
      if (itemToIncrementIndex !== -1) {
        const itemToIncrement = state.cartItems[itemToIncrementIndex];
        itemToIncrement.quantity += 1;
        itemToIncrement.totalPrice =
          itemToIncrement.quantity * itemToIncrement.price;
      }
    },
    minQuantityProduct: (state, action) => {
      const productId = action.payload;
      const itemToDecrementIndex = state.cartItems.findIndex(
        (item) => item.id === productId
      );

      if (itemToDecrementIndex !== -1) {
        const itemToDecrement = state.cartItems[itemToDecrementIndex];

        if (itemToDecrement.quantity > 1) {
          itemToDecrement.quantity -= 1;
          itemToDecrement.totalPrice =
            itemToDecrement.quantity * itemToDecrement.price;
        }
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
  removeAllItemFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalItems = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.quantity, 0);

export const selectCartTotalPrices = (state) =>
  state.cart.cartItems.reduce((total, item) => total + item.totalPrice, 0);
