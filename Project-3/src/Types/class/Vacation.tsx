export class VacationClass {
    constructor(
        public vacationId: number,
        public destination: string,
        public description: string,
        public image: string,
        public price: number,
        public startDate: string,
        public returnDate: string,
        public existingOrders: number
    ) { }
}