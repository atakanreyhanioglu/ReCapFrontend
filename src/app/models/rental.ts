export interface Rental{
    id:number;
    carId:number
    customerId:number
    userId:number
    customerName:string;
    customerLastName:string;
    carName :string
    brandName : string
    colorName : string
    dailyPrice : number
    rentDate : Date
    returnDate : Date
}