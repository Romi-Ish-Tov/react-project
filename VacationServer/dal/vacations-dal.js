const connection = require('./connection-wrapper');

const getAllVacations = async (id) => {
    let sql = "SELECT v.vacation_id AS vacationId, v.destination, v.description, v.price, v.start_date AS startDate, v.return_date AS returnDate, v.image, vacation_like_id AS vacationLikeId FROM vacations v LEFT JOIN likes l ON v.vacation_id = l.vacation_id AND l.user_id = ? ORDER BY l.user_id IS NULL"
    let parameters = [id]
    let vacations = await connection.executeWithParameters(sql, parameters);
    return vacations;
}

const deleteVacation = async (id) => {
    let sql = "DELETE FROM vacations WHERE vacation_id = ?";
    let parameters = [id]
    await connection.executeWithParameters(sql, parameters);
}

const addVacation = async (addNewVacation) => {
    let sql = 'INSERT INTO vacations (destination, description, price, image, start_date, return_date, existing_orders)' +
        ' VALUES( ?, ?, ?, ?, ?, ?, ? )'
    let parameters = [addNewVacation.destination, addNewVacation.description, addNewVacation.price, addNewVacation.image, addNewVacation.startDate, addNewVacation.returnDate, addNewVacation.existingOrders]
    await connection.executeWithParameters(sql, parameters);
}

const editVacation = async (updateVacation) => {
    let sql = 'UPDATE vacations' +
        ' SET destination = ?, description = ?, price = ?, image = ?, start_date = ?, return_date = ? WHERE vacation_id = ?'
    let parameters = [updateVacation.destination, updateVacation.description, updateVacation.price, updateVacation.image, updateVacation.startDate, updateVacation.returnDate, updateVacation.vacationId]
    await connection.executeWithParameters(sql, parameters);
}

module.exports = {
    getAllVacations,
    deleteVacation,
    addVacation,
    editVacation,
}