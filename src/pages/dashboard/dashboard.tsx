import {
  Button,
  Col,
  Empty,
  Flex,
  Pagination,
  Row,
  Skeleton,
  Space,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useGetAppointment } from "../../app/api/hooks/appointment/use-get-appointment";
import { useGetTodayAppointment } from "../../app/api/hooks/appointment/use-get-today-appointment";
import { AppointmentCard } from "../../ui/components/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { AppointmentInDashboardLoading } from "./appointment-in-dashboard.loading";

const { Title } = Typography;

export function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAppointment({
    page,
    limit: 8,
  });

  const todayAppointment = useGetTodayAppointment();
  const navigate = useNavigate();

  const isEmpty = !data || data.appointments.length === 0;

  const appointments = useMemo(() => {
    if (!data || !data.appointments) {
      return [];
    }
    return data.appointments;
  }, [data]);

  return (
    <Flex vertical gap="middle">
      <Flex
        align="center"
        wrap
        justify="space-between"
        style={{ width: "100%" }}
      >
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

      {Array.isArray(todayAppointment.data) &&
        todayAppointment.data.length > 0 && (
          <Title level={4}>Consultas de Hoje</Title>
        )}

      {todayAppointment.isLoading ? (
        <Skeleton.Node style={{ width: 650, height: 140 }} />
      ) : !todayAppointment.data ? (
        <Empty />
      ) : (
        <Row gutter={[16, 16]}>
          {todayAppointment.data.map((item) => (
            <Col span={16} key={item.id} lg={12} className="appointment-col">
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
                isDone={item.isDone}
                hasDelete={false}
                isHome
              />
            </Col>
          ))}
        </Row>
      )}

      <Title level={4}>Próximas Consultas</Title>

      {isLoading ? (
        <AppointmentInDashboardLoading />
      ) : isEmpty ? (
        <Empty />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {appointments.map((item) => (
              <Col span={16} key={item.id} lg={12} className="appointment-col">
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
                  isDone={item.isDone}
                  isHome
                />
              </Col>
            ))}
          </Row>

          <Pagination
            onChange={(pag) => {
              setPage(pag);
            }}
            defaultCurrent={1}
            total={data.total}
            defaultPageSize={6}
            align="center"
          />
        </>
      )}

      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
