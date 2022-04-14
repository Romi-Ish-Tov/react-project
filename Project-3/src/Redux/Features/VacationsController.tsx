import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import initVacations from "../../Utils/InitVacations";

const vacationsArray: any = [];

const fetchUserById = createAsyncThunk(
    'fetchUserById',
    async (thunkApi) => {
        const response = await axios.get<any[]>('http://localhost:3001/vacations/');
        console.log(response);
        
        return response.data
    }
)

export const VacationsController = createSlice(
    {
        name: 'Vacations',
        initialState: {
            vacationsArray: [],
        },
        reducers: {
            setVacationsData: (state, action) => {
                state.vacationsArray = action.payload;
            },
            onLogout: (state) => {
                state.vacationsArray = vacationsArray;
            }

        },
        extraReducers: (builder: any) => {
            builder.addCase(fetchUserById.fulfilled, (state: any, action: any) => {
                state.vacationsArray = (action.payload)
            })
        },

    }
);

export const { setVacationsData, onLogout } = VacationsController.actions;
export {fetchUserById}
export default VacationsController.reducer;