import {
  Avatar,
  Button,
  Card,
  Empty,
  Flex,
  Space,
  Spin,
  Tabs,
  Typography,
} from "antd";
import { CaseEvolution } from "./tabs/case-evolution/case-evolution";
import { PatientAppointments } from "./tabs/patient-appointment/patient-appointments";
import { ClinicalData } from "./tabs/clinical-data";
import { useNavigate, useParams, useSearchParams } from "react-router";
import dayjs from "dayjs";
import { getAgeFromBirthDate } from "../../app/utils/get-age";
import { useGetPatientDetail } from "../../app/api/hooks/patient/use-get-patient-detail";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
export function PatientDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { id } = useParams();
  const { data, isLoading } = useGetPatientDetail(
    id as string,
    id ? true : false
  );
  const navigate = useNavigate();

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin size="large" />
      </Flex>
    );
  if (!data) return <Empty style={{ marginTop: "4rem" }} />;

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
        <Flex gap="small">
          <Button
            onClick={() => navigate("/pacientes")}
            color="default"
            variant="text"
            icon={<ArrowLeftOutlined />}
          />
          <Title level={3}>Detalhes do Paciente</Title>
        </Flex>
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
              {getAgeFromBirthDate(dayjs(data.birthDate).toDate())} anos -{" "}
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
