import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi, UserSession } from "../../api/userApi";

const initialState: {
  session: {
    email: string;
    username: string;
    avatar: string;
  } | null;
} = {
  session: null,
};

export const setSession = createAsyncThunk("auth/setSession", async () => {
  try {
    const { data } = await userApi.me();
    return data as UserSession;
  } catch {
    return null;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.session = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setSession.fulfilled, (state, action) => {
      state.session = action.payload;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
