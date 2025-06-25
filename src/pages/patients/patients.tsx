import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Pagination,
  Row,
  Typography,
} from "antd";
import { PatientCard } from "../../ui/cards/patient-card";
import { useNavigate, useSearchParams } from "react-router";
import type { SearchForm } from "../../types/search";
import { useGetPatients } from "../../services/patient/use-get-patients";
import { paginateItems } from "../../utils/paginate-items";
import { useEffect, useState } from "react";
import type { Patients } from "../../types/patient";

const { Title } = Typography;

export function Patients() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isSuccess } = useGetPatients();
  const [patients, setPatients] = useState<Patients[]>([]);

  useEffect(() => {
    if (data) paginateItems(data, 1, setPatients, 8);
  }, [isSuccess, data]);

  if (isLoading || !data) return <p>Loading...</p>;

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
          <Col span={6}>
            <PatientCard
              id={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              birthDate={item.birthDate}
              phone={item.phone}
              lastAppointment={item.lastAppointment}
            />
          </Col>
        ))}
      </Row>
      <Pagination
        onChange={(pag) => paginateItems(data, pag, setPatients, 8)}
        defaultCurrent={1}
        total={data.length}
        defaultPageSize={8}
        align="center"
      />
    </Flex>
  );
}
