import axios from "axios";

const initDeleteAttempt = async (vacationId: number) => {    
    const response = await axios.delete<any>(`http://localhost:3001/vacations/${vacationId}`);
    let deleteResponse = response.data;
    console.log(deleteResponse);
}

export default initDeleteAttempt;