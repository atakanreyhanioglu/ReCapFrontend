export interface Rental {
  id: number;
  customerId: number;
  carId: number;
  userId: number;
  customerName: string;
  companyName: string;
  customerLastName: string;
  carName: string;
  dailyPrice: number;
  rentDate: Date;
  returnDate: Date;
}
