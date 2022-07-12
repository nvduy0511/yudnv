import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        friendSelect: {},
    },
    reducers: {
        selectFriend: (state, action) => {
            state.friendSelect = action.payload;
        },
    },
});

export default messageSlice;
