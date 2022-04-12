import { createSlice } from "@reduxjs/toolkit";

export const ModalsController = createSlice(
    {   
        name: 'Modals',
        initialState: {
            modalLogin: false,
            modalRegister: false,
        },
        reducers: {
            toggleModalLogin: (state) => {
                state.modalLogin = !state.modalLogin;
            },

            toggleModalRegister: (state) => {
                state.modalRegister = !state.modalRegister;
            },
        }
    }
);

export const { toggleModalLogin, toggleModalRegister } = ModalsController.actions;
export const changeModalStatus = (state: boolean) => state;

export default ModalsController.reducer;