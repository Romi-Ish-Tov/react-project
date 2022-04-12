const usersDal = require('../dal/users-dal');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const addUser = async (userRegistrationData) => {
    // validateUserData(userRegistrationData);
    if (await usersDal.isUserNameExist(userRegistrationData.email)) {
        throw new Error('User name already exists.');        
    }

    userRegistrationData.encryptedPassword = encryptPassword(userRegistrationData.password);
    userRegistrationData.userType = 'customer'
    await usersDal.addUser(userRegistrationData)  
    const successfulLoginResponse = await login(userRegistrationData);

    return successfulLoginResponse;
}

const login = async (userLoginData) => {
    userLoginData.encryptedPassword = encryptPassword(userLoginData.password);
    let userData = await usersDal.login(userLoginData);
    
    if (!userData) {
        throw new Error("Login Failed");
    }
    
    const successfulLoginResponse = generateToken(userData);
    return successfulLoginResponse;
}

const encryptPassword = (password) => {
    const saltRight = "bhdgfshd@@##$$djcf";
    const saltLeft = "bhdgfshdchdsfjd!!43247832djcf";

    let passwordWithSalt = saltLeft + password + saltRight;
    return crypto.createHash('md5').update(passwordWithSalt).digest('hex'); 
}

const generateToken = (userData) => {
    const token = jwt.sign({userId: userData.userId, userType: userData.userType}, config.secret);
    let successfulLoginResponse = {token, fullName: userData.fullName, email: userData.email};
    return successfulLoginResponse;
}

module.exports = {
    addUser,   
    login,
}