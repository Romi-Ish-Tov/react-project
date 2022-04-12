import { createSlice } from "@reduxjs/toolkit";

export const VacationsController = createSlice(
    {   
        name: 'Vacations',
        initialState: {
            vacationsArray: [],
        },
        reducers: {
            setVacationsData: (state, action) => {
                state.vacationsArray = action.payload;
            }
        }
    }
);

export const {  setVacationsData, } = VacationsController.actions;
export default VacationsController.reducer;