import { Button, Card, Flex, Form, Input, Tabs, Typography } from "antd";
import type { CaseEvolutionForm } from "./case-evolution.types";
import { MarkdownEditor } from "./markdown/markdown-editor";
import { MarkdownPreview } from "./markdown/markdown-preview";
import { useState } from "react";
import { markdownInitialValue } from "../../constants";
import { useParams } from "react-router";

const { Title, Paragraph } = Typography;

export function CaseEvolutionForm() {
  const [markdown, setMarkdown] = useState<string>(markdownInitialValue);
  const { caseId } = useParams();

  const tabs = [
    {
      label: "Editor",
      key: "1",
      children: <MarkdownEditor setMarkdown={setMarkdown} />,
    },
    {
      label: "Preview",
      key: "2",
      children: <MarkdownPreview markdown={markdown} />,
    },
  ];

  function handleSubmit(e: CaseEvolutionForm) {
    console.log(e);
  }

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between">
        <Title level={3}>
          {caseId ? "Evolução de caso" : "Nova Evolução de Caso"}
        </Title>
        <Button>Salvar</Button>
      </Flex>
      <Form<CaseEvolutionForm>
        onFinish={handleSubmit}
        onFinishFailed={(e) => console.log(e)}
        autoComplete="off"
        layout="vertical"
        initialValues={{
          note: markdown,
        }}
      >
        <Flex vertical gap="middle">
          <Card>
            <Title level={4}>Informações da Evolução</Title>
            <Form.Item<CaseEvolutionForm>
              label="Título"
              rules={[{ required: true }]}
              name="title"
            >
              <Input placeholder="Ex. Progresso com técnicas de respiração" />
            </Form.Item>
          </Card>

          <Card>
            <Title level={4}>Conteúdo da Evolução</Title>
            <Paragraph>Conteúdo (Markdown)</Paragraph>
            <Tabs
              defaultActiveKey={caseId ? "2" : "1"}
              tabPosition="top"
              items={tabs}
            />
          </Card>
          <Flex gap="large" style={{ color: "#868687" }}>
            <div>
              <p>Dicas de Markdown:</p>
              <p># Título grande</p>
              <p>## Título médio</p>
              <p>**negrito**</p>
              <p>*itálico*</p>
            </div>
            <div style={{ marginTop: "1.4rem" }}>
              <p>- Lista com marcadores</p>
              <p>- [ ] Lista de tarefas</p>
              <p> {"> Citação importante"}</p>
              <p>___ Divisor de conteúdo</p>
            </div>
          </Flex>
        </Flex>
      </Form>
    </Flex>
  );
}
