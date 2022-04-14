import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { UserClass } from '../../../Types/class/UserClass';
import { toggleModalLogin, toggleModalRegister } from "../../../Redux/Features/ModalsController";
import { useNavigate } from 'react-router-dom';
import { updateOrder} from '../../../Redux/Features/PaymentModalController';
import { logout } from '../../../Redux/Features/UserController';
import { onLogout } from '../../../Redux/Features/VacationsController';

import "./Navbar.css";

const ResponsiveAppBar = () => {
  const state: any = useSelector(state => state);
  const user: UserClass = state.user.user;
  let userType = user.userType

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const browseVacations = () => { document.getElementsByClassName('vacation-cards-container')[0].scrollIntoView({ behavior: 'smooth' }) };
  const register = () => { dispatch(toggleModalRegister()) };

  const login = () => {
    dispatch(toggleModalLogin())
  };

  const onClickLogout = () => {
    dispatch(logout())
    dispatch(updateOrder(state));
    // dispatch(onLogout())
    navigate('/')
  }

  const preview = () => {

    if (window.location.href.substring(window.location.href.length - 5, window.location.href.length) != 'index') {
      navigate('/index')
      return;
    }
    browseVacations();

  };
  const statictics = () => {  navigate("/graph") };
  const vacationManagement = () => { navigate("/vacationManagment") };

  let renderByObject = {
    pages: ['Browse vacations', 'Login', 'Register'],
    functionsArray: [browseVacations, login, register]
  }

  const userObject = {
    page: ['Browse vacation', 'Logout'],
    functionsArray: [browseVacations, onClickLogout]
  }

  const adminObject = {
    page: ["Preview", "Statistics", "Vacation management", "Logout"],
    functionsArray: [preview, statictics, vacationManagement, onClickLogout]
  }

  const navBarObject = [adminObject, userObject]

  if (userType == 'customer') {
    renderByObject.pages = navBarObject[1].page;
    renderByObject.functionsArray = navBarObject[1].functionsArray;
  }
  else if (userType == 'admin') {
    renderByObject.pages = navBarObject[0].page;
    renderByObject.functionsArray = navBarObject[0].functionsArray;
  }

  return (
    <div className='navbar'>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
              {renderByObject.pages.map((page, index) => (
                <Button
                  key={page}
                  onClick={renderByObject.functionsArray[index]}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default ResponsiveAppBar;