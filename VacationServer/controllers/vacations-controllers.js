const express = require('express');
const vacationsLogic = require('../logic/vacations-logic');

const router = express.Router();

router.get('/:id', async (request, response) => {
    let id =  request.params.id
    try {
        let successfulGetAllVacationsRequest = await vacationsLogic.getAllVacations(id);
        response.json(successfulGetAllVacationsRequest)
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

router.delete('/:id', async (requset, response) => {
    const id = requset.params.id
    
    try {
        await vacationsLogic.deleteVacation(id);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

router.post('/addVacation', async (requset, response) => {
    const addNewVacation = requset.body
    
    try {
        await vacationsLogic.addVacation(addNewVacation);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

router.patch('/:id', async (requset, response) => {
    const updateVacation = requset.body
    const vacationId = requset.params.id
    
    updateVacation.vacationId = vacationId;

    try {
        await vacationsLogic.editVacation(updateVacation);
        response.json()
    }
    catch (e) {
        console.error(e);
        response.status(600).send(e.message);
    }
})

module.exports = router;