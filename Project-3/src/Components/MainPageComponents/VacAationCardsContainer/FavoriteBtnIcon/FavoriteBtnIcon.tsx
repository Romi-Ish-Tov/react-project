import React, { useState } from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from "../../../../Redux/Features/FavoritesController";
import "./FavoriteBtnIcon.css";

const FavoriteBtnIcon = (props: any) => {  
  const dispatch = useDispatch();
  let likedVacationItem = props.vacationItem;
  const isExistVacationId:boolean = (likedVacationItem.vacationLikeId) ? true : false;
  
  const [isLiked, setIsLiked] = useState(isExistVacationId)
  
  const updateFavorites = (id: number, isExist: boolean) => {
    isExist ? dispatch(addToFavorites(id)) : dispatch(removeFromFavorites(id))
    setIsLiked(boolean => !boolean);
  }
  
  return (
    (isLiked) ? <FavoriteIcon onClick={() => updateFavorites(likedVacationItem.vacationId, true)} className='favorite-icon' /> : <FavoriteIcon onClick={() => updateFavorites(likedVacationItem.vacationId, false)} />
  )
}

export default FavoriteBtnIcon