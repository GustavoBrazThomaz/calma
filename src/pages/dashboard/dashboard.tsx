import { Button, Col, Flex, Pagination, Row, Space, Typography } from "antd";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetAppointment } from "../../services/appointment/use-get-appointment";
import { useGetTodayAppointment } from "../../services/appointment/use-get-today-appointment";
import type { Appointment } from "../../types/appointment";
import { paginateItems } from "../../utils/paginate-items";

const { Title } = Typography;

export function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isSuccess } = useGetAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const todayAppointment = useGetTodayAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) paginateItems(data, 1, setAppointments);
  }, [isSuccess, data]);

  if (isLoading || !data) return <p>Loading...</p>;
  if (!todayAppointment.data || todayAppointment.isLoading)
    return <p>Loading...</p>;

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
        {todayAppointment.data.map((item) => (
          <Col span={12}>
            <AppointmentCard
              id={item.id}
              patientId={item.patientId}
              paymentType={item.paymentType}
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
              id={item.id}
              patientId={item.patientId}
              paymentType={item.paymentType}
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
      <Pagination
        onChange={(pag) => paginateItems(data, pag, setAppointments)}
        defaultCurrent={1}
        total={data.length}
        defaultPageSize={6}
        align="center"
      />
      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
