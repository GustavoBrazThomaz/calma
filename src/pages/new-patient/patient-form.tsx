import {
  Button,
  Card,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Typography,
} from "antd";
import { useMask } from "react-phone-hooks";
import { useNavigate, useParams } from "react-router";
import {
  genderOptions,
  sexualityOptions,
  maritalStatusOptions,
  educationLevelOptions,
} from "./constants";
import type { PatientDetails } from "../../types/patient-detail";
import { PAYMENT_TYPE } from "../../enum/payment_type";
import { usePatient } from "../../services/patient/use-patient";
import { useQueryClient } from "@tanstack/react-query";

const { Title } = Typography;
const dateFormat = "DD/MM/YYYY";

export function NewPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { newPatient } = usePatient();
  const queryClient = useQueryClient();

  function handleSubmit(form: Omit<PatientDetails, "id">) {
    newPatient.mutate(form, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["fetchPatients"] });
      },
    });

    navigate("/pacientes");
  }

  return (
    <Form<Omit<PatientDetails, "id">>
      onFinish={handleSubmit}
      autoComplete="off"
      layout="vertical"
    >
      <Title level={3}>
        {id ? "Paciente: Maria Silva" : "Criar novo paciente"}
      </Title>
      <Card>
        <Flex gap="small">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Nome"
            name="firstName"
            style={{ width: "100%" }}
            rules={[{ required: true }]}
          >
            <Input placeholder="Maria" />
          </Form.Item>
          <Form.Item<Omit<PatientDetails, "id">>
            label="Sobrenome"
            name="lastName"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Silva" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Email"
            name="email"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input type="email" placeholder="exemplo@gmail.com" />
          </Form.Item>

          <Form.Item<Omit<PatientDetails, "id">>
            label="Telefone"
            name="phone"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input
              {...useMask("(..) ....-....")}
              placeholder="(99) 9999-99999"
            />
          </Form.Item>
        </Flex>
        <Flex gap="middle">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Data de nascimento"
            name="birthDate"
            style={{ width: "100%" }}
          >
            <DatePicker
              placeholder="Escolha a data"
              style={{ width: "100%" }}
              format={dateFormat}
              onChange={(date) => console.log(date)}
            />
          </Form.Item>
          <Form.Item<Omit<PatientDetails, "id">>
            label="Profissão"
            name="profession"
            style={{ width: "100%" }}
          >
            <Input placeholder="Profissão" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Gênero"
            name="gender"
            style={{ width: "100%" }}
          >
            <Select
              options={genderOptions}
              style={{ width: "100%" }}
              placeholder="Feminino"
            />
          </Form.Item>

          <Form.Item<Omit<PatientDetails, "id">>
            label="Sexualidade"
            name="sexuality"
            style={{ width: "100%" }}
          >
            <Select
              options={sexualityOptions}
              style={{ width: "100%" }}
              placeholder="Heterossexual"
            />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Estado civil"
            name="maritalStatus"
            style={{ width: "100%" }}
          >
            <Select options={maritalStatusOptions} placeholder="Solteiro(a)" />
          </Form.Item>
          <Form.Item<Omit<PatientDetails, "id">>
            label="Religião"
            name="religion"
            style={{ width: "100%" }}
          >
            <Input placeholder="Budista" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Endereço"
            name="address"
            style={{ width: "100%" }}
          >
            <Input placeholder="Rua exemplo, 909" />
          </Form.Item>
          <Form.Item<Omit<PatientDetails, "id">>
            label="Escolaridade"
            name="education"
            style={{ width: "100%" }}
          >
            <Select
              placeholder="Ensino superior completo"
              options={educationLevelOptions}
            />
          </Form.Item>
        </Flex>

        <Flex gap="middle" align="center">
          <Form.Item<Omit<PatientDetails, "id">>
            label="Valor"
            style={{ width: "100%" }}
            name="price"
          >
            <InputNumber<number>
              prefix="R$"
              suffix=".00"
              placeholder="150"
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                value?.replace(/(,*)/g, "") as unknown as number
              }
              style={{ width: "100%" }}
              maxLength={4}
            />
          </Form.Item>

          <Form.Item<Omit<PatientDetails, "id">>
            style={{
              width: "100%",
            }}
            name="paymentType"
            label="Tipo de pagamento"
          >
            <Select
              placeholder="Selecione o tipo de pagamento"
              options={[
                {
                  label: "Pagamento mensal",
                  value: PAYMENT_TYPE.MONTHLY,
                },
                {
                  label: "Pagamento por consulta",
                  value: PAYMENT_TYPE.APPOINTMENT,
                },
              ]}
            />
          </Form.Item>
        </Flex>
      </Card>
      <Card style={{ marginTop: "1rem" }}>
        <Form.Item<Omit<PatientDetails, "id">>
          label="Observações Clínicas"
          name="clinicalObservations"
        >
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            placeholder="Paciente apresenta quadro de ansiedade moderada e dificuldades para dormir. "
          />
        </Form.Item>

        <Form.Item<Omit<PatientDetails, "id">>
          label="Laudos e Diagnósticos"
          name="diagnoses"
        >
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            placeholder="Transtorno de Ansiedade Generalizada (TAG)"
          />
        </Form.Item>

        <Form.Item<Omit<PatientDetails, "id">>
          label="Medicamentos em uso"
          name="currentMedications"
        >
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            placeholder="Fluoxetina 20mg - 1x ao dia"
          />
        </Form.Item>
      </Card>
      <Flex justify="end" gap="middle" style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => navigate(-1)}
          type="primary"
          variant="outlined"
          color="primary"
        >
          Cancelar
        </Button>
        <Form.Item<Omit<PatientDetails, "id">> label={null}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
