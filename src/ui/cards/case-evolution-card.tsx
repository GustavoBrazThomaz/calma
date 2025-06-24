import { EditOutlined } from "@ant-design/icons";
import { Card, Button, Tooltip } from "antd";
import { MarkdownPreview } from "../../pages/case-evolution-form/markdown/markdown-preview";
import { markdownInitialValue } from "../../constants";

interface Props {
  title: string;
  // text: string;
}

const limitedMarkdown =
  markdownInitialValue.slice(0, 155) +
  (markdownInitialValue.length > 155 ? "..." : "");

export function CaseEvolutionCard({ title }: Props) {
  return (
    <Card title={title}>
      <Tooltip title="Editar">
        <Button
          style={{ position: "absolute", top: "0.6rem", right: "1rem" }}
          shape="circle"
          type="text"
          icon={<EditOutlined />}
        />
      </Tooltip>
      <MarkdownPreview markdown={limitedMarkdown} />
    </Card>
  );
}
