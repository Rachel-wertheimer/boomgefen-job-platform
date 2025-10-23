import { configureStore } from "@reduxjs/toolkit";
import adsReducer from "./slice/adsSlice";
import userReducer from "./slice/userSlice";
import mailReducer from "./slice/mailSlice";
export const store = configureStore({
  reducer: {
    ads: adsReducer,
    user: userReducer,
    mail: mailReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
