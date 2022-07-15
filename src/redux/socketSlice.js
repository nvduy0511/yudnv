import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
    name: 'socketSlice',
    initialState: {
        socketCurrent: {},
    },
    reducers: {
        connect: (state, action) => {
            console.log('connect - socket in redux');
            state.socketCurrent = action.payload;
        },
    },
});

export default socketSlice;
