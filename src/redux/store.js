import { configureStore } from '@reduxjs/toolkit';
import messageSlice from './messageSlice';
import userSlice from './userSlice';
import socketSlice from './socketSlice';

const store = configureStore({
    reducer: {
        message: messageSlice.reducer,
        user: userSlice.reducer,
        socket: socketSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
