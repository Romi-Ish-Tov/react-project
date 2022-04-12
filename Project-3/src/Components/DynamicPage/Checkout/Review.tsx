import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { vacationIdContext } from '../../../Redux/Context';
import { useSelector } from 'react-redux';

// const products = [
//   {
//     name: 'Product 1',
//     desc: 'A nice thing',
//     price: '$9.99',
//   },
//   {
//     name: 'Product 2',
//     desc: 'Another thing',
//     price: '$3.45',
//   },
//   {
//     name: 'Product 3',
//     desc: 'Something else',
//     price: '$6.51',
//   },
//   {
//     name: 'Product 4',
//     desc: 'Best thing of all',
//     price: '$14.11',
//   },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];

export default function Review() {
  const state:any = useSelector(state => state)
  const paymentModalInfo = state.payment.personalOrderDetails;
  const amountOfTravellers = paymentModalInfo.amountOfTravelers

  const { vacationId, setVacationId } = useContext(vacationIdContext);

  const products = [
    {name: "Destination", price: vacationId.destination,},
    {name: 'Price', desc: 'Per person', price: vacationId.price + '$' },
    {name: 'Amount of people', desc: '', price: amountOfTravellers },
    {name: 'Dates', desc: '', price: `${vacationId.startDate.substring(0,10)}  -  ${vacationId.returnDate.substring(0,10)}`},
  ];
  // const addresses = ['1 MUI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
  // const payments = [
  //   { name: 'First name:', detail: paymentModalInfo.firstName },
  //   { name: 'Last Name:', detail: paymentModalInfo.lastName },
  //   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  //   { name: 'Expiry date', detail: '04/2024' },
  // ];
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.desc} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {amountOfTravellers * vacationId.price + '$'}
          </Typography>
        </ListItem>
      </List>
      {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Personnal details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid> */}
    </React.Fragment>
  );
}