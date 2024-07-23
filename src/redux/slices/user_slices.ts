import { CurrentUser } from './../../interface/index';
import { createSlice } from "@reduxjs/toolkit";


type UserState = {
    currentUser:CurrentUser | null;
}

const initialState:UserState = {
    currentUser:null
}

const userSlices = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.currentUser = action.payload;
        }
    }
});

export const {setUser} = userSlices.actions;
export default userSlices;