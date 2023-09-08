import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    email: 'ankarn41k@gmail.com',
    uid: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email
            state.uid = action.payload.uid
        },
        logout: (state) => {
            state = initialState
        },

    },
})

// Action creators are generated for each case reducer function
export const {login, logout} = authSlice.actions

export default authSlice.reducer
