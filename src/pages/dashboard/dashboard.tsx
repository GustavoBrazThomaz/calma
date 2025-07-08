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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useGetAppointment } from "../../services/appointment/use-get-appointment";
import { useGetTodayAppointment } from "../../services/appointment/use-get-today-appointment";
import type { Appointment } from "../../types/appointment";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { paginateItems } from "../../utils/paginate-items";
import { AppointmentInDashboardLoading } from "./appointment-in-dashboard.loading";

const { Title } = Typography;

export function Dashboard() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isSuccess, isStale } = useGetAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );
  const todayAppointment = useGetTodayAppointment();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      paginateItems(data, 1, setAppointments);
      setPagination((prev) => {
        return {
          ...prev,
          count: data.length,
        };
      });
    }
  }, [isSuccess, data, isStale]);

  function handleDelete(id: string) {
    if (data) {
      const newData = data.filter((item) => item.id !== id);
      paginateItems(newData, pagination.page, setAppointments);
      setPagination((prev) => {
        return {
          ...prev,
          count: newData.length,
        };
      });
    }

    setAppointments((prev) => prev.filter((item) => item.id !== id));
  }

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

      <Title level={4}>Consultas de Hoje</Title>

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
                onDelete={handleDelete}
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
      ) : !data ? (
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
                  onDelete={handleDelete}
                  isHome
                />
              </Col>
            ))}
          </Row>

          <Pagination
            onChange={(pag) => {
              paginateItems(data, pag, setAppointments);
              setPagination((prev) => {
                return {
                  ...prev,
                  page: pag,
                };
              });
            }}
            defaultCurrent={1}
            total={pagination.count}
            defaultPageSize={6}
            align="center"
          />
        </>
      )}

      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
