import {
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Popconfirm,
  Space,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PAYMENT_TYPE } from "../../enum/payment_type";
import { useAppointment } from "../../services/appointment/use-appointment";
import type { Appointment } from "../../types/appointment";

type Props = Appointment & {
  onDelete?: (id: string) => void;
  hasDelete?: boolean;
};

export function AppointmentCard({
  id,
  patientId,
  firstName,
  lastName,
  isPaid,
  phone,
  price,
  scheduled,
  isDone,
  paymentType,
  onDelete,
  hasDelete,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleIsPaidById, toggleIsDoneById, deleteAppointment } =
    useAppointment();
  const [hasPaid, setHasPaid] = useState<boolean>(isPaid);
  const [hasDone, setHasDone] = useState<boolean>(isDone);
  const queryClient = useQueryClient();

  function handleRedirectToPatient() {
    if (location.pathname === `/paciente/${patientId}`) return;
    navigate(`/paciente/${patientId}`);
  }

  function handleIsPaid() {
    toggleIsPaidById.mutate(id);
    setHasPaid(!hasPaid);
  }

  function handleIsDone() {
    toggleIsDoneById.mutate(id);
    setHasDone(!hasDone);
  }

  function handleDelete() {
    deleteAppointment.mutate(id);
    queryClient.refetchQueries({ queryKey: ["fetchAppointment"] });
  }

  return (
    <Card
      style={{ minWidth: 300, cursor: "pointer" }}
      onClick={handleRedirectToPatient}
      hoverable
    >
      <Card.Meta
        avatar={
          <Avatar size="large" style={{ backgroundColor: "#FF7D29" }}>
            {firstName}
          </Avatar>
        }
        title={
          <Flex justify="space-between">
            {`${firstName} ${lastName}`}{" "}
            <Space>
              <Badge
                count={hasPaid ? "Pago" : "Pendente"}
                color={hasPaid ? "green" : "orange"}
              />

              <Tooltip
                title={`Mudar status da consulta para ${
                  !hasPaid ? "Realiza" : "Agendada"
                }`}
              >
                <Button
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIsDone();
                  }}
                  icon={<CheckOutlined />}
                />
              </Tooltip>

              <Tooltip
                title={`Mudar status para ${!hasPaid ? "Pago" : "Pendente"}`}
              >
                <Button
                  type="text"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleIsPaid();
                  }}
                  icon={<DollarOutlined />}
                />
              </Tooltip>

              <Popconfirm
                title="Excluir consulta"
                description="Você tem certeza que deseja excluir essa consulta?"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  handleDelete();
                  if (onDelete) onDelete(id);
                }}
                onCancel={(e) => e?.stopPropagation()}
                okText="Excluir"
                cancelText="Cancelar"
              >
                {hasDelete ?? undefined ?? (
                  <Button
                    icon={<DeleteOutlined />}
                    type="text"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </Popconfirm>
            </Space>
          </Flex>
        }
        description={
          <Flex vertical>
            <p>
              <PhoneOutlined /> {phone}
            </p>
            <p>
              Tipo de pagamento:{" "}
              {paymentType === PAYMENT_TYPE.MONTHLY
                ? "Mensal"
                : "A cada consulta"}
            </p>
            <Flex justify="space-between" style={{ width: "100%" }}>
              {hasDone ? (
                <p style={{ color: "#52C41A" }}>
                  <CheckOutlined /> Realizada
                </p>
              ) : (
                <p>
                  <ClockCircleOutlined />{" "}
                  {dayjs(scheduled).format("HH:mm - DD/MM")}
                </p>
              )}

              <p style={{ color: "#52C41A" }}>{price}</p>
            </Flex>
          </Flex>
        }
      />
    </Card>
  );
}
