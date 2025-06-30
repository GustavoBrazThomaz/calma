import type { PAYMENT_TYPE } from "../enum/payment_type";

export interface PatientDetails {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  phone: string;
  email: string;
  religion: string;
  maritalStatus: string;
  address: string;
  education: string;
  profession: string;
  gender: string;
  sexuality: string;
  price: string;
  paymentType: PAYMENT_TYPE;
  clinicalObservations: string;
  currentMedications: string;
  diagnoses: string;
}
