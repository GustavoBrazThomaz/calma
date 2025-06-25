import type { PAYMENT_TYPE } from "../enum/payment_type";

export interface PatientDetails {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string
  contactInformation: {
    phone: string;
    email: string;
  };
  personalInformation: {
    religion: string;
    maritalStatus: string;
    address: string;
    education: string;
    profession: string;
    gender: string;
    sexuality: string;
  };
  paymentInfo: {
    price: string;
    paymentType: PAYMENT_TYPE;
  };
  clinicalObservations: string;
  currentMedications: string;
  diagnoses: string;
}
