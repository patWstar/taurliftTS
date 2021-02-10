import { configureStore } from '@reduxjs/toolkit';
import userSlice from "redux/Slices/UserSlice";


const store = configureStore({
  reducer: {
    user: userSlice,
  }
})

export default store;
