import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  value: string;
  type: "dark" | "light";
} = {
  value: "gray",
  type: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    setTheme: (
      state,
      {
        payload: { type, value },
      }: {
        payload: {
          value: string;
          type: "dark" | "light";
        };
      },
    ) => {
      state.value = value;
      state.type = type;
    },
  },
});

export const { setTheme } = themeSlice.actions;

export default themeSlice.reducer;
