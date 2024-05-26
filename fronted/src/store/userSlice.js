import { createSlice } from "@reduxjs/toolkit";
import { saveToken, removeToken, loadToken } from "../utils/constant";

const userSlice = createSlice({
  name: "user",
  initialState: { token: loadToken(), toggleAuth: false },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
      saveToken(action.payload);
    },
    setToggleAuth: (state) => {
      state.toggleAuth = !state.toggleAuth;
    },
    onLogOut: (state) => {
      state.token = null;
      state.toggleAuth = false;
      removeToken();
    },
  },
});

export const { addToken, setToggleAuth, onLogOut } = userSlice.actions;
export { userSlice };
