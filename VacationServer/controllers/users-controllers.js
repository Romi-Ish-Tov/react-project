const usersLogic = require("../logic/users-logic");
const express = require('express');

const router = express.Router();

//register
router.post('/', async (request, response) => {
    //validateRegisterRequest()
    let userRegistrationData = request.body;
    
    try {
        let successfulLoginResponse = await usersLogic.addUser(userRegistrationData);
        response.json(successfulLoginResponse)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

//login
router.post('/login', async (request, response) => {
    let userLoginData = request.body;

    try {
        let successfulLoginResponse = await usersLogic.login(userLoginData);
        response.json(successfulLoginResponse);
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

module.exports = router;