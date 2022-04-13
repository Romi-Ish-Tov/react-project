import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import "./FavoriteBtnIcon.css";
import { addToFavorites, removeFromFavorites } from "../../../../Redux/Features/FavoritesController";

const FavoriteBtnIcon = (props: any) => {
  const dispatch = useDispatch();
  let vacationItem = props.vacationItem;
  const boolean:boolean = (vacationItem.vacationLikeId) ? true : false;
  
  const [isLiked, setIsLiked] = useState(boolean)
  
  const updateFavorites = (id: number, isExist: boolean) => {
    console.log(isExist)
    isExist ? dispatch(addToFavorites(id)) : dispatch(removeFromFavorites(id))
    setIsLiked(boolean => !boolean);
  }
  
  return (
    (isLiked) ? <FavoriteIcon onClick={() => updateFavorites(vacationItem.vacationId, true)} className='favorite-icon' /> : <FavoriteIcon onClick={() => updateFavorites(vacationItem.vacationId, false)} />
  )
}


export default FavoriteBtnIcon