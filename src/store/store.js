import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import cartSlice from "../features/Cart/cartSlice";
import productDetailSlice from "../features/ProductDetails/productDetailSlice";

const persistConfig = {
  key: "root", //kunci masuk
  storage, //mau disimpan dimana atau pake apa
  whitelist: ["cart", "productDetail"], //wadah atau pembungkus buat nampung data2 si reducer
};

// fungsi bawaan redux toolkit buat ngegambungin atau merge dari beberapa reducer
const rootReducer = combineReducers({
  cart: cartSlice,
  productDetail: productDetailSlice,
});

// memangil fungsi persistReducer ini di gunakan sebagai pelindung datanya agar aman , plus bisa memanpatkan fitur persistReducer yaitu bisa mempunyai keahlian buat menambahkan secara otomatis  data ke storage makanya didalamnya ada 2 properti yaitu configurasinya sama data2 reducernya
const persistedReducer = persistReducer(persistConfig, rootReducer);

// configure store bisa di bilang sebagai bank datanya yang di dalamnya bisa kita simpan data reducer
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);
export { store, persistor };
