import { Card } from "antd";
import { useNavigate } from "react-router";
import { markdownInitialValue } from "../../constants";
import { MarkdownPreview } from "../../pages/case-evolution-form/markdown/markdown-preview";

interface Props {
  title: string;
}

const limitedMarkdown =
  markdownInitialValue.slice(0, 155) +
  (markdownInitialValue.length > 155 ? "..." : "");

export function CaseEvolutionCard({ title }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      title={title}
      onClick={() => navigate(`/paciente/1/evolucao-de-caso/1`)}
      style={{ cursor: "pointer" }}
      hoverable
    >
      <MarkdownPreview markdown={limitedMarkdown} />
    </Card>
  );
}
