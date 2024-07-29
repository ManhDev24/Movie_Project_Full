import { getLocalStorage } from '../../utils';
import { CurrentUser } from '../../interface/user.interface';
import { createSlice } from "@reduxjs/toolkit";


const userLocalStorage = getLocalStorage<CurrentUser>('user');

type UserState = {
    currentUser:CurrentUser | null;
}

const initialState:UserState = {
    currentUser:userLocalStorage
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