// ** Redux Imports
import { createSlice } from "@reduxjs/toolkit";

// ** UseJWT import to get config
import useJwt from "./auth/jwt/useJwt";

const config = useJwt.jwtConfig;

// const initialUser = () => {
//   // const item = window.localStorage.getItem('userData')
//   //** Parse stored json or if none return initialValue
//   //item ? JSON.parse(item) : {}
//   return {
//     isAuth: false,
//     user: null
//   }
// }

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    isAuth: false,
    userData: {},
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
      state[config.storageTokenKeyName] =
        action.payload[config.storageTokenKeyName];
      state[config.storageRefreshTokenKeyName] =
        action.payload[config.storageRefreshTokenKeyName];
      localStorage.setItem("userData", JSON.stringify(action.payload));
      localStorage.setItem(
        config.storageTokenKeyName,
        action.payload.accessToken
      );
      localStorage.setItem(
        config.storageRefreshTokenKeyName,
        JSON.stringify(action.payload.refreshToken)
      );
    },
    handleRefreshUser: (state, action) => {
      state.userData = action.payload;
      state.isAuth = true;
    },
    handleResetUser: (state) => {
      state.userData = {};
      state.isAuth = false;
    },
    handleLogout: (state) => {
      state.userData = {};
      state.isAuth = false;
      state[config.storageTokenKeyName] = null;
      state[config.storageRefreshTokenKeyName] = null;
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem(config.storageTokenKeyName);
      localStorage.removeItem(config.storageRefreshTokenKeyName);
    },
  },
});

export const { handleLogin, handleLogout, handleRefreshUser, handleResetUser } =
  authSlice.actions;

export default authSlice.reducer;
