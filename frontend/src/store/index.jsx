import {createSlice, configureStore} from '@reduxjs/toolkit'





const authSlice = createSlice({
    name:"auth",
    initialState:{ isLoggedIn: false},
    reducers : {
        signin(state){
            state.isLoggedIn = true;
        },
        signout(state){
            localStorage.removeItem("userId")
            state.isLoggedIn = false;
        }
    }
})


export const authActions = authSlice.actions


export const store = configureStore({
    reducer: authSlice.reducer
})