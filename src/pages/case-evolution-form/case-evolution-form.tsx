import { useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Spin,
  Tabs,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import type { CaseEvolutionForm } from "./case-evolution.types";
import { MarkdownEditor } from "./markdown/markdown-editor";
import { MarkdownPreview } from "./markdown/markdown-preview";
import { useCaseEvolutionById } from "../../app/api/hooks/case-evolution/use-case-evolution-by-id";
import { useCaseEvolution } from "../../app/api/hooks/case-evolution/use-case-evolution";

const { Title, Paragraph } = Typography;

export function CaseEvolutionForm() {
  const [markdown, setMarkdown] = useState<string>("");
  const { caseId, id } = useParams();
  const { data, isLoading } = useCaseEvolutionById(caseId ?? "");
  const { updateCaseEvolution, createCaseEvolution } = useCaseEvolution();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (data) setMarkdown(data.note);
  }, [data, isLoading]);

  if (caseId) {
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
  }
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

  function handleSubmit(form: CaseEvolutionForm) {
    if (!data) {
      createCaseEvolution.mutate({ ...form, patientId: id as string });
      message.success("Evolução de caso criada com sucesso");
    } else {
      updateCaseEvolution.mutate({
        id: caseId as string,
        note: form.note,
        title: form.title,
      });
      message.success("Evolução de caso atualizada com sucesso");
    }

    queryClient
      .invalidateQueries({
        queryKey: [`fetchPatientCaseEvolution`, id],
      })
      .then(() => {
        navigate(`/paciente/${id}?tab=3`);
      });
  }

  return (
    <Flex vertical gap="middle">
      <Flex justify="space-between">
        <Title level={3}>
          {caseId ? "Evolução de caso" : "Nova Evolução de Caso"}
        </Title>
      </Flex>
      <Form<CaseEvolutionForm>
        onFinish={handleSubmit}
        autoComplete="off"
        layout="vertical"
        style={{ position: "relative" }}
        initialValues={{
          title: data ? data.title : "",
          note: data ? data.note : "",
        }}
      >
        <Button
          htmlType="submit"
          style={{ position: "absolute", right: 0, top: "-4rem" }}
        >
          Salvar
        </Button>
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
            <Tabs defaultActiveKey={"1"} tabPosition="top" items={tabs} />
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
