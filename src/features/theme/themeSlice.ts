import { createSlice } from "@reduxjs/toolkit";

const initialState: {
  current: {
    value: string;
    type: "dark" | "light";
  };
  preview: {
    value: string;
    type: "dark" | "light";
  } | null;
} = {
  current: {
    value: "gray",
    type: "light",
  },
  preview: null,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setCurrentTheme: (
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
      state.current.value = value;
      state.current.type = type;
    },
    setPreviewTheme: (
      state,
      {
        payload,
      }: {
        payload: {
          value: string;
          type: "dark" | "light";
        } | null;
      },
    ) => {
      state.preview = payload;
    },
  },
});

export const { setCurrentTheme, setPreviewTheme } = themeSlice.actions;

export default themeSlice.reducer;
