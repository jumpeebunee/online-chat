import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./feautures/userSlice";
import currentUserReducer from "./feautures/currentUserSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    currentUser: currentUserReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
