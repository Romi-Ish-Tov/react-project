import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { Box } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addressFormContext, vacationIdContext } from "../../../Redux/Context";
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateOrder } from '../../../Redux/Features/PaymentModalController';
import { UserClass } from '../../../Types/class/UserClass';
import './AdminEditModal.css';


// const schema = yup.object().shape({
//   fullName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").min(4).max(20),
//   email: yup.string().required().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email'),
//   phone: yup.string().required().matches(/^[0-9]+$/, "Invalid number").min(10).max(10),
//   amountOfTravelers: yup.number().required().min(1,"Minimum of 1 traveler."),
// }).required();

export default function AdminEditModal() {

    const state: any = useSelector(state => state)
    const user: UserClass = state.user.user;

    //   let phoneNumber:string = state.payment.personalOrderDetails.phoneNumber;
    //   let amountOfTravelers: number = state.payment.personalOrderDetails.amountOfTravelers;
    //   let fullName:string = state.payment.personalOrderDetails.fullName;
    //   let email:string = state.payment.personalOrderDetails.email;


    const dispatch = useDispatch();


    //   const { register, handleSubmit, setError, formState: { errors } } = useForm({
    //     mode: "onTouched",
    //     resolver: yupResolver(schema),
    //   });

    // 

    //   const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

    return (
        <div className='admin-modal-container'>
            <React.Fragment>
                <Typography variant="h6" gutterBottom>

                </Typography>
                {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                <Box mb={2}>
                    <Grid container spacing={3}>
                        <Grid item xs={6} sm={20}>
                            <TextField
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="full name"
                                autoComplete="given-name"
                                variant="outlined"

                            />
                        </Grid>

                    </Grid>
                </Box>
                {/* </form> */}
            </React.Fragment>
        </div>
    );
}