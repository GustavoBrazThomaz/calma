import {
  CheckOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DollarOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { useQueryClient } from "@tanstack/react-query";
import {
  Badge,
  Button,
  Card,
  Flex,
  Popconfirm,
  Space,
  Tooltip,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppointment } from "../../app/api/hooks/appointment/use-appointment";
import { PAYMENT_TYPE } from "../../domain/enum/payment_type";
import type { Appointment } from "../../domain/types";
import { parsePrice } from "../../app/utils/parse-price";

type Props = Appointment & {
  onDelete?: (id: string) => void;
  hasDelete?: boolean;
  isHome?: boolean;
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
  isHome,
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
    toggleIsPaidById.mutate({
      id,
      isPaid: !hasPaid,
    });
    setHasPaid(!hasPaid);
  }

  function handleIsDone() {
    toggleIsDoneById.mutate({ id, isDone: !hasDone });
    setHasDone(!hasDone);
  }

  function handleDelete() {
    deleteAppointment.mutate(id);
    queryClient.refetchQueries({ queryKey: ["fetchAppointment"] });
  }

  return (
    <Card
      style={{
        minWidth: 300,
        width: "100%",
        cursor: "pointer",
      }}
      onClick={handleRedirectToPatient}
      hoverable
    >
      <Card.Meta
        title={
          <Flex justify="space-between">
            <Typography.Title style={{ marginBottom: 0 }} level={5}>
              {`${firstName} ${lastName}`}
            </Typography.Title>
            <Space>
              <Badge
                count={hasPaid ? "Pago" : "Pendente"}
                color={hasPaid ? "green" : "orange"}
              />

              {!isHome && (
                <>
                  {" "}
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
                    title={`Mudar status para ${
                      !hasPaid ? "Pago" : "Pendente"
                    }`}
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
                </>
              )}
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

              <p style={{ color: "#52C41A" }}>{parsePrice(price)}</p>
            </Flex>
          </Flex>
        }
      />
    </Card>
  );
}
