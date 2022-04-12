import { VacationClass } from "./Vacation";
import { IVacationOrderClass } from "../Interface/IVacationOrderClass";

export class UserClass {
    constructor(
        public id: number,
        public fullName: string,
        public username: string,
        public password: string,
        public email: string,
        public userType: string,
        public phoneNumber: string,
        public existingOrders: IVacationOrderClass[],
        public followedVacations: VacationClass[], 
    ) {}
}