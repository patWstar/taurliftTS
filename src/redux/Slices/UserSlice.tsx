import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: null,
    authenticated: false,
  },
  reducers: {
    login: (state, action) => {
      state.userID = action.payload;
      state.authenticated = true;
    },
    logout: (state) => {
      state.userID = null;
      state.authenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    },
  },
});

export const { login, logout } = userSlice.actions;
export const selectUserID = (state: { user: { userID: string } }) =>
  state.user.userID;
export const selectAuthenticated = (state: {
  user: { authenticated: boolean };
}) => state.user.authenticated;
export default userSlice.reducer;
