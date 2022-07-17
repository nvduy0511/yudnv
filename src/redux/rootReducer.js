import messageSlice from './messageSlice';
import userSlice from './userSlice';
import socketSlice from './socketSlice';
import { combineReducers } from '@reduxjs/toolkit';
const rootReducer = combineReducers({
    message: messageSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
});

export default rootReducer;
