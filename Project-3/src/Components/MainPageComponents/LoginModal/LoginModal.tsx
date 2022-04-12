import React, { useContext, useEffect, useState } from "react";
import { Avatar, Checkbox, FormControlLabel, Grid, Paper, TextField, Button, Typography, Link } from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useDispatch, useSelector } from "react-redux";
import { toggleModalLogin, toggleModalRegister } from "../../../Redux/Features/ModalsController";
import { login } from "../../../Redux/Features/UserController";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from "react-router-dom";
import { UserClass } from "../../../Types/class/UserClass";
import axios from "axios";
import decryptToken from "../../../Utils/token";
import "./Login.css";
import initLoginAttempt from "../../../Utils/Login";
import userState from "../../../Types/states/userState";
import { updateOrder } from "../../../Redux/Features/PaymentModalController";

interface State {
    amount: string;
    password: string;
    weight: string;
    weightRange: string;
    showPassword: boolean;
}

const LoginModal = (): JSX.Element => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = React.useState(true);

    const state: any = useSelector(state => state);
    const user: userState = state.user.user;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const registerText: string = ' Register'

    const onClickCloseModal = () => {
        dispatch(toggleModalLogin())
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const handleLogin = async (e: any) => {
        const loginPayload = {
            email: email,
            password: password
        }

        try {
            const loginResponse = await initLoginAttempt(loginPayload);
            dispatch(login(loginResponse));

            const paymentDetails = {
                fullName: loginResponse?.fullName,
                email: loginResponse?.email,
                phoneNumber: '05',
                amountOfTravelers: 1
            }
            dispatch(updateOrder(paymentDetails))
        }
        catch (e: any) {
            alert('email and password are wrong. please try again.')
        }
    }

    useEffect(() => {
        if (user.userType != 'guest') {
            navigate('/index');
        }
    })

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange1 = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: event.target.value });
        setPassword(event.target.value)
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const paperStyle = { padding: 20, height: "70vh", width: "280px", margin: "20px auto" };
    const avataerStyle = { backgroundColor: "#1bbd7e", left: "50%", transform: "translate(-50%)" };
    const btnstyle = { margin: "8px 0" };
    const gridStyle = { width: "none", margin: "0%" }

    return (
        <div>
            <div className="modal" onClick={() => { onClickCloseModal() }} ></div>
            <div className="modal-body">
                <Grid style={gridStyle}>
                    <div >
                        <Paper elevation={10} style={paperStyle}>
                            <Grid>
                                <Avatar style={avataerStyle}><LockOutlinedIcon /></Avatar>
                                <h2>Sign in</h2>
                            </Grid>
                            <TextField
                                type="email"
                                label="email"
                                placeholder="Enter email"
                                fullWidth
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                label="password"
                                placeholder="Enter password"
                                type={values.showPassword ? 'text' : 'password'}
                                fullWidth
                                required
                                onChange={handleChange1("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}>
                                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={handleChange}
                                        name="checkedB"
                                        color="primary"
                                    />
                                }
                                label="Remember me"
                            />
                            <Button onClick={(e) => handleLogin(e)} type="submit" fullWidth variant="contained" color="primary" style={btnstyle}>Sign In</Button>
                            <Typography>
                                <Link href="#">
                                    Forgot password?
                                </Link>
                            </Typography>
                            <Typography> Don't have an account?
                                <Link onClick={() => dispatch(toggleModalRegister())}>
                                    {registerText}
                                </Link>
                            </Typography>
                        </Paper>
                    </div>
                </Grid>
            </div>
        </div>
    )
}

export default LoginModal;