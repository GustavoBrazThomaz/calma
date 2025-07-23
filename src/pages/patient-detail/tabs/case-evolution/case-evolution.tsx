import { Button, Col, Empty, Flex, Grid, Row } from "antd";

import { useNavigate, useParams } from "react-router";

import { CaseEvolutionSkeleton } from "./case-evolution.loading";
import { useGetPatientCaseEvolution } from "../../../../app/api/hooks/patient/use-get-patient-case-evolution";
import { CaseEvolutionCard } from "../../../../ui/components/case-evolution-card";

const { useBreakpoint } = Grid;

export function CaseEvolution() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetPatientCaseEvolution(id as string);
  const { lg } = useBreakpoint();

  if (isLoading) return <CaseEvolutionSkeleton />;

  return (
    <Flex vertical gap="middle">
      <Flex justify="flex-end">
        <Button onClick={() => navigate(`/paciente/${id}/evolucao-de-caso`)}>
          Criar novo caso
        </Button>
      </Flex>

      {!data || data.length === 0 ? (
        <Empty style={{ marginTop: "4rem" }} />
      ) : (
        <Row gutter={[16, 16]}>
          {data.map((item, index) => (
            <Col
              span={16}
              lg={12}
              key={"col_" + index}
              style={{ minWidth: !lg ? "100%" : "" }}
            >
              <CaseEvolutionCard
                id={item.id}
                patientId={item.patientId}
                title={item.title}
                note={item.note}
              />
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
}
