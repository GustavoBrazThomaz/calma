import {
  ClockCircleOutlined,
  PhoneOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { Avatar, Badge, Card, Flex } from "antd";
import dayjs from "dayjs";

interface Props {
  firstName: string;
  phone: string;
  scheduled: Date;
  price: string;
  isPaid: boolean;
  status: "done" | "cancel" | "scheduled";
}

export function AppointmentCard({
  firstName,
  isPaid,
  phone,
  price,
  scheduled,
  status,
}: Props) {
  return (
    <Badge.Ribbon
      text={isPaid ? "Pago" : "Pendente"}
      color={isPaid ? "green" : "orange"}
    >
      <Card style={{ minWidth: 300 }}>
        <Card.Meta
          avatar={
            <Avatar size="large" style={{ backgroundColor: "#FF7D29" }}>
              {firstName}
            </Avatar>
          }
          title={firstName}
          description={
            <Flex vertical>
              <p>
                <PhoneOutlined /> {phone}
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
