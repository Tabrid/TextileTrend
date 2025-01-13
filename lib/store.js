import { configureStore } from "@reduxjs/toolkit";
import otpReducer from './slices/otpSlice';
import userReducer from './slices/userSlice.js';
import authReducer from './slices/authSlice.js';

const store = configureStore({
    reducer: {
        otp: otpReducer,
        user: userReducer,
        auth: authReducer,
    },
});

export default store;
