import { Card, Flex, Typography } from "antd";

const { Title, Paragraph } = Typography;
export function ClinicalData() {
  const patientDetails = {
    contactInformation: {
      phone: "(11) 98765-4321",
      email: "maria.silva@email.com",
    },
    clinicalObservations:
      "Paciente apresenta quadro de ansiedade moderada e dificuldades para dormir. Iniciou terapia em janeiro de 2025.",
    currentMedications: [
      "Fluoxetina 20mg - 1x ao dia",
      "Clonazepam 0,5mg - SOS para crises de ansiedade",
    ],
    diagnoses: ["Transtorno de Ansiedade Generalizada (TAG)", "Insônia"],
  };

  return (
    <Flex vertical gap="middle">
      <Card>
        <Title level={4}>Informações de Contato</Title>
        <Paragraph>
          Telefone: {patientDetails.contactInformation.phone}
        </Paragraph>
        <Paragraph>Email: {patientDetails.contactInformation.email}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Observações Clínicas</Title>
        <Paragraph>{patientDetails.clinicalObservations}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Medicamentos em Uso</Title>
        {patientDetails.currentMedications.map((item) => (
          <Paragraph>{item}</Paragraph>
        ))}
      </Card>

      <Card>
        <Title level={4}>Laudos e Diagnósticos</Title>
        {patientDetails.diagnoses.map((item) => (
          <Paragraph>{item}</Paragraph>
        ))}
      </Card>
    </Flex>
  );
}
