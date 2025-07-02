import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Empty,
  Flex,
  Form,
  Input,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { PatientCard } from "../../ui/cards/patient-card";
import { useNavigate, useSearchParams } from "react-router";
import type { SearchForm } from "../../types/search";
import { useGetPatients } from "../../services/patient/use-get-patients";
import { paginateItems } from "../../utils/paginate-items";
import { useEffect, useState } from "react";
import type { Patients } from "../../types/patient";
import { useQueryClient } from "@tanstack/react-query";
import { usePatient } from "../../services/patient/use-patient";

const { Title } = Typography;

export function Patients() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isSuccess, isStale } = useGetPatients();
  const [patients, setPatients] = useState<Patients[]>([]);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );
  const queryClient = useQueryClient();
  const { deletePatient } = usePatient();

  useEffect(() => {
    if (data) {
      paginateItems(data, 1, setPatients, 8);
      setPagination((prev) => {
        return {
          ...prev,
          count: data.length,
        };
      });
    }
  }, [isSuccess, data, isStale]);

  function handleDeletePatientById(id: string) {
    deletePatient.mutate(id);
    queryClient.refetchQueries({ queryKey: ["fetchPatients"] });

    if (data) {
      const newData = data.filter((item) => item.id !== id);
      paginateItems(newData, pagination.page, setPatients, 8);
      console.log(newData);
      setPagination((prev) => {
        return {
          ...prev,
          count: newData.length,
        };
      });
    }

    setPatients((prev) => prev.filter((item) => item.id !== id));
  }

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin tip="Loading..." size="large" />
      </Flex>
    );
  if (!data) return <Empty style={{ marginTop: "4rem" }} />;

  return (
    <Flex vertical gap="large">
      <Flex>
        <Title level={3}>Pacientes</Title>
      </Flex>

      <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
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
              <Input placeholder="Buscar por paciente..." />
            </Form.Item>
            <Form.Item>
              <Button variant="outlined" color="primary" htmlType="submit">
                <SearchOutlined /> Buscar
              </Button>
            </Form.Item>
          </Flex>
        </Form>

        <Button
          onClick={() => navigate("/novo-paciente")}
          variant="solid"
          color="blue"
        >
          Novo Paciente
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {patients.map((item) => (
          <Col span={6} key={item.id}>
            <PatientCard
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              birthDate={item.birthDate}
              phone={item.phone}
              lastAppointment={item.lastAppointment}
              onDelete={handleDeletePatientById}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        onChange={(pag) => {
          paginateItems(data, pag, setPatients, 8);
          setPagination((prev) => {
            return {
              ...prev,
              page: pag,
            };
          });
        }}
        defaultCurrent={1}
        total={pagination.count}
        defaultPageSize={8}
        align="center"
      />
    </Flex>
  );
}
