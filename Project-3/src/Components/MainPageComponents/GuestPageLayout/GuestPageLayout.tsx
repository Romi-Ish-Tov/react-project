import React, { useContext, useEffect } from "react";
import ResponsiveAppBar from "../Navbar/NavBar";
import ImageSlider from "../Slider/ImageSlider";
import BottomArrow from "../BottomArrow/BottomArrow";
import VacationCardsContainer from "../VacAationCardsContainer/VacationCardsContainer";
import { Link } from "react-scroll";
import LoginModal from "../LoginModal/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import Register from "../Register/Register";
import "./GuestPageLayout.css";
import { useNavigate } from "react-router-dom";

const GuestPageLayout = () => {

    const dispatch = useDispatch();
    const state: any = useSelector(modal => modal)
    const modalStatus: boolean = state.modal.modalLogin;
    const registerModalStatus: boolean = state.modal.modalRegister;
    const navigate = useNavigate();
    const userType = state.user.user.userType;

    useEffect(() => {
        if ((userType == 'admin' || userType == 'customer')) {
            navigate('/index');
        }
    })

    return (
        <div className="MainPageLayout">
            {registerModalStatus && <Register />}
            {modalStatus && <LoginModal />}
            <ResponsiveAppBar />
            <ImageSlider />
            <Link to="vacation-cards-container" smooth={true} duration={1000}> <BottomArrow /> </Link>
            <VacationCardsContainer />
        </div >
    )
}

export default GuestPageLayout;