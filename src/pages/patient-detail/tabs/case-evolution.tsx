import { Button, Col, Flex, Row } from "antd";
import { CaseEvolutionCard } from "../../../ui/cards/case-evolution-card";
import { useNavigate, useParams } from "react-router";
import { useGetPatientCaseEvolution } from "../../../services/patient/use-get-patient-case-evolution";

export function CaseEvolution() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetPatientCaseEvolution(id as string);
  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <Flex vertical gap="middle">
      <Flex justify="flex-end">
        <Button onClick={() => navigate(`/paciente/${id}/evolucao-de-caso`)}>
          Criar novo caso
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {data.map((item, index) => (
          <Col span={12} key={"col_" + index}>
            <CaseEvolutionCard
              id={item.id}
              patientId={item.patientId}
              title={item.title}
              note={item.note}
            />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
