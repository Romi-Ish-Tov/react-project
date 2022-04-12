import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import ModalsController from "./Features/ModalsController";
import VacationsController from "./Features/VacationsController";
import UserController from "./Features/UserController";
import PaymentModalController from "./Features/PaymentModalController";
import FavoritesController from "./Features/FavoritesController";

export default configureStore({
    reducer: {
        user: UserController,
        vacation: VacationsController,
        modal: ModalsController,
        payment: PaymentModalController,
        favorites: FavoritesController
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});