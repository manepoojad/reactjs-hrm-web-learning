import { createSlice } from '@reduxjs/toolkit'
import { userLoginActionAction } from '../thunk/authThunk'

const initialState = {
    isLoading: false,
    loginUserInfo:{
        token:"",
        userRole:"",
    }
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(userLoginActionAction.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(userLoginActionAction.fulfilled, (state, action) => {
                state.isLoading = false
                state.loginUserInfo=action.payload
            })
            .addCase(userLoginActionAction.rejected, (state, action) => {
                state.isLoading = false
            })

    },
})


// Action creators are generated for each case reducer function
export const {
} = authSlice.actions

export default authSlice
