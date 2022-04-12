import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from 'react-redux';
import "./FavoriteBtnIcon.css";
import { updateFavorites } from '../../../../Redux/Features/FavoritesController';

const FavoriteBtnIcon = (props: any, set: Set<number>) => {
  const dispatch = useDispatch();

  let favoritesSet = props.set;
  console.log(props)
  let vacationItem = props.props;

  if (vacationItem.vacationLikeId) {
    favoritesSet.add(vacationItem.vacationId);
  }

  const updateFavoritesVacation = (id: number) => {
    // (favoritesSet.has(id) ? favoritesSet.delete(id) : favoritesSet.add(id));
    console.log(favoritesSet);
    dispatch(updateFavorites(id))

  }
  return (
    (vacationItem.vacationLikeId != undefined) ? <FavoriteIcon onClick={() => updateFavoritesVacation(vacationItem.vacationId)} className='favorite-icon' /> : <FavoriteIcon onClick={() => updateFavoritesVacation(vacationItem.vacationId)} />
  )
}


export default FavoriteBtnIcon