import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        conversationSelect: {},
    },
    reducers: {
        accessConversation: (state, action) => {
            state.conversationSelect = action.payload;
        },
    },
});

export default messageSlice;
