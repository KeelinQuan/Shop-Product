import { configureStore, combineReducers } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import authReducer from "./auth";
import cartReducer from "./cart";
import titleReducer from "./title";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

//kết hợp các reducer thành rootReducer
const rootReducers = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  cart: cartReducer,
  title: titleReducer,
});
const persistConfig = {
  key: "root",
  storage, //lưu vào localstorege
  whitelist: ["auth", "cart",'title'],
};

//quản lý lưu trữ và khôi phục
const persistedReducer = persistReducer(persistConfig, rootReducers);

//tạo kho store với reducer là persistReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check
    }),
});

export const persistor = persistStore(store);
