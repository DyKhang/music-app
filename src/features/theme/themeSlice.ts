import { createSlice } from "@reduxjs/toolkit";

type Theme = "default" | "purple" | "ocean" | "forest";

interface initialState {
  value: Theme;
}

const initialState: initialState = {
  value: "default",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
