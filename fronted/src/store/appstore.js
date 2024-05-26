import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./userSlice";
import { propertySlice } from "./propertySlice";
const appStore = configureStore({
  reducer: {
    user: userSlice.reducer,
    properties: propertySlice.reducer,
  },
});

export default appStore;
