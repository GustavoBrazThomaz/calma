import { SearchOutlined } from "@ant-design/icons";
import { Flex, Button, Typography, Select, Input, Col, Row } from "antd";
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

export function Appointments() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Flex vertical gap="large">
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Title level={3}>Consultas</Title>
      </Flex>

      <Flex gap="large">
        <Flex gap="middle" style={{ width: "100%" }}>
          <Input placeholder="Buscar Consulta..." />
          <Button variant="outlined" color="primary">
            <SearchOutlined /> Buscar
          </Button>
        </Flex>

        <Flex gap="middle" style={{ width: "30%" }}>
          <Select
            defaultValue="lucy"
            style={{ width: "50%" }}
            onChange={handleChange}
            options={[
              { value: "all", label: "Todas as consultas" },
              { value: "scheduled", label: "Agendados" },
              { value: "done", label: "Realizada" },
              { value: "cancel", label: "Cancelada" },
            ]}
          />

          <Select
            defaultValue="lucy"
            style={{ width: "50%" }}
            onChange={handleChange}
            options={[
              { value: "all", label: "Todos os pagamentos" },
              { value: "paid", label: "Pagos" },
              { value: "pendents", label: "Pendentes" },
            ]}
          />
        </Flex>

        <Button variant="solid" color="blue">
          Nova Consulta
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {appointments.map((item) => (
          <Col span={12}>
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
