import {createSlice} from '@reduxjs/toolkit'


const initialState = {
    value: {
        isAuth: false,
        email: '',
        uid: '',
    }
}

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logOut: () => {
            return initialState
        },
        logIn: (state, action) => {
            return {
                value: {
                    isAuth: true,
                    email: action.payload.email,
                    uid: action.payload.uid
                }
            }
        }
    }
})

export const {logIn, logOut} = auth.actions
export default auth.reducer
