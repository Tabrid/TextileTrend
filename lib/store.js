import { configureStore } from "@reduxjs/toolkit";
import otpReducer from './slices/otpSlice';
import userReducer from './slices/userSlice.js';
import authReducer from './slices/authSlice.js';
import menuDrawerReducer from './slices/menuDrawerSlice.js';
import searchDrawerReducer from './slices/searchDrawerSlice.js';

const store = configureStore({
    reducer: {
        otp: otpReducer,
        user: userReducer,
        auth: authReducer,
        menuDrawer: menuDrawerReducer,
        searchDrawer: searchDrawerReducer,
    },
});

export default store;
