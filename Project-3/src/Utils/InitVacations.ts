import axios from "axios";
import { VacationClass } from "../Types/class/Vacation";

const initVacations = async (userId: number) => {
    const response = await axios.get<VacationClass[]>(`http://localhost:3001/vacations/${userId}`);
    let vacationsModel = response.data;
    
    return vacationsModel;
}

export default initVacations;