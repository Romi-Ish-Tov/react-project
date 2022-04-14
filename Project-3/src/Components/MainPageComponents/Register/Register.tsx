import React from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import { Box, Grid, Paper, Avatar, Typography } from "@material-ui/core";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import PasswordStrengthBar from 'react-password-strength-bar';
import { useDispatch } from "react-redux";
import { toggleModalRegister } from '../../../Redux/Features/ModalsController';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../../Redux/Features/UserController";
import initLoginAttempt from "../../../Utils/Login";
import decryptToken from "../../../Utils/token";
import "./Register.css"

// interface State {
//     amount: string;
//     password: string;
//     weight: string;
//     weightRange: string;
//     showPassword: boolean;
// }

const schema = yup.object().shape({
    userName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").min(4).max(10),
    email: yup.string().email().required().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i),
    password: yup.string().required().min(6),
    confirmPassword: yup.string().required().oneOf([yup.ref("password"), null], 'Passwords must match'),
    fullName: yup.string().required().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").min(4).max(30),
}).required();

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onClickCloseModal = () => {
        dispatch(toggleModalRegister())
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    const handleRegister = async (data: any) => {
        initRegisterAttepmt(data);
        const loginPayload = {
            email: data.email,
            password: data.password
        }

        const loginResponse = await initLoginAttempt(loginPayload);
        dispatch(login(loginResponse));
    }

    const initRegisterAttepmt = async (data: any) => {
        let userRegisterRequest = { 'fullName': data.fullName, 'userName': data.userName, 'email': data.email, 'password': data.password }
        const response = await axios.post<any>('http://localhost:3001/users', userRegisterRequest);
        let userRegisterResponse = response.data
       
        const decodedToken:any = decryptToken(userRegisterResponse.token);

        const newUserState = {
            fullName: userRegisterResponse.fullName,
            email: userRegisterResponse.email,
            userType: decodedToken.userType
        }
        if (userRegisterResponse) {
            dispatch(login(newUserState));
            dispatch(toggleModalRegister());
            navigate('/index');
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => handleRegister(data);
    const password = watch('password');

    const paperStyle = { padding: '30px 20px', width: 300, margin: "20px auto" }
    const headerStyle = { margin: 0 }
    const avatarStyle = { backgroundColor: '#1bbd7e', left: '50%', transform: 'translate(-50%)' }
    const marginTop = { marginTop: 5 }

    interface State {
        amount: string;
        password: string;
        weight: string;
        weightRange: string;
        showPassword: boolean;
    }

    const [values, setValues] = React.useState<State>({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const initRegisterAttempt = async () => {
        // let userRegisterRequest = {'username': username}
    }

    return (
        <div>
            <div className='modal-register' onClick={() => { onClickCloseModal() }} ></div>
            <div className='modal-register-body'>
                <Container className="modal-container" maxWidth="xs">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid>
                            <Paper elevation={20} style={paperStyle}>
                                <Grid>
                                    <Avatar style={avatarStyle}>
                                        <AddCircleOutlineOutlinedIcon />
                                    </Avatar>
                                    <h2 style={headerStyle}>Register</h2>
                                    <Typography variant='caption' gutterBottom>Please fill this form to create an account !</Typography>
                                </Grid>
                                <Box mb={2}>
                                    <TextField  
                                        autoFocus
                                        label="full name"
                                        fullWidth
                                        autoComplete="fullName"
                                        {...register("fullName", {
                                            required: {
                                                value: true,
                                                message: "required field",
                                            },
                                            maxLength: {
                                                value: 30,
                                                message: 'maximum 30 characters'
                                            },
                                            minLength: {
                                                value: 4,
                                                message: 'minimum 4 characters'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]*$/,
                                                message: "Invalid Name",
                                            },
                                        })}
                                        error={!!errors?.fullName}
                                        helperText={errors?.fullName ? errors.fullName.message : null}
                                    />
                                    <TextField
                                        label="Username"
                                        fullWidth
                                        autoComplete="userName"
                                        {...register("userName", {
                                            required: {
                                                value: true,
                                                message: "required field",
                                            },
                                            maxLength: {
                                                value: 10,
                                                message: 'maximum 10 characters'
                                            },
                                            minLength: {
                                                value: 4,
                                                message: 'minimum 4 characters'
                                            },
                                            pattern: {
                                                value: /^[a-zA-Z0-9]*$/,
                                                message: "Invalid username",
                                            },
                                        })}
                                        error={!!errors?.userName}
                                        helperText={errors?.userName ? errors.userName.message : null}
                                    />
                                    <TextField
                                        label="email"
                                        fullWidth
                                        autoComplete="email"
                                        {...register("email", {
                                            required: {
                                                value: true,
                                                message: "required field",
                                            },
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                        error={!!errors?.email}
                                        helperText={errors?.email ? errors.email.message : null}
                                    />
                                    <TextField
                                        fullWidth
                                        label='Password'
                                        placeholder="Enter your password"
                                        autoComplete="password"
                                        {...register("password", {
                                            required: {
                                                value: true,
                                                message: 'Password is required'
                                            },
                                            minLength: {
                                                value: 6,
                                                message: "max 6 characters"
                                            }
                                        })}
                                        error={!!errors?.password}
                                        helperText={errors?.password ? errors.password.message : null && <PasswordStrengthBar password={password} />}
                                        type={values.showPassword ? 'text' : 'password'}
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
                                    <TextField
                                        fullWidth
                                        label='Confirm Password'
                                        placeholder="Confirm your password"
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            return false
                                        }}
                                        {...register("confirmPassword", {
                                            required: {
                                                value: true,
                                                message: "confirm password required"
                                            },
                                            validate: (value) => value == password || "the password is not match",
                                        })}
                                        error={!!errors?.confirmPassword}
                                        helperText={errors?.confirmPassword ? errors.confirmPassword.message : null}
                                        type={values.showPassword ? 'text' : 'password'}
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
                                        control={<Checkbox name="checkedA" />}
                                        label="I accept the terms and conditions."
                                    />
                                    <Button className="btn-register" onSubmit={handleSubmit(onSubmit)} type='submit' variant='contained' color='primary'>Sign up</Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </form>
                </Container>
            </div>
        </div>
    )
}

export default Register;