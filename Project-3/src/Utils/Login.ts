import axios from "axios";
import decryptToken from "./token";

const initLoginAttempt = async (loginPayload: any) => {
    let userLoginRequest = { 'email': loginPayload.email, 'password': loginPayload.password }

    const response = await axios.post<any>('http://localhost:3001/users/login', userLoginRequest);
    let userLoginResponse = response.data;
    const decodedToken: any = decryptToken(userLoginResponse.token)

    const newUserState = {
        fullName: userLoginResponse.fullName,
        email: userLoginResponse.email,
        userType: decodedToken.userType,
        userId: decodedToken.userId
    }

    if (!userLoginResponse) {
        throw new Error('email or password are wrong. please try again')
    }
    return newUserState;
}

export default initLoginAttempt;