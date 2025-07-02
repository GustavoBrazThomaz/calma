import { SearchOutlined } from "@ant-design/icons";
import {
  Flex,
  Button,
  Typography,
  Select,
  Input,
  Col,
  Row,
  Form,
  Pagination,
  Empty,
} from "antd";
import { useEffect, useState } from "react";
import { AppointmentCard } from "../../ui/cards/appointment-card";
import { AppointmentForm } from "../../ui/forms/appointment/appointment-form";
import { useSearchParams } from "react-router";
import type { SearchForm } from "../../types/search";
import { useGetAppointment } from "../../services/appointment/use-get-appointment";
import type { Appointment } from "../../types/appointment";
import { paginateItems } from "../../utils/paginate-items";
import { AppointmentLoading } from "./appointment.loading";

const { Title } = Typography;

export function Appointments() {
  const [open, setOpen] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isSuccess } = useGetAppointment();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (data) paginateItems(data, 1, setAppointments);
  }, [isSuccess, data]);

  return (
    <Flex vertical gap="large">
      <Flex align="center" justify="space-between" style={{ width: "100%" }}>
        <Title level={3}>Consultas</Title>
      </Flex>

      <Flex gap="large">
        <Form<SearchForm>
          onFinish={(form: SearchForm) => {
            if (form.search === undefined) return;
            setSearchParams({ search: form.search });
          }}
          autoComplete="off"
          style={{ width: "100%" }}
          initialValues={{
            search: searchParams.get("search") ?? "",
          }}
        >
          <Flex gap="middle" style={{ width: "100%" }}>
            <Form.Item<SearchForm>
              name="search"
              label={null}
              style={{ width: "100%" }}
              rules={[{ required: true, message: "" }]}
            >
              <Input placeholder="Buscar Consulta..." />
            </Form.Item>
            <Form.Item>
              <Button variant="outlined" color="primary" htmlType="submit">
                <SearchOutlined /> Buscar
              </Button>
            </Form.Item>
          </Flex>
        </Form>

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
      {isLoading ? (
        <AppointmentLoading />
      ) : !data ? (
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
        </>
      )}

      <AppointmentForm open={open} setOpen={setOpen} />
    </Flex>
  );
}
