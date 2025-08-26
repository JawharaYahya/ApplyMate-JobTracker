import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './jobSlice'
import userReducer from './userSlice'

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root", 
  storage,  
};
const persistedjobReducer = persistReducer(persistConfig, jobReducer);
const persisteduserReducer = persistReducer(persistConfig, userReducer);

export const store = configureStore({
  reducer: {
    job:persistedjobReducer,
    user:persisteduserReducer
  },
})
export const persistor = persistStore(store);
