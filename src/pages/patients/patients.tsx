import { Flex, Button, Typography, Input, Col, Row } from "antd";
import { PatientCard } from "../../ui/cards/patient-card";
import { SearchOutlined } from "@ant-design/icons";
const { Title } = Typography;

interface Props {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  lastAppointment: Date;
  phone: string;
}

const patients: Props[] = [
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

export function Patients() {
  return (
    <Flex vertical gap="large">
      <Flex>
        <Title level={3}>Pacientes</Title>
      </Flex>

      <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
        <Flex gap="middle" style={{ width: "100%" }}>
          <Input placeholder="Buscar Consulta..." />
          <Button variant="outlined" color="primary">
            <SearchOutlined /> Buscar
          </Button>
        </Flex>

        <Button variant="solid" color="blue">
          Novo Paciente
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {patients.map((item) => (
          <Col span={6}>
            <PatientCard
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              birthDate={item.birthDate}
              phone={item.phone}
              lastAppointment={item.lastAppointment}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
