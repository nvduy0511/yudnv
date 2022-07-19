import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        currentUser: {},
    },
    reducers: {
        login: (state, action) => {
            state.currentUser = action.payload;
        },
        logout: (state, action) => {
            state.currentUser = {};
        },
        changeName: (state, action) => {
            state.currentUser.displayName = action.payload;
        },
    },
});

export default userSlice;
