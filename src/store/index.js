import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/Cart/cartSlice";

export default configureStore({
  reducer: {
    cart: cartSlice,
  },
});
