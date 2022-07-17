import { createSlice } from '@reduxjs/toolkit';
const messageSlice = createSlice({
    name: 'messageSlice',
    initialState: {
        conversationSelect: {},
        conversation: [],
    },
    reducers: {
        accessConversation: (state, action) => {
            state.conversationSelect = action.payload;
        },
        initConversation: (state, action) => {
            state.conversation = action.payload;
        },
        readConversation: (state, action) => {
            //check user in readby Convesation
            const index = state.conversation.findIndex((object) => {
                return object._id === action.payload.idConversation;
            });
            if (!state.conversation[index].readBy.includes(action.payload.idUser)) {
                state.conversation[index].readBy.push(action.payload.idUser);
            }
        },
        newMessageInConversation: (state, action) => {
            const index = state.conversation.findIndex((object) => {
                return object._id === action.payload.conversation;
            });

            console.log('payload', action.payload);
            const selectConversation = action.payload.idConversation;
            const currenUser = action.payload.idUser;
            if (state.conversation[index]._id === selectConversation) {
                state.conversation[index] = {
                    ...state.conversation[index],
                    readBy: [action.payload.sender, currenUser],
                    latestMessage: [action.payload.content],
                };
            } else {
                state.conversation[index] = {
                    ...state.conversation[index],
                    readBy: [action.payload.sender],
                    latestMessage: [action.payload.content],
                };
            }
        },
    },
});

export default messageSlice;
