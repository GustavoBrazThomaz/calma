import {
  ClockCircleOutlined,
  EllipsisOutlined,
  PhoneOutlined,
  StopOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Flex,
  Menu,
  Popover,
  Space,
  type MenuProps,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { PAYMENT_TYPE } from "../../enum/payment_type";
import { useAppointment } from "../../services/appointment/use-appointment";
import type { Appointment } from "../../types/appointment";
import { useQueryClient } from "@tanstack/react-query";

type MenuItem = Required<MenuProps>["items"][number];

export function AppointmentCard({
  id,
  patientId,
  firstName,
  lastName,
  isPaid,
  phone,
  price,
  scheduled,
  status,
  paymentType,
}: Appointment) {
  const navigate = useNavigate();
  const location = useLocation();
  const { toggleIsPaidById, deleteAppointment } = useAppointment();
  const [hasPaid, setHasPaid] = useState<boolean>(isPaid);
  const queryClient = useQueryClient();

  function handleRedirectToPatient() {
    if (location.pathname === `/paciente/${patientId}`) return;
    navigate(`/paciente/${patientId}`);
  }

  function handleIsPaid() {
    toggleIsPaidById.mutate(id);
    setHasPaid(!hasPaid);
  }

  function handleDelete() {
    deleteAppointment.mutate(id);
    queryClient.refetchQueries({ queryKey: ["fetchAppointment"] });
  }

  const items: MenuItem[] = [
    { key: "1", label: "Excluir", onClick: handleDelete },
    {
      key: "2",
      label: `Mudar status para ${!hasPaid ? "Pago" : "Pendente"}`,
      onClick: handleIsPaid,
    },
    { key: "3", label: "Ver detalhes", onClick: handleRedirectToPatient },
  ];

  const content = (
    <Menu
      style={{ width: 256 }}
      openKeys={["sub1"]}
      mode="vertical"
      items={items}
    />
  );

  return (
    <Card style={{ minWidth: 300, cursor: "pointer" }}>
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
              <Popover content={content} trigger="click">
                <Button type="text">
                  <EllipsisOutlined />
                </Button>
              </Popover>
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
              {status === "cancel" ? (
                <p style={{ color: "red" }}>
                  <StopOutlined /> Cancelado
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
