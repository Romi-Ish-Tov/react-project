import { createSlice } from "@reduxjs/toolkit";

export const PaymentModalController = createSlice(
    {   
        name: 'Payment',
        initialState: {
            personalOrderDetails: {
                fullName: '',
                email:'',
                phoneNumber: '05',
                amountOfTravelers: 1,
            },
            isNextAllowed: false,

        },
        reducers: {
            updateOrder: (state, action) => {
                state.personalOrderDetails.fullName = action.payload.fullName;
                state.personalOrderDetails.email = action.payload.email;
                state.personalOrderDetails.phoneNumber = action.payload.phoneNumber;
                state.personalOrderDetails.amountOfTravelers = action.payload.amountOfTravelers;
            },
        }
    }
);

export const { updateOrder } = PaymentModalController.actions;
export const changeModalStatus = (state: boolean) => state;

export default PaymentModalController.reducer;