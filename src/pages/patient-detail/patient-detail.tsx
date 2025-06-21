import { Avatar, Button, Card, Flex, Space, Tabs, Typography } from "antd";
import { CaseEvolution } from "./tabs/case-evolution";
import { PatientAppointments } from "./tabs/patient-appointments";
import { ClinicalData } from "./tabs/clinical-data";

const { Title, Text } = Typography;
export function PatientDetail() {
  const tabs = [
    {
      label: "Dados clínicos",
      key: "1",
      children: <ClinicalData />,
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
        <Button>Editar</Button>
      </Flex>
      <Card>
        <Flex gap="middle" align="center">
          <Avatar size={42}>MS</Avatar>
          <Space.Compact direction="vertical">
            <Title style={{ marginBottom: 0 }} level={4}>
              Maria Silva
            </Title>
            <Text>35 anos - 15/05/1990</Text>
          </Space.Compact>
        </Flex>
      </Card>
      <Tabs defaultActiveKey="1" tabPosition="top" items={tabs} />
    </Flex>
  );
}
