import { Card } from "antd";
import { useNavigate } from "react-router";
import { MarkdownPreview } from "../../pages/case-evolution-form/markdown/markdown-preview";
import type { CaseEvolution } from "../../types/case-evolution";

export function CaseEvolutionCard({
  title,
  id,
  note,
  patientId,
}: CaseEvolution) {
  const navigate = useNavigate();

  const limitedMarkdown = note.slice(0, 155) + (note.length > 155 ? "..." : "");

  return (
    <Card
      title={title}
      onClick={() => navigate(`/paciente/${patientId}/evolucao-de-caso/${id}`)}
      style={{ cursor: "pointer" }}
      hoverable
    >
      <MarkdownPreview markdown={limitedMarkdown} />
    </Card>
  );
}
