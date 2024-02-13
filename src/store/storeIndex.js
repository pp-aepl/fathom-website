import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { createLogger } from "redux-logger";
import { Loader, PopupReducer,Common,Product } from "./reducer";


const reducer = {
  Loader,
  PopupReducer,
  Common,
  Product
};

const rootReducer = combineReducers(reducer);

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
// let middleware = () =>
//   getDefaultMiddleware({ serializableCheck: false }).concat(logger);

// if (process.env.NODE_ENV === "production") {
//   middleware = (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false });
// }

// export const store = configureStore({
//   reducer: persistedReducer,

//   middleware,
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(process.env.NODE_ENV === "development" ? createLogger() : []),
});

export const persistor = persistStore(store);
