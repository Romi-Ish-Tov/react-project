import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { addressFormContext, isPaidContext, vacationIdContext } from "../../../Redux/Context";
import "./PaymentModal.css";
import { useContext, useMemo, useState } from 'react';
import axios from 'axios';
import { IVacationOrderClass } from '../../../Types/Interface/IVacationOrderClass';
import { useSelector } from 'react-redux';

const steps = ['Order details', 'Review your order', 'Payment details'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <Review />;
    case 2:
      return <PaymentForm />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

export default function Checkout() {
  const [activeStep, setActiveStep] = useState(0);
  const [isAddressForm, setIsaddressForm] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const state:any = useSelector(state => state);
  const user = state.user.user;
  const paymentOrder = state.payment.personalOrderDetails
  const { vacationId, setVacationId } = useContext(vacationIdContext);

  const validateAddressForm: any = useMemo(() => ({ isAddressForm, setIsaddressForm }), [activeStep, setIsaddressForm]);
  const validateIsPaid: any = useMemo(() => ({ isPaid, setIsPaid }), [activeStep, setIsPaid]);

  const handleOrderCompletion = async () => {
    const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g,'/');
    let orderDetailsRequest: IVacationOrderClass = {
      userId: user.id,
      vacationId: vacationId.vacationId,
      startDate: vacationId.startDate.substring(0,10).replace(/-/g,'/'),
      returnDate: vacationId.returnDate.substring(0,10).replace(/-/g,'/'),
      amountOfTravelers: paymentOrder.amountOfTravelers,
      price: vacationId.price,
      orderDate: currentDate,
    }
  
    // const response = await axios.post<any>('http://localhost:3001/orders/handleNewOrder', orderDetailsRequest);
    // let userRegisterResponse = response.data;
    // console.log(userRegisterResponse)
  }

  const handleNext = () => {
    if (isAddressForm && activeStep == 0) {
      return setActiveStep(activeStep + 1)
    }
    if (activeStep == 1) {
      return setActiveStep(activeStep + 1)
    }
    if (isPaid && activeStep == 2) {
      handleOrderCompletion();
      return setActiveStep(activeStep + 1)
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <addressFormContext.Provider value={validateAddressForm}>
      <isPaidContext.Provider value={validateIsPaid}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="absolute"
            color="default"
            elevation={0}
            sx={{
              position: 'relative',
              borderBottom: (t) => `1px solid ${t.palette.divider}`,
            }}
          >
          </AppBar>
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
              <Typography component="h1" variant="h4" align="center">
                Checkout
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <React.Fragment>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                      Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                      Thank you for your order, an email confirming your reservation will shortly be sent
                    </Typography>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {activeStep !== 0 && (
                        <Button id="back-payment-btn" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                          Back
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                      >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </React.Fragment>
            </Paper>
          </Container>
        </ThemeProvider>
      </isPaidContext.Provider>
    </addressFormContext.Provider>
  );
}