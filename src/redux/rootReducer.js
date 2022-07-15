import messageSlice from './messageSlice';
import userSlice from './userSlice';
import socketSlice from './socketSlice';
import { combineReducers } from '@reduxjs/toolkit';

const appReducer = combineReducers({
    message: messageSlice.reducer,
    user: userSlice.reducer,
    socket: socketSlice.reducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
};

export default rootReducer;
