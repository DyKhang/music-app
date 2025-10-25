import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  value: string;
} = {
  value: "gray",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.value = payload;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
