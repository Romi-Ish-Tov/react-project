import { ActionTypes } from "@mui/base";
import { createSlice } from "@reduxjs/toolkit";
const numberArray : number[] = [8]

const filterArray = (array: number[], id: number) => {
    let filteredId = array.filter((item: number) => item != id);
    console.log(filteredId);
    return filteredId;
    
}

export const FavoritesController = createSlice(
    {
        name: 'Favorites',
        initialState: {
            favoritesArray: numberArray
        },
        reducers: {
            addToFavorites: (state, action) => {
                state.favoritesArray.push(action.payload)
            },
            removeFromFavorites: (state, action) => {
                state.favoritesArray = filterArray(state.favoritesArray, action.payload)
            }
        }
    }
);

export const { addToFavorites, removeFromFavorites } = FavoritesController.actions;
export default FavoritesController.reducer;