import { CalendarOutlined, PhoneOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Flex, Space, Typography } from "antd";
import dayjs from "dayjs";
import { getAgeFromBirthDate } from "../../utils/get-age";
import { useNavigate } from "react-router";
import type { Patients } from "../../types/patient";

const { Title } = Typography;

export function PatientCard({
  id,
  firstName,
  lastName,
  birthDate,
  phone,
  lastAppointment,
}: Patients) {
  const navigate = useNavigate();

  return (
    <Card
      actions={[
        <Button
          key="details"
          variant="text"
          color="default"
          onClick={() => navigate("/paciente/" + id)}
        >
          Ver detalhes
        </Button>,
      ]}
    >
      <Flex
        vertical
        justify="center"
        align="center"
        style={{ width: "100%" }}
        gap="small"
      >
        <Avatar size="large">{firstName}</Avatar>
        <Title style={{ marginBottom: 0 }} level={4}>
          {firstName} {lastName}
        </Title>
        <p>{getAgeFromBirthDate(birthDate)} anos</p>
      </Flex>
      <Space direction="vertical" size="small" style={{ marginTop: "1rem" }}>
        <p>
          <PhoneOutlined style={{ marginRight: "1rem" }} /> {phone}
        </p>
        <Flex gap="middle">
          <CalendarOutlined />
          <Space direction="vertical" size={0}>
            <p style={{ fontSize: "12px" }}>Última consulta</p>
            <p style={{ fontWeight: "bold" }}>
              {dayjs(lastAppointment).format("DD/MM/YYYY")}
            </p>
          </Space>
        </Flex>
      </Space>
    </Card>
  );
}
