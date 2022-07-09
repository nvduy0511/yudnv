import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import userSlice from './userSlice';

const store = configureStore({
    reducer: {
        message: messageSlice.reducer,
        user: userSlice.reducer,
    },
});

export default store;
