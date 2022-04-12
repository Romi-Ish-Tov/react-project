import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-scroll";
import BottomArrow from "../../MainPageComponents/BottomArrow/BottomArrow";
import ResponsiveAppBar from "../../MainPageComponents/Navbar/NavBar";
import ImageSlider from "../../MainPageComponents/Slider/ImageSlider";
import VacationCardsContainer from "../../MainPageComponents/VacAationCardsContainer/VacationCardsContainer";
import PaymentModal from "../Checkout/PaymentModal";
import { CheckoutContext, vacationIdContext } from '../../../Redux/Context';

const DynamicPageLayout = () => {
    const state: any = useSelector(state => state);
    const user: any = state.user.user;
    const navigate = useNavigate()
    const userType = user.userType;
    useEffect(() => {

        if (userType != 'admin' && userType != 'customer') {
            navigate('/');
        }
    })

    const [paymentModal, setPaymentModal] = useState(false);
    const [vacationId, setVacationId] = useState(0);

    const contextPaymentModal = useMemo(() => ({ paymentModal, setPaymentModal }), [paymentModal, setPaymentModal]);
    const contextVacationId = useMemo(() => ({ vacationId, setVacationId }), [vacationId, setVacationId]);

    return (
        <div className="MainPageLayout">
            <CheckoutContext.Provider value={contextPaymentModal}>
                <vacationIdContext.Provider value={contextVacationId}>
                    {paymentModal && <PaymentModal />}
                    <ResponsiveAppBar />
                    <ImageSlider />
                    <Link to="vacation-cards-container" smooth={true} duration={1000}> <BottomArrow /> </Link>
                    <VacationCardsContainer />
                </vacationIdContext.Provider>
            </CheckoutContext.Provider>
        </div >
    )
}

export default DynamicPageLayout;