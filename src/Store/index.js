import { configureStore,createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name:"Authentication",
    initialState:{
        token: localStorage.getItem("token"), // Initialize token from localStorage
        isLoggedIn: !!localStorage.getItem("token")
    },
    reducers:{
        login(state,action){
            state.token = action.payload.token
            state.isLoggedIn = true
            localStorage.setItem("token",action.payload.token)

        },
        logout(state){
            state.token=null
            state.isLoggedIn=false
            localStorage.removeItem("token")


        }
    }
})

const store = configureStore({
    reducer:{Authentication:auth.reducer}
})

export const authActions = auth.actions;
export default store;
