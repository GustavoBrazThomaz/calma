import { SearchOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Input, Row, Typography } from "antd";
import { patients } from "../../constants";
import { PatientCard } from "../../ui/cards/patient-card";
import { useNavigate } from "react-router";

const { Title } = Typography;

export function Patients() {
  const navigate = useNavigate();

  return (
    <Flex vertical gap="large">
      <Flex>
        <Title level={3}>Pacientes</Title>
      </Flex>

      <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
        <Flex gap="middle" style={{ width: "100%" }}>
          <Input placeholder="Buscar Consulta..." />
          <Button variant="outlined" color="primary">
            <SearchOutlined /> Buscar
          </Button>
        </Flex>

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
    </Flex>
  );
}
