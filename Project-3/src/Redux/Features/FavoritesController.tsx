import { createSlice } from "@reduxjs/toolkit";
const emptySet:any = new Set
export const FavoritesController = createSlice(
    {   
        name: 'Favorites',
        initialState: {
           setFavoritesVacationsId: emptySet
        },
        reducers: {
            updateFavorites: (state, action) => {
                state.setFavoritesVacationsId = state.setFavoritesVacationsId.has(action.payload) ? state.setFavoritesVacationsId.delete(action.payload) : state.setFavoritesVacationsId.add(action.payload)
            }
            

        }
    }
);

export const { updateFavorites } = FavoritesController.actions;
export default FavoritesController.reducer;