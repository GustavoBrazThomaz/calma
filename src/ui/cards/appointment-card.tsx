import {
  ClockCircleOutlined,
  PhoneOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card, Flex } from "antd";
import dayjs from "dayjs";
import { PAYMENT_TYPE } from "../../enum/payment_type";
import { useLocation, useNavigate } from "react-router";

interface Props {
  firstName: string;
  lastName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  status: "done" | "cancel" | "scheduled";
}

export function AppointmentCard({
  firstName,
  lastName,
  isPaid,
  phone,
  price,
  scheduled,
  status,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const patientId = 1;

  function handleRedirectToPatient() {
    if (location.pathname === `/paciente/${patientId}`) return;

    navigate(`/paciente/${patientId}`);
  }

  return (
    <Badge.Ribbon
      text={isPaid ? "Pago" : "Pendente"}
      color={isPaid ? "green" : "orange"}
    >
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
          title={`${firstName} ${lastName}`}
          description={
            <Flex vertical>
              <p>
                <PhoneOutlined /> {phone}
              </p>
              <p>
                Tipo de pagamento:{" "}
                {PAYMENT_TYPE.MONTHLY === PAYMENT_TYPE.MONTHLY
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
    </Badge.Ribbon>
  );
}
