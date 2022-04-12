const vacationsDal = require('../dal/vacations-dal');

const getAllVacations = async (id) => {
    let successfulGetAllVacationsRequest = await vacationsDal.getAllVacations(id);
    return successfulGetAllVacationsRequest;
}

const deleteVacation = async (id) => {
    await vacationsDal.deleteVacation(id);
    return;
}

const addVacation = async (addNewVacation) => {
    await vacationsDal.addVacation(addNewVacation);
    return;
}

const editVacation = async (updateVacation) => {
    await vacationsDal.editVacation(updateVacation);
}

module.exports = {
    getAllVacations,
    deleteVacation,
    addVacation,
    editVacation,
}