import { ActionTypes } from "@mui/base";
import { createSlice } from "@reduxjs/toolkit";

export const EditVacationController = createSlice(
    {
        name: 'EditVacation',
        initialState: {
            editVacation: []
        },
        reducers: {
            EditVacationRedux: (state, action) => {
                state.editVacation = action.payload
            }
        }
    }
);

export const { EditVacationRedux } = EditVacationController.actions;
export default EditVacationController.reducer;