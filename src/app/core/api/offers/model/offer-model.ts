interface Offer {
  unitId: number;
  customerId: number;
  salesManId: number;
  paymentPlanId: number;
  appointmentId: number;
  reservationAmount: string;
  unitPrice: string;
  reservedAt: string;   // ISO date
  expiresAt: string;    // ISO date
  finishing: string;
  maintenancePlan: string;
}

export interface OfferResponse {
  offerList: Offer[];
}
