import dayjs from "dayjs";

export interface Appointments {
  firstName: string;
  lastName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  status: "done" | "cancel" | "scheduled";
}

export const appointments: Appointments[] = [
  {
    firstName: "Ana",
    lastName: "Silva",
    phone: "(11) 91234-5678",
    scheduled: new Date("2025-06-18T10:00:00"),
    price: "R$ 250,00",
    isPaid: true,
    status: "done",
  },
  {
    firstName: "Bruno",
    lastName: "Ferreira",
    phone: "(21) 99876-5432",
    scheduled: new Date("2025-06-19T14:30:00"),
    price: "R$ 300,00",
    isPaid: false,
    status: "scheduled",
  },
  {
    firstName: "Carla",
    lastName: "Ferreira",
    phone: "(31) 98765-4321",
    scheduled: new Date("2025-06-20T09:00:00"),
    price: "R$ 200,00",
    isPaid: true,
    status: "cancel",
  },
  {
    firstName: "Diego",
    lastName: "Lima",
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

export const markdownInitialValue = `## Sessão ${dayjs(new Date()).format(
  "DD/MM/YYYY"
)}

### Observações da Sessão
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam nunc sapien, vitae aliquet aliquet vel. Duis pellentesque mauris eget tellus pretium volutpat. Ut eu ligula fringilla, commodo ipsum luctus, dignissim sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aenean blandit eget diam vitae placerat. Fusce placerat pharetra placerat. Proin sodales semper nisi, ut iaculis tellus placerat eu. Maecenas commodo nec erat nec gravida. Mauris nibh felis, tristique sit amet tellus eu, aliquet sagittis metus. Aenean risus tellus, malesuada non turpis pretium, tincidunt venenatis arcu. Ut iaculis semper eros, et hendrerit libero mattis nec. Sed et posuere justo. Quisque mollis bibendum diam vel consequat. Vivamus gravida quis velit quis dapibus. Ut finibus nibh eu nisl vestibulum, nec hendrerit diam feugiat. Fusce laoreet ullamcorper quam consectetur efficitur.
Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc varius fringilla mauris luctus aliquet. Duis ut sagittis mauris, quis imperdiet nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla facilisi. Proin ac aliquam sapien. Ut vitae dui sit amet nisl volutpat varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus eu velit sit amet dolor maximus suscipit rhoncus ac lorem. Fusce consequat mauris quis est pharetra, egestas cursus ex congue. Morbi in scelerisque orci, nec porttitor dolor.
___
### Pontos Principais
- Lorem ipsum dolor
- et malesuada fames
- ante ipsum primis `;
