import { SearchOutlined } from "@ant-design/icons";
import { Flex, Button, Typography, Select, Input, Col, Row } from "antd";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment-form";
import { useState } from "react";
import { appointments } from "../../constants";
const { Title } = Typography;

export function Appointments() {
  const [open, setOpen] = useState<boolean>(false);
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

        <Button onClick={() => setOpen(true)} variant="solid" color="blue">
          Nova Consulta
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {appointments.map((item, index) => (
          <Col span={12} key={"col_" + index}>
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
      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
