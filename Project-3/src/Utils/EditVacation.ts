import axios from "axios";
import { VacationClass } from "../Types/class/Vacation";

const initeditAttempt = async (updatedVacation: VacationClass) => {    
    
    const response = await axios.patch<any>(`http://localhost:3001/vacations/${updatedVacation.vacationId}`, updatedVacation);
    let editResponse = response.data;
    console.log(editResponse);
}

export default initeditAttempt;