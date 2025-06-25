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

const { Title } = Typography;
const dateFormat = "DD/MM/YYYY";

export function NewPatient() {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Form
      onFinish={(e) => console.log(e)}
      onFinishFailed={(e) => console.log(e)}
      autoComplete="off"
      layout="vertical"
    >
      <Title level={3}>
        {id ? "Paciente: Maria Silva" : "Criar novo paciente"}
      </Title>
      <Card>
        <Flex gap="small">
          <Form.Item
            label="Nome"
            name="firstName"
            style={{ width: "100%" }}
            rules={[{ required: true }]}
          >
            <Input placeholder="Maria" />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            name="lastName"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input placeholder="Silva" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input type="email" placeholder="exemplo@gmail.com" />
          </Form.Item>

          <Form.Item
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
          <Form.Item label="Data de nascimento" style={{ width: "100%" }}>
            <DatePicker
              placeholder="Escolha a data"
              style={{ width: "100%" }}
              format={dateFormat}
            />
          </Form.Item>
          <Form.Item label="Profissão" style={{ width: "100%" }}>
            <Input placeholder="Profissão" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item label="Gênero" style={{ width: "100%" }}>
            <Select
              options={genderOptions}
              style={{ width: "100%" }}
              placeholder="Feminino"
            />
          </Form.Item>

          <Form.Item label="Sexualidade" style={{ width: "100%" }}>
            <Select
              options={sexualityOptions}
              style={{ width: "100%" }}
              placeholder="Heterossexual"
            />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item label="Estado civil" style={{ width: "100%" }}>
            <Select options={maritalStatusOptions} placeholder="Solteiro(a)" />
          </Form.Item>
          <Form.Item label="Religião" style={{ width: "100%" }}>
            <Input placeholder="Budista" />
          </Form.Item>
        </Flex>

        <Flex gap="middle">
          <Form.Item label="Endereço" style={{ width: "100%" }}>
            <Input placeholder="Rua exemplo, 909" />
          </Form.Item>
          <Form.Item label="Escolaridade" style={{ width: "100%" }}>
            <Select
              placeholder="Ensino superior completo"
              options={educationLevelOptions}
            />
          </Form.Item>
        </Flex>

        <Flex gap="middle" align="center">
          <Form.Item label="Valor" style={{ width: "100%" }} name="price">
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

          <Form.Item
            style={{
              width: "100%",
            }}
            name="isPaid"
            label="Tipo de pagamento"
          >
            <Select
              placeholder="Selecione o tipo de pagamento"
              options={[
                {
                  label: "Pagamento mensal",
                  value: "monthly_payment",
                },
                {
                  label: "Pagamento por consulta",
                  value: "payment_for_appointment",
                },
              ]}
            />
          </Form.Item>
        </Flex>
      </Card>
      <Card style={{ marginTop: "1rem" }}>
        <Form.Item label="Observações Clínicas">
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            placeholder="Paciente apresenta quadro de ansiedade moderada e dificuldades para dormir. "
          />
        </Form.Item>

        <Form.Item label="Laudos e Diagnósticos">
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            placeholder="Transtorno de Ansiedade Generalizada (TAG)"
          />
        </Form.Item>

        <Form.Item label="Medicamentos em uso">
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
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Salvar
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
}
