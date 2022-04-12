const connection = require('./connection-wrapper');
const usersLogic = require("../logic/users-logic");

const addUser = async (userRegistrationData) => {
    let sql = 'INSERT INTO users (full_name, user_name, password, email, user_type)' +
        ' VALUES( ?, ?, ?, ?, ? )';

    let parameters = [userRegistrationData.fullName, userRegistrationData.userName, userRegistrationData.encryptedPassword, userRegistrationData.email, userRegistrationData.userType];
    await connection.executeWithParameters(sql, parameters)
    // const userData = usersLogic.login(userRegistrationData);
    // return userData;
}

const login = async (userLoginData) => {
    let sql = 'SELECT user_id AS userId, user_type AS userType, full_name AS fullName, email from users where email = ? and password = ?';
    let parameters = [userLoginData.email, userLoginData.encryptedPassword];
    let [userData] = await connection.executeWithParameters(sql, parameters);

    if (!userData) {
        return null;
    }

    return userData;
}

const isUserNameExist = async (email) => {
    let sql = 'select user_id from users where email = ?';
    let parameters = [email];
    let users = await connection.executeWithParameters(sql, parameters);

    if (users && users.length > 0) {
        return true;
    }

    return false;
}

module.exports = {
    addUser,
    isUserNameExist,
    login,
}