import { Form, Input } from "antd";
import type { CaseEvolutionForm } from "../case-evolution.types";
const { TextArea } = Input;

export function MarkdownEditor({
  setMarkdown,
}: {
  setMarkdown: React.Dispatch<string>;
}) {
  return (
    <Form.Item<CaseEvolutionForm>
      label={null}
      rules={[{ required: true }]}
      name="note"
    >
      <TextArea
        onChange={(event) => setMarkdown(event.target.value)}
        rows={16}
        style={{ resize: "none" }}
      />
    </Form.Item>
  );
}
