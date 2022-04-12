import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import "date-fns";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from "@mui/material/Stack";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { isPaidContext } from '../../../Redux/Context';
import { useContext, useEffect } from 'react';
import valid from 'card-validator';
import "./PaymentForm.css"

const schema = yup.object().shape({
  cardName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only letters are allowed in this field ").min(4).max(30),
  cardNumber: yup.string().required("required field").typeError('required field').matches(/^[0-9]*$/, 'Invalid caracters, only numbers').test('cardNumber', 'Must be exactly 16 characters', cardNumber => cardNumber?.toString().length === 16).test('cardNumber', 'Credit Card number is invalid', cardNumber => valid.number(cardNumber).isPotentiallyValid),
  expDate: yup.string().required(),
  cvv: yup.string().required().typeError('required field').matches(/^[0-9]*$/, 'Invalid caracters, only numbers').test('cvv', 'Must be exactly 3 characters', cvv => cvv?.toString().length === 3),
}).required();

export default function PaymentForm() {
  const [expirationDateValue, setExpirationDateValue] = React.useState<Date | null>(new Date());

  const { register, watch, handleSubmit, setError, formState: { errors } } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => console.log(data);

  const { isPaid, setIsPaid } = useContext(isPaidContext)

  useEffect(() => {
    setError("cardName", {
      types: {
        required: "This is required",
      }
    })
    setError("cardNumber", {
      types: {
        required: "This is required",
      }
    })
    setError("cvv", {
      types: {
        required: "This is required",
      }
    })
  }, [])

  useEffect(() => {
    if (errors.cardName == undefined && errors.cardNumber == undefined && errors.expDate == undefined && errors.cvv == undefined) {
      return setIsPaid(true);
    }
    setIsPaid(false);
  })

  const cardNum = watch('cardNumber')
  const expireDate = watch('expDate');
  const cvv1 = watch('cvv');

  const cardNumVal = valid.number(cardNum)
  const expDate = valid.expirationDate(expireDate);
  const cvv = valid.cvv(cvv1);

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" gutterBottom>
          Payment method
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              {...register("cardName", {
                required: {
                  value: true,
                  message: "required field"
                },
                minLength: {
                  value: 4,
                  message: 'minimum 4 characters'
                },
                maxLength: {
                  value: 30,
                  message: 'Maximum 30 characters'
                },
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: "Invalid card Name",
                }
              })}
              error={!!errors?.cardName}
              helperText={errors?.cardName ? errors.cardName.message : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="cardNumber"
              label="Card number"
              fullWidth
              placeholder='**** **** **** ****'
              type="number"
              autoComplete="cc-number"
              variant="standard"
              required
              {...register("cardNumber", {
                validate: () => cardNumVal.isValid || "Invalid Credit Card",
                required: {
                  value: true,
                  message: "required field"
                },
                minLength: {
                  value: 16,
                  message: 'Expected 16 characters'
                },
                maxLength: {
                  value: 16,
                  message: 'Expected 16 characters'
                }
              })}
              error={!!errors?.cardNumber}
              helperText={errors?.cardNumber ? errors.cardNumber.message : cardNumVal.card?.type}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DatePicker className="datePicker"
                  
                  inputFormat='MM/yy'
                  views={['year', 'month']}
                  label="expiry date"
                  minDate={new Date('2022-04')}
                  maxDate={new Date('2029-12')}
                  value={expirationDateValue}
                  disablePast={true}
                  onChange={(newValue) => {
                    setExpirationDateValue(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              {...register("cvv", {
                required: {
                  value: true,
                  message: "required field"
                },
                minLength: {
                  value: 3,
                  message: 'Expected 3 characters'
                },
                maxLength: {
                  value: 3,
                  message: 'Expected 3 characters'
                }
              })}
              id="cvv"
              label="CVV"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              error={!!errors?.cvv}
              helperText={errors?.cvv ? errors.cvv.message : null}
            />
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}