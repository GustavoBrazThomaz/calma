import { Button, Col, Flex, Row, Space, Typography } from "antd";
import { AppointmentCard } from "../../ui/cards/appointment-card";

const { Title } = Typography;

interface Props {
  firstName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  status: "done" | "cancel" | "scheduled";
}

const appointments: Props[] = [
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

export function Dashboard() {
  return (
    <Flex vertical gap="middle">
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Title level={3}>Dashboard</Title>
        <Space>
          <Button>Novo Paciente</Button>
          <Button variant="solid" color="blue">
            Nova Consulta
          </Button>
        </Space>
      </Flex>

      <Title level={4}>Consultas de Hoje</Title>

      <Row gutter={16}>
        {appointments.map((item) => (
          <Col span={6}>
            <AppointmentCard
              firstName={item.firstName}
              isPaid={item.isPaid}
              phone={item.phone}
              scheduled={item.scheduled}
              price={item.price}
              status={item.status}
            />
          </Col>
        ))}
      </Row>

      <Title level={4}>Próximas Consultas</Title>

      <Row gutter={16}>
        {appointments.map((item) => (
          <Col span={6}>
            <AppointmentCard
              firstName={item.firstName}
              isPaid={item.isPaid}
              phone={item.phone}
              scheduled={item.scheduled}
              price={item.price}
              status={item.status}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
