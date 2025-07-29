import { useQueryClient } from "@tanstack/react-query";
import {
  App,
  Button,
  Card,
  Flex,
  Form,
  Grid,
  Input,
  Spin,
  Typography,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useCaseEvolution } from "../../app/api/hooks/case-evolution/use-case-evolution";
import { useCaseEvolutionById } from "../../app/api/hooks/case-evolution/use-case-evolution-by-id";
import type { CaseEvolutionForm } from "./case-evolution.types";
import RichTextInput from "./rich-text-input/rich-text-input";
import { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Title } = Typography;

export function CaseEvolutionForm() {
  const { caseId, id } = useParams();
  const { sm } = Grid.useBreakpoint();
  const { data, isLoading } = useCaseEvolutionById(
    caseId ?? "",
    caseId ? true : false
  );
  const { updateCaseEvolution, createCaseEvolution } = useCaseEvolution();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [note, setNote] = useState<string>("");

  if (caseId) {
    if (isLoading)
      return (
        <Flex
          align="center"
          justify="center"
          style={{ width: "100%", height: "100%" }}
        >
          <Spin size="large" />
        </Flex>
      );
  }

  function handleSubmit(form: CaseEvolutionForm) {
    if (!data) {
      createCaseEvolution.mutate({
        ...form,
        note: note,
        patientId: id as string,
      });
      message.success("Evolução de caso criada com sucesso");
    } else {
      updateCaseEvolution.mutate({
        id: caseId as string,
        note: note,
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
      <Flex gap="small">
        <Button
          onClick={() => navigate(`/paciente/${id}?tab=3`)}
          color="default"
          variant="text"
          icon={<ArrowLeftOutlined />}
        />
        <Title
          level={3}
          style={{
            width: !sm ? "60%" : "100%",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
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
            <RichTextInput setValue={setNote} content={data?.note} />
          </Card>
        </Flex>
      </Form>
    </Flex>
  );
}
