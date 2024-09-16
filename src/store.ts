import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player/playerSlice";
import { useDispatch } from "react-redux";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export default store;
