import { Card, Flex, Space, Typography } from "antd";

const { Title, Text, Paragraph } = Typography;
export function ClinicalData() {
  const patientDetails = {
    contactInformation: {
      phone: "(11) 98765-4321",
      email: "maria.silva@email.com",
    },
    personalInformation: {
      religion: "Católica",
      maritalStatus: "Solteira",
      address: "Rua das Flores, 123 - São Paulo, SP",
      education: "Ensino Superior Completo",
      profession: "Professora",
      gender: "Feminino",
      sexuality: "Heterossexual",
    },
    clinicalObservations:
      "Paciente apresenta quadro de ansiedade moderada e dificuldades para dormir. Iniciou terapia em janeiro de 2025.",
    currentMedications:
      "Fluoxetina 20mg - 1x ao dia \nClonazepam 0,5mg - SOS para crises de ansiedade",
    diagnoses: "Transtorno de Ansiedade Generalizada (TAG)\nInsônia",
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
        <Title level={4}>Informações Pessoais</Title>
        <Flex gap="large">
          <Space direction="vertical">
            <Paragraph>
              Gênero: {patientDetails.personalInformation.gender}
            </Paragraph>
            <Paragraph>
              Estado Civil: {patientDetails.personalInformation.maritalStatus}
            </Paragraph>
          </Space>
          <Space direction="vertical">
            <Paragraph>
              Sexualidade: {patientDetails.personalInformation.sexuality}
            </Paragraph>
            <Paragraph>
              Religião: {patientDetails.personalInformation.religion}
            </Paragraph>
          </Space>
        </Flex>
      </Card>

      <Card>
        <Title level={4}>Informações Profissionais</Title>
        <Paragraph>
          Profissão: {patientDetails.personalInformation.profession}
        </Paragraph>
        <Paragraph>
          Escolaridade: {patientDetails.personalInformation.education}
        </Paragraph>
      </Card>

      <Card>
        <Title level={4}>Observações Clínicas</Title>
        <Paragraph>{patientDetails.clinicalObservations}</Paragraph>
      </Card>

      <Card>
        <Title level={4}>Medicamentos em Uso</Title>

        <Text style={{ whiteSpace: "pre-line" }}>
          {patientDetails.currentMedications}
        </Text>
      </Card>

      <Card>
        <Title level={4}>Laudos e Diagnósticos</Title>

        <Text style={{ whiteSpace: "pre-line" }}>
          {patientDetails.diagnoses}
        </Text>
      </Card>
    </Flex>
  );
}
