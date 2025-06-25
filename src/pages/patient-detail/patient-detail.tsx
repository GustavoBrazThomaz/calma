import { Avatar, Button, Card, Flex, Space, Tabs, Typography } from "antd";
import { CaseEvolution } from "./tabs/case-evolution";
import { PatientAppointments } from "./tabs/patient-appointments";
import { ClinicalData } from "./tabs/clinical-data";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { useGetPatientDetail } from "../../services/patient/use-get-patient-detail";
import dayjs from "dayjs";
import { getAgeFromBirthDate } from "../../utils/get-age";

const { Title, Text } = Typography;
export function PatientDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { data, isLoading } = useGetPatientDetail(id as string);
  const navigate = useNavigate();

  if (isLoading || !data) return <p>Loading...</p>;

  const tabs = [
    {
      label: "Dados clínicos",
      key: "1",
      children: <ClinicalData patient={data} />,
    },
    {
      label: "Histórico de consultas",
      key: "2",
      children: <PatientAppointments />,
    },
    {
      label: "Evolução de caso",
      key: "3",
      children: <CaseEvolution />,
    },
  ];

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between">
        <Title level={3}>Detalhes do Paciente</Title>
        <Button onClick={() => navigate(`/editar-paciente/${id}`)}>
          Editar
        </Button>
      </Flex>
      <Card>
        <Flex gap="middle" align="center">
          <Avatar size={42}>MS</Avatar>
          <Space.Compact direction="vertical">
            <Title style={{ marginBottom: 0 }} level={4}>
              {data.firstName} {data.lastName}
            </Title>
            <Text>
              {getAgeFromBirthDate(data.birthDate)} anos -{" "}
              {dayjs(data.birthDate).format("DD/MM/YYYY")}
            </Text>
          </Space.Compact>
        </Flex>
      </Card>
      <Tabs
        onChange={(tab) => {
          setSearchParams({ tab });
        }}
        defaultActiveKey={searchParams.get("tab") ?? "1"}
        tabPosition="top"
        items={tabs}
      />
    </Flex>
  );
}
