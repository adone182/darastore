import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "../features/Cart/cartSlice";

import wishListSlice from "../features/WishList/wishListSlice";
import productSlice from "../features/ProductList/productSlice";
import { filterSlice } from "../features/FilterProduct/filterSlice";

const persistCartConfig = {
  key: "cart", //kunci masuk
  storage, //mau disimpan dimana atau pake apa
};

const persistWishConfig = {
  key: "wishList",
  storage,
};

// fungsi bawaan redux toolkit buat ngegambungin atau merge dari beberapa reducer
// const rootReducer = combineReducers({
//   cart: cartSlice,
//   productDetail: productDetailSlice,
//   wishlist: wishListProductSlice,
// });

// memangil fungsi persistReducer ini di gunakan sebagai pelindung datanya agar aman , plus bisa memanpatkan fitur persistReducer yaitu bisa mempunyai keahlian buat menambahkan secara otomatis  data ke storage makanya didalamnya ada 2 properti yaitu configurasinya sama data2 reducernya
const persistedCart = persistReducer(persistCartConfig, cartSlice);
const persistedWishList = persistReducer(persistWishConfig, wishListSlice);

// configure store bisa di bilang sebagai bank datanya yang di dalamnya bisa kita simpan data reducer
const store = configureStore({
  reducer: {
    cart: persistedCart,
    product: productSlice,
    filterProduct: filterSlice,
    wishList: persistedWishList,
  },
  devTools: true,
});

const persistor = persistStore(store);
export { store, persistor };
