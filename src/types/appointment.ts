import type { PAYMENT_TYPE } from "../enum/payment_type";

export interface Appointment {
  id: string;
  patientId: string;
  firstName: string;
  lastName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  isDone: boolean;
  paymentType: PAYMENT_TYPE;
}
