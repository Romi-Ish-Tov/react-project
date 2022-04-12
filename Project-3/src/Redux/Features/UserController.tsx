import { createSlice } from "@reduxjs/toolkit";
import { UserClass } from "../../Types/class/UserClass";
import userState from '../../Types/states/userState';

let guest:userState ={
    fullName: 'guest',
    userType: 'guest',
    email: 'guest@gmail.com',
    id: 0   
}

export const UserController = createSlice(
    {
        name: 'User',
        initialState: {
            user: guest
        },
        reducers: {
            login: (state, action) => {
                state.user = action.payload;
            },
            logout: (state) => {
                state.user = guest;
            }
        }
    }
);

export const { login, logout } = UserController.actions;
export const selectUser = (state: any) => state;

export default UserController.reducer;