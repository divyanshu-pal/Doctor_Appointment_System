import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./features.js/alertSlice";
import { userSlice } from "./features.js/userSlice";

export default configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    user: userSlice.reducer,
  },
});