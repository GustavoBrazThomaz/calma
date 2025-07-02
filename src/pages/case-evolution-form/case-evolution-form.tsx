import {
  Button,
  Card,
  Empty,
  Flex,
  Form,
  Input,
  Spin,
  Tabs,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useCaseEvolutionById } from "../../services/case-evolution/use-case-evolution-by-id";
import type { CaseEvolutionForm } from "./case-evolution.types";
import { MarkdownEditor } from "./markdown/markdown-editor";
import { MarkdownPreview } from "./markdown/markdown-preview";

const { Title, Paragraph } = Typography;

export function CaseEvolutionForm() {
  const [markdown, setMarkdown] = useState<string>("");
  const { caseId } = useParams();
  const { data, isLoading } = useCaseEvolutionById(caseId as string);

  useEffect(() => {
    if (data) setMarkdown(data.note);
  }, [data, isLoading]);

  if (isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin tip="Loading..." size="large" />
      </Flex>
    );
  if (!data) return <Empty style={{ marginTop: "4rem" }} />;

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
          title: data.title,
          note: data.note,
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
