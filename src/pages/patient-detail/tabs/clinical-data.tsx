import { Card, Flex, Space, Typography } from "antd";
import { PAYMENT_TYPE } from "../../../enum/payment_type";
import type { PatientDetails } from "../../../types/patient-detail";

const { Title, Text, Paragraph } = Typography;
export function ClinicalData({ patient }: { patient: PatientDetails }) {
  return (
    <Flex vertical gap="middle">
      <Card>
        <Title level={4}>Informações de Contato</Title>
        <Paragraph>Telefone: {patient.phone}</Paragraph>
        <Paragraph>Email: {patient.email}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Informações Pessoais</Title>
        <Flex gap="large">
          <Space direction="vertical">
            <Paragraph>Gênero: {patient.gender}</Paragraph>
            <Paragraph>Estado Civil: {patient.maritalStatus}</Paragraph>
          </Space>
          <Space direction="vertical">
            <Paragraph>Sexualidade: {patient.sexuality}</Paragraph>
            <Paragraph>Religião: {patient.religion}</Paragraph>
          </Space>
        </Flex>
      </Card>

      <Card>
        <Title level={4}>Informações Profissionais</Title>
        <Paragraph>Profissão: {patient.profession}</Paragraph>
        <Paragraph>Escolaridade: {patient.education}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Informações sobre o pagamento</Title>
        <Paragraph>
          Tipo de pagamento:{" "}
          {patient.paymentType === PAYMENT_TYPE.MONTHLY
            ? "Mensal"
            : "A cada consulta"}
        </Paragraph>
        <Paragraph>Valor: {patient.price}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Observações Clínicas</Title>
        <Paragraph>{patient.clinicalObservations}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Medicamentos em Uso</Title>

        <Text style={{ whiteSpace: "pre-line" }}>
          {patient.currentMedications}
        </Text>
      </Card>

      <Card>
        <Title level={4}>Laudos e Diagnósticos</Title>

        <Text style={{ whiteSpace: "pre-line" }}>{patient.diagnoses}</Text>
      </Card>
    </Flex>
  );
}
