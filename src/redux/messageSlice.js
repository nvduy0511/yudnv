import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        conversationSelect: {},
    },
    reducers: {
        accessConversation: (state, action) => {
            console.log('dispatch with data : ', action.payload);
            state.conversationSelect = action.payload;
        },
    },
});

export default messageSlice;
