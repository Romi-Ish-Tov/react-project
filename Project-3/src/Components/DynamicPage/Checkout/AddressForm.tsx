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

const schema = yup.object().shape({
  fullName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").min(4).max(20),
  email: yup.string().required().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'Invalid email'),
  phone: yup.string().required().matches(/^[0-9]+$/, "Invalid number").min(10).max(10),
  amountOfTravelers: yup.number().required().min(1,"Minimum of 1 traveler."),
}).required();

export default function AddressForm() {

  const state: any = useSelector(state => state)
  const user: UserClass = state.user.user;
  const payment: any = state.payment
  
  let phoneNumber:string = state.payment.personalOrderDetails.phoneNumber;
  let amountOfTravelers: number = state.payment.personalOrderDetails.amountOfTravelers;
  let fullName:string = state.payment.personalOrderDetails.fullName;
  let email:string = state.payment.personalOrderDetails.email;
  
  if (fullName == '') {
    fullName = user.fullName
  }

  if (email == '') {
    email = user.email
  }

  const dispatch = useDispatch();
  const [fullNameValue, setFullNameValue] = useState(fullName);
  const [emailValue, setEmailValue] = useState(email);
  const [phoneValue, setPhoneValue] = useState(phoneNumber);
  const [amountOfTravelersValue, setAmountOfTravelersValue] = useState(amountOfTravelers);

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (phoneNumber.length != 10) {
    setError("phone", {
      types: {
        required: "This is required",
      }
    })};
  }, [])

  useEffect(() => {
    if (errors.fullName == undefined && errors.email == undefined && errors.phone == undefined && errors.amountOfTravelers == undefined) {
      dispatch(updateOrder({
        fullName: fullNameValue,
        email: emailValue,
        phoneNumber: phoneValue,
        amountOfTravelers: amountOfTravelersValue,
      }))
      return setIsaddressForm(true);
    }
    setIsaddressForm(false);
  })

  const { isAddressForm, setIsaddressForm } = useContext(addressFormContext)

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);
  const { vacationId, setVacationId } = useContext(vacationIdContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        {vacationId.destination}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={2}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="full name"
                autoComplete="given-name"
                variant="standard"
                value={fullNameValue}
                {...register("fullName", {
                  required: {
                    value: true,
                    message: "required field"
                  },
                  minLength: {
                    value: 4,
                    message: 'minimum 4 characters'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 20 characters'
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]*$/,
                    message: "Invalid fullName",
                  }
                })}
                error={!!errors?.fullName}
                helperText={errors?.fullName ? errors.fullName.message : null}
                onChange={(e) => {
                  setFullNameValue(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                type="email"
                fullWidth
                autoComplete="email"
                variant="standard"
                value={emailValue}
                {...register("email", {
                  required: {
                    value: true,
                    message: "required field"
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  }
                })}
                error={!!errors?.email}
                helperText={errors?.email ? errors.email.message : null}
                onChange={(e) => {
                  setEmailValue(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                label="Phone number"
                fullWidth
                autoComplete="phone"
                variant="standard"
                value={phoneValue}
                {...register("phone", {
                  required: {
                    value: true,
                    message: "required field"
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number",
                  },
                })}
                error={!!errors?.phone}
                helperText={errors?.phone ? errors.phone.message : null}
                onChange={(e) => {
                  setPhoneValue(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={amountOfTravelers}
                id="amountOfTravelers"
                type="number"
                label="Amount Of Travelers"
                fullWidth
                variant="standard"
                {...register("amountOfTravelers", {
                  required: {
                    value: true,
                    message: "required field"
                  },
                  minLength: {
                    value: 4,
                    message: 'minimum 4 characters'
                  },
                  maxLength: {
                    value: 20,
                    message: 'Maximum 20 characters'
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Invalid phone number",
                  },
                })}
                InputProps={{ inputProps: { min: 1 } }}
                error={!!errors?.amountOfTravelers}
                helperText={errors?.amountOfTravelers ? errors.amountOfTravelers.message : null}
                onChange={(e: any) => {
                  setAmountOfTravelersValue(e.target.value)
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Use this address for payment details"
              />
            </Grid>
          </Grid>
        </Box>
      </form>
    </React.Fragment>
  );
}