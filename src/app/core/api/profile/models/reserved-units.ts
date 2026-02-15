export interface ReservedUnits {
  content: Offer[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}
interface Offer {
  offerId: number;
  unitId: number;
  offerNumber: string;
  projectName: string;
  unitNumber: string;
  reservationAmount: any;
  remainingTime: any;
  orderDateTime: any;
  status: string;
  expirationDate: string;
  paymentPlan: string;
  finishing: string;
  maintenancePlan: string;
  customerId: any;
  customerName: any;
  customerMobile: any;
  customerEmail: any;
  customerNationality: any;
}
