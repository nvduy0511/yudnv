import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: {},
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
    },
});

export default userSlice;
