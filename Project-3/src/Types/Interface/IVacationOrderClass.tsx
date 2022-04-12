import { UserClass } from "../class/UserClass";
import { VacationClass } from "../class/Vacation";

export interface IVacationOrderClass {
    userId: number,
    vacationId: number,
    startDate: string,
    returnDate: string,
    amountOfTravelers: number,
    orderDate: string,
    price: number
}