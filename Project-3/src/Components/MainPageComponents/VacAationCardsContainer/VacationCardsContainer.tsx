import React, { useContext, useEffect, useState } from "react";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { blue } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { useDispatch, useSelector } from "react-redux";
import { toggleModalEdit, toggleModalLogin } from "../../../Redux/Features/ModalsController";
import { VacationClass } from "../../../Types/class/Vacation";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CheckoutContext, vacationIdContext } from "../../../Redux/Context";
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { setVacationsData } from "../../../Redux/Features/VacationsController"
import initDeleteAttempt from "../../../Utils/DeleteVacation";
import FavoriteBtnIcon from "./FavoriteBtnIcon/FavoriteBtnIcon";
import "./VacationCardsContainer.css"
import EditVacation from "../../../Utils/EditVacation";
import { EditVacationRedux } from "../../../Redux/Features/EditVacationController";
import NewVacation from "../../AdminViewComponent/NewVacation/NewVacation";

const VacationCardsContainer = (): JSX.Element => {
    const state: any = useSelector(vacation => vacation);
    const user: any = state.user.user;
    let stateVacationsArray: VacationClass[] = state.vacation.vacationsArray;
    const userType = user.userType;

    const [isEditModal, setIsEditModal] = useState(false);

    const { vacationId, setVacationId } = useContext(vacationIdContext);
    const { paymentModal, setPaymentModal } = useContext(CheckoutContext);

    const favoritesArray: number[] = []

    const dispatch = useDispatch();
    if (state.vacation.vacationsArray.vacationsArray != null) {
        stateVacationsArray = state.vacation.vacationsArray.vacationsArray;
    }

    const toggleModalOnClick = () => {
        userType != "guest" ? console.log() : dispatch(toggleModalLogin())
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

    const onClickDelete = (index: number) => {
        initDeleteAttempt(index)
    }

    useEffect(() => {
        if (user.userType != 'guest') {
            initFavoritesAttepmt();
        }
    }, [])

    const initFavoritesAttepmt = async () => {
        try {
            const response = await axios.get<any>(`http://localhost:3001/vacations/${user.userId}`);
            let favoriteVacationsResponse: number[] = response.data;

            dispatch(setVacationsData({
                vacationsArray: favoriteVacationsResponse
            }))
        }
        catch (e: any) {
            console.error(e.message)
        }
    }
    let dateString = ''
    return (
        <div>
            <div className="vacation-cards-container">
                {userType == 'admin' && <NewVacation></NewVacation> }
                {stateVacationsArray.map((item: any, index: number) => {
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
                                        {/* {userType == 'guest' && <div>
                                            <FavoriteIcon className="guest-icon" />
                                        </div>} */}
                                        {/* {userType == 'customer' && <div> */}
                                        <IconButton aria-label="add to favorites">
                                            <FavoriteBtnIcon vacationItem={item} array={favoritesArray} />
                                        </IconButton>
                                        <IconButton aria-label="share" onClick={() => onClickCart(index)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                        {/* </div>} */}
                                        {userType == 'admin'
                                            && <div>
                                                <IconButton aria-label="add to favorites" onClick={() => {
                                                    dispatch(toggleModalEdit())
                                                    dispatch(EditVacationRedux(item))
                                                }}>
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
        </div >
    )
}

export default VacationCardsContainer;