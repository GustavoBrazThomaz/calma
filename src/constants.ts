export interface Appointments {
  firstName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  status: "done" | "cancel" | "scheduled";
}

export const appointments: Appointments[] = [
  {
    firstName: "Ana",
    phone: "(11) 91234-5678",
    scheduled: new Date("2025-06-18T10:00:00"),
    price: "R$ 250,00",
    isPaid: true,
    status: "done",
  },
  {
    firstName: "Bruno",
    phone: "(21) 99876-5432",
    scheduled: new Date("2025-06-19T14:30:00"),
    price: "R$ 300,00",
    isPaid: false,
    status: "scheduled",
  },
  {
    firstName: "Carla",
    phone: "(31) 98765-4321",
    scheduled: new Date("2025-06-20T09:00:00"),
    price: "R$ 200,00",
    isPaid: true,
    status: "cancel",
  },
  {
    firstName: "Diego",
    phone: "(41) 97654-3210",
    scheduled: new Date("2025-06-21T16:15:00"),
    price: "R$ 280,00",
    isPaid: false,
    status: "scheduled",
  },
];

export interface Patients {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  lastAppointment: Date;
  phone: string;
}

export const patients: Patients[] = [
  {
    id: "1",
    firstName: "Ana",
    lastName: "Silva",
    birthDate: new Date("1990-03-15"),
    lastAppointment: new Date("2025-06-01T10:00:00"),
    phone: "(11) 91234-5678",
  },
  {
    id: "2",
    firstName: "Bruno",
    lastName: "Ferreira",
    birthDate: new Date("1985-07-22"),
    lastAppointment: new Date("2025-05-28T14:30:00"),
    phone: "(21) 99876-5432",
  },
  {
    id: "3",
    firstName: "Carla",
    lastName: "Menezes",
    birthDate: new Date("1992-11-05"),
    lastAppointment: new Date("2025-06-10T09:00:00"),
    phone: "(31) 98765-4321",
  },
  {
    id: "4",
    firstName: "Diego",
    lastName: "Santos",
    birthDate: new Date("1997-01-30"),
    lastAppointment: new Date("2025-06-15T16:15:00"),
    phone: "(41) 97654-3210",
  },
  {
    id: "5",
    firstName: "Eduarda",
    lastName: "Costa",
    birthDate: new Date("2000-08-18"),
    lastAppointment: new Date("2025-06-12T11:45:00"),
    phone: "(85) 98877-6655",
  },
  {
    id: "6",
    firstName: "Felipe",
    lastName: "Lima",
    birthDate: new Date("1988-12-02"),
    lastAppointment: new Date("2025-06-07T13:00:00"),
    phone: "(51) 99774-3322",
  },
];
