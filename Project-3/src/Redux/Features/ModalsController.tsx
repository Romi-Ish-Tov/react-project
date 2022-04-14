import { createSlice } from "@reduxjs/toolkit";

export const ModalsController = createSlice(
    {   
        name: 'Modals',
        initialState: {
            modalLogin: false,
            modalRegister: false,
            modalEdit: false
        },
        reducers: {
            toggleModalLogin: (state) => {
                state.modalLogin = !state.modalLogin;
            },

            toggleModalRegister: (state) => {
                state.modalRegister = !state.modalRegister;
            },
            toggleModalEdit: (state) => {
                state.modalEdit = !state.modalEdit;
            },
        }
    }
);

export const { toggleModalLogin, toggleModalRegister, toggleModalEdit } = ModalsController.actions;
export const changeModalStatus = (state: boolean) => state;

export default ModalsController.reducer;