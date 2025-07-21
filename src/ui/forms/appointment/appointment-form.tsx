import {
  Button,
  DatePicker,
  Flex,
  Form,
  Modal,
  Select,
  TimePicker,
  type AutoCompleteProps,
} from "antd";
import { useState, type Dispatch } from "react";

import dayjs from "dayjs";

import type { AppointmentForm } from "./appointment.types";
import { useQueryClient } from "@tanstack/react-query";
import { useAppointment } from "../../../app/api/hooks/appointment/use-appointment";
import { useGetPatients } from "../../../app/api/hooks/patient/use-get-patients";

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
  const { data, isLoading } = useGetPatients();
  const { newAppointment } = useAppointment();
  const [hasPatient, setHasPatient] = useState<boolean>(true);
  const queryClient = useQueryClient();
  const [formInstance] = Form.useForm<AppointmentForm>();
  if (isLoading || !data) return null;

  data.map((item) => {
    patientsOptions.push({
      label: `${item.firstName} ${item.lastName}`,
      value: item.id,
    });
    return;
  });

  function handleSubmit(form: AppointmentForm) {
    newAppointment.mutate(form, {
      onSuccess() {
        queryClient.invalidateQueries({ queryKey: ["fetchAppointment"] });
        formInstance.resetFields();
      },
    });
    setHasPatient(true);
    setOpen(false);
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
          form={formInstance}
          clearOnDestroy={true}
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
              placeholder="Selecione um paciente"
              optionFilterProp="label"
              options={patientsOptions}
              onChange={(value) => setHasPatient(value ? false : true)}
            />
          </Form.Item>
          <Flex gap="middle">
            <Form.Item<AppointmentForm>
              label="Data"
              name="date"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <DatePicker
                minDate={dayjs(new Date())}
                style={{ width: "100%" }}
                disabled={hasPatient}
                format={dateFormat}
                placeholder="Selecione uma data"
              />
            </Form.Item>

            <Form.Item<AppointmentForm>
              label="Horário"
              name="scheduledTime"
              rules={[{ required: true }]}
              style={{ width: "100%" }}
            >
              <TimePicker
                minuteStep={5}
                format={timeFormat}
                disabled={hasPatient}
                style={{ width: "100%" }}
              />
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
