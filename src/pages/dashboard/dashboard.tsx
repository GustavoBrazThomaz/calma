import { Button, Col, Flex, Row, Space, Typography } from "antd";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { appointments } from "../../constants";

const { Title } = Typography;

export function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  return (
    <Flex vertical gap="middle">
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Title level={3}>Dashboard</Title>
        <Space>
          <Button onClick={() => navigate("/novo-paciente")}>
            Novo Paciente
          </Button>
          <Button onClick={() => setOpen(true)} variant="solid" color="blue">
            Nova Consulta
          </Button>
        </Space>
      </Flex>

      <Title level={4}>Consultas de Hoje</Title>

      <Row gutter={[16, 16]}>
        {appointments.map((item) => (
          <Col span={12}>
            <AppointmentCard
              firstName={item.firstName}
              lastName={item.lastName}
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

      <Row gutter={[16, 16]}>
        {appointments.map((item) => (
          <Col span={12}>
            <AppointmentCard
              firstName={item.firstName}
              lastName={item.lastName}
              isPaid={item.isPaid}
              phone={item.phone}
              scheduled={item.scheduled}
              price={item.price}
              status={item.status}
            />
          </Col>
        ))}
      </Row>

      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
