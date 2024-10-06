import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    status: false,      // user is authenticated or not
    userData: null // logged in user's details
}

// It is used to check if user is authenticated or not
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true,
            state.userData = action.payload
        },
        logout: (state) => {
            state.status = false,
            state.userData = null
        }
    }
})

export const {login, logout} = authSlice.actions

export default authSlice.reducer;