import { Button, Col, Flex, Row } from "antd";
import { CaseEvolutionCard } from "../../../ui/cards/case-evolution-card";
import { useNavigate, useParams } from "react-router";

export function CaseEvolution() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Flex vertical gap="middle">
      <Flex justify="flex-end">
        <Button onClick={() => navigate(`/paciente/${id}/evolucao-de-caso`)}>
          Criar novo caso
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Col span={12} key={"col_" + index}>
            <CaseEvolutionCard title="Titulo da nota" />
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
