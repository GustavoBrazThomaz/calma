import { Card, Descriptions, Flex, Typography } from "antd";
import { parsePrice } from "../../../app/utils/parse-price";
import { PAYMENT_TYPE } from "../../../domain/enum/payment_type";
import type { PatientDetails } from "../../../domain/types";

const { Title, Text, Paragraph } = Typography;
export function ClinicalData({ patient }: { patient: PatientDetails }) {
  return (
    <Flex vertical gap="middle">
      <Card>
        <Descriptions title="Informações de Contato" column={1}>
          <Descriptions.Item label="Telefone">
            {patient.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{patient.email}</Descriptions.Item>
        </Descriptions>
      </Card>

      <Card>
        <Descriptions title="Informações Pessoais" column={2}>
          <Descriptions.Item style={{ width: "20%" }} label="Gênero">
            {patient.gender}
          </Descriptions.Item>
          {patient.maritalStatus && (
            <Descriptions.Item label="Estado Civil">
              {patient.maritalStatus}
            </Descriptions.Item>
          )}

          {patient.sexuality && (
            <Descriptions.Item label="Sexualidade">
              {patient.sexuality}
            </Descriptions.Item>
          )}

          {patient.religion && (
            <Descriptions.Item label="Religião">
              {patient.religion}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
      {(patient.profession || patient.education) && (
        <Card>
          <Descriptions title="Informações Profissionais" column={1}>
            {patient.profession && (
              <Descriptions.Item label="Profissão">
                {patient.profession}
              </Descriptions.Item>
            )}

            {patient.education && (
              <Descriptions.Item label="Escolaridade">
                {patient.education}
              </Descriptions.Item>
            )}
          </Descriptions>
        </Card>
      )}

      <Card>
        <Descriptions title="Informações sobre o pagamento" column={1}>
          <Descriptions.Item label="Tipo de pagamento">
            {patient.paymentType === PAYMENT_TYPE.MONTHLY
              ? "Mensal"
              : "A cada consulta"}
          </Descriptions.Item>
          <Descriptions.Item label="Valor">
            {parsePrice(patient.price)}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {patient.clinicalObservations && (
        <Card>
          <Title level={5} style={{marginBottom: "1rem"}}>Observações Clínicas</Title>
          <Paragraph>{patient.clinicalObservations}</Paragraph>
        </Card>
      )}

      {patient.currentMedications && (
        <Card>
          <Title level={5} style={{marginBottom: "1rem"}}>Medicamentos em Uso</Title>
          <Text style={{ whiteSpace: "pre-line" }}>
            {patient.currentMedications}
          </Text>
        </Card>
      )}

      {patient.diagnoses && (
        <Card>
          <Title level={5} style={{marginBottom: "1rem"}}>Laudos e Diagnósticos</Title>
          <Text style={{ whiteSpace: "pre-line" }}>{patient.diagnoses}</Text>
        </Card>
      )}
    </Flex>
  );
}
