import { Card, Flex, Space, Typography } from "antd";
import { PAYMENT_TYPE } from "../../../enum/payment_type";
import type { PatientDetails } from "../../../types/patient-detail";

const { Title, Text, Paragraph } = Typography;
export function ClinicalData({ patient }: { patient: PatientDetails }) {
  return (
    <Flex vertical gap="middle">
      <Card>
        <Title level={4}>Informações de Contato</Title>
        <Paragraph>Telefone: {patient.contactInformation.phone}</Paragraph>
        <Paragraph>Email: {patient.contactInformation.email}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Informações Pessoais</Title>
        <Flex gap="large">
          <Space direction="vertical">
            <Paragraph>Gênero: {patient.personalInformation.gender}</Paragraph>
            <Paragraph>
              Estado Civil: {patient.personalInformation.maritalStatus}
            </Paragraph>
          </Space>
          <Space direction="vertical">
            <Paragraph>
              Sexualidade: {patient.personalInformation.sexuality}
            </Paragraph>
            <Paragraph>
              Religião: {patient.personalInformation.religion}
            </Paragraph>
          </Space>
        </Flex>
      </Card>

      <Card>
        <Title level={4}>Informações Profissionais</Title>
        <Paragraph>
          Profissão: {patient.personalInformation.profession}
        </Paragraph>
        <Paragraph>
          Escolaridade: {patient.personalInformation.education}
        </Paragraph>
      </Card>

      <Card>
        <Title level={4}>Informações sobre o pagamento</Title>
        <Paragraph>
          Tipo de pagamento:{" "}
          {patient.paymentInfo.paymentType === PAYMENT_TYPE.MONTHLY
            ? "Mensal"
            : "A cada consulta"}
        </Paragraph>
        <Paragraph>Valor: {patient.paymentInfo.price}</Paragraph>
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

        <Text style={{ whiteSpace: "pre-line" }}>
          {patient.diagnoses}
        </Text>
      </Card>
    </Flex>
  );
}
