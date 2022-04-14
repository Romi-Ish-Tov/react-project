import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { vacationIdContext } from '../../../Redux/Context';
import { useSelector } from 'react-redux';

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
    </React.Fragment>
  );
}