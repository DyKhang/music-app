import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./features/player/playerSlice";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
  reducer: {
    player: playerReducer,
  },
});

export default store;
