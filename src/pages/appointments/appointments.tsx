import {
  Button,
  Col,
  Empty,
  Flex,
  Input,
  Pagination,
  Row,
  Select,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { useGetAppointment } from "../../services/appointment/use-get-appointment";
import { useSearchAppointment } from "../../services/appointment/use-search-appointment";
import type { Appointment } from "../../types/appointment";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { paginateItems } from "../../utils/paginate-items";
import { AppointmentLoading } from "./appointment.loading";

const { Title } = Typography;

export function Appointments() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchAppointment = useSearchAppointment(search);
  const hasSearch = !!search;
  const currentData = hasSearch ? searchAppointment.data : data;
  const isEmpty = !currentData || currentData.length === 0;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (currentData) {
      paginateItems(currentData, 1, setAppointments);
      setPagination((prev) => ({
        ...prev,
        count: currentData.length,
      }));
    }
  }, [currentData]);

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
    <Flex vertical gap="large">
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Title level={3}>Consultas</Title>
      </Flex>

      <Flex gap="large">
        <Input.Search
          placeholder="Buscar consulta pelo nome do paciente"
          allowClear
          onSearch={(search: string) => setSearchParams({ search: search })}
          onClear={() => {
            setSearchParams({});
            refetch();
          }}
          defaultValue={search}
        />

        <Flex gap="middle" style={{ width: "30%" }}>
          <Select
            defaultValue="Todas as consultas"
            style={{ width: "50%", minWidth: "190px" }}
            onChange={handleChange}
            options={[
              { value: "all", label: "Todas as consultas" },
              { value: "scheduled", label: "Agendados" },
              { value: "done", label: "Realizada" },
              { value: "cancel", label: "Cancelada" },
            ]}
          />

          <Select
            defaultValue="Todos os pagamentos"
            style={{ width: "50%", minWidth: "190px" }}
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
      {isLoading || searchAppointment.isLoading ? (
        <AppointmentLoading />
      ) : isEmpty ? (
        <Empty />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {appointments.map((item) => (
              <Col span={12} key={item.id}>
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
                  onDelete={handleDelete}
                />
              </Col>
            ))}
          </Row>
          <Pagination
            onChange={(pag) => {
              paginateItems(currentData, pag, setAppointments);
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
