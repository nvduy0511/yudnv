import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        uid: '',
    },
    reducers: {
        selectFriend: (state, action) => {
            state.uid = action.payload;
        },
    },
});

export default messageSlice;
