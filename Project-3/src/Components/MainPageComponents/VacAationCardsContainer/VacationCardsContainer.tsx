import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { blue } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin } from "../../../Redux/Features/ModalsController";
import { VacationClass } from "../../../Types/class/Vacation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { UserClass } from "../../../Types/class/UserClass";
import { CheckoutContext, vacationIdContext } from "../../../Redux/Context";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import initDeleteAttempt from "../../../Utils/DeleteVacation";
import "./VacationCardsContainer.css"

const VacationCardsContainer = (): JSX.Element => {
    const state: any = useSelector(vacation => vacation);
    const user: UserClass = state.user.user;
    let stateVacationsArray: VacationClass[] = state.vacation.vacationsArray;
    const userType = user.userType;

    const { vacationId, setVacationId } = useContext(vacationIdContext);
    const { paymentModal, setPaymentModal } = useContext(CheckoutContext);

    const dispatch = useDispatch();

    if (state.vacation.vacationsArray.vacationsArray != null) {
        stateVacationsArray = state.vacation.vacationsArray.vacationsArray;
    }

    const toggleModalOnClick = () => {
        dispatch(toggleModalLogin())
    }

    const onClickCart = (index: number) => {
        if (user.userType == 'guest') {
            return;
        }
        else {
            setPaymentModal(true);
            setVacationId(stateVacationsArray[index]);
        }
    }

    const addToFavorites = (index: number) => {

    }

    const onClickFavorite = (index: number) => {
        if (user.userType == 'guest') {
            return;
        }
        else {
            addToFavorites(index)
        }
    }

    const removeFromFavorites = (index: number) => {

    }

    const onClickUnFavorite = (index: number) => {
        if (user.userType == 'guest') {
            return;
        }
        else {
            removeFromFavorites(index)
        }
    }

    const onClickDelete = (index: number) => {
        initDeleteAttempt(index)
    }

    const onClickEdit = (index: number) => {

    }


    useEffect(() => {
        if (user.userType != 'guest') {
            initFavoritesAttepmt();
        }
    }, [])

    const initFavoritesAttepmt = async () => {
        const response = await axios.post<any>('http://localhost:3001/likes/requestFavoriteVacations', { userId: user.id });
        let favoriteVacationsResponse: number[] = response.data;
        sortVacationArrayByFavorites(favoriteVacationsResponse)
    }

    const sortVacationArrayByFavorites = (favoritesId: number[]) => {
        let stateVacationsArrayofIds = stateVacationsArray.map((item: VacationClass) => {
            return item.vacationId
        })

        let unLikesVacations: number[] = []
        stateVacationsArrayofIds.map((item: number) => {
            if (!favoritesId.includes(item)) {
                unLikesVacations.push(item);
            }
        })


        let displayedArrayIds: number[] = favoritesId.concat(unLikesVacations);

        let a: VacationClass[] = []
        displayedArrayIds.map((item: number) => {
            for (let i = 0; i < displayedArrayIds.length; i++) {
                if (stateVacationsArray[i].vacationId == item) {
                    a.push(stateVacationsArray[i])
                }
            }
        })
        console.log(a);
    }


    let dateString = ''
    return (
        <div>
            <div className="vacation-cards-container">
                {stateVacationsArray.map((item: VacationClass, index: number) => {
                    { dateString = (`${item.startDate.substring(0, 10).replace(/-/g, '/')} - ${item.returnDate.substring(0, 10).replace(/-/g, '/')}`) }
                    return (
                        < div key={index} className='vacation-card' onClick={() => toggleModalOnClick()} >
                            <div className="user-card">
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{ bgcolor: blue.A200 }} aria-label="recipe">
                                                {item.destination.slice(0, 1)}
                                            </Avatar>
                                        }
                                        // action={
                                        //     <IconButton aria-label="settings">
                                        //         <MoreVertIcon />
                                        //     </IconButton>
                                        // }
                                        title={item.destination}
                                        subheader={dateString}
                                    />
                                    <div className="image-card">
                                        <CardMedia
                                            component="img"
                                            height="194"
                                            image={item.image}
                                            alt={item.destination}
                                        />
                                    </div>
                                    <div className="card-text">
                                        <CardContent>
                                            <Typography variant="body2" color="text.secondary">
                                                {item.description}
                                            </Typography>
                                        </CardContent>
                                    </div>
                                    <CardActions disableSpacing >
                                        {userType == 'guest' && <div>
                                            <FavoriteIcon className="guest-icon"/>
                                        </div>}
                                        {userType == 'customer' && <div>
                                            <IconButton aria-label="add to favorites" onClick={() => { onClickFavorite(index) }}>
                                                <FavoriteIcon />
                                            </IconButton>

                                            <IconButton aria-label="share" onClick={() => onClickCart(index)}>
                                                <ShoppingCartIcon />
                                            </IconButton>
                                        </div>}
                                        {userType == 'admin'
                                            && <div>
                                                <IconButton aria-label="add to favorites" onClick={() => { onClickEdit(index) }}>
                                                    <EditIcon />
                                                </IconButton>

                                                <IconButton aria-label="share" onClick={() => onClickDelete(item.vacationId)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>}
                                    </CardActions>
                                </Card>
                            </div >
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default VacationCardsContainer;