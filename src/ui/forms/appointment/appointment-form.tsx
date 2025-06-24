import {
  Button,
  DatePicker,
  Flex,
  Form,
  // Input,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  type AutoCompleteProps,
} from "antd";
import { type Dispatch } from "react";

import dayjs from "dayjs";
import { patients } from "../../../constants";
import type { AppointmentForm } from "./appointment.types";

export function AppointmentForm({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<boolean>;
}) {
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "HH:mm";
  const patientsOptions: AutoCompleteProps["options"] = [];

  patients.map((item) => {
    patientsOptions.push({
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
    });
    return;
  });

  function handleSubmit(form: AppointmentForm) {
    form.scheduled_time = dayjs(form.scheduled_time).format(timeFormat);
    form.date = dayjs(form.date).format(dateFormat);
    console.log(form);
  }

  return (
    <Modal
      title="Agendar Nova Consulta"
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={{
        xs: "90%",
        sm: "80%",
        md: "70%",
        lg: "60%",
        xl: "50%",
        xxl: "40%",
      }}
    >
      <Flex vertical>
        <Form<AppointmentForm>
          onFinish={handleSubmit}
          onFinishFailed={(e) => console.log(e)}
          autoComplete="off"
          layout="vertical"
          initialValues={{
            isPaid: "paid",
            price: 150,
          }}
        >
          <Form.Item<AppointmentForm>
            label="Paciente"
            name="patient"
            rules={[{ required: true }]}
          >
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="label"
              options={patientsOptions}
            />
          </Form.Item>
          <Flex gap="middle">
            <Form.Item<AppointmentForm>
              label="Data"
              name="date"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <DatePicker style={{ width: "100%" }} format={dateFormat} />
            </Form.Item>

            <Form.Item<AppointmentForm>
              label="Horário"
              name="scheduled_time"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <TimePicker format={timeFormat} style={{ width: "100%" }} />
            </Form.Item>
          </Flex>

          <Flex gap="middle" align="center">
            <Form.Item<AppointmentForm>
              label="Valor da Consulta"
              rules={[{ required: true }]}
              style={{ width: "50%" }}
              name="price"
            >
              <InputNumber<number>
                prefix="R$"
                suffix=".00"
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

            <Form.Item<AppointmentForm>
              style={{
                width: "50%",
                marginTop: "1.7rem",
              }}
              rules={[{ required: true }]}
              name="isPaid"
              label={null}
            >
              <Select
                options={[
                  {
                    label: "Pagamento efetuado",
                    value: "paid",
                  },
                  {
                    label: "Pagamento não efetuado",
                    value: "not_paid",
                  },
                ]}
              ></Select>
            </Form.Item>
          </Flex>
          <Flex justify="end" gap="middle">
            <Button
              onClick={() => setOpen(false)}
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
      </Flex>
    </Modal>
  );
}
