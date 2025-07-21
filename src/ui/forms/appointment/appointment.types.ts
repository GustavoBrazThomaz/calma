export interface AppointmentForm {
  patient: string;
  date: Date;
  scheduledTime: Date;
  price: string;
  isPaid: boolean;
  isDone: boolean;
}
