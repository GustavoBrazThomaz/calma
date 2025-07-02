import {
  CalendarOutlined,
  DeleteOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import type { Patients } from "../../types/patient";
import { getAgeFromBirthDate } from "../../utils/get-age";

const { Title } = Typography;

type Props = Patients & {
  onDelete: (id: string) => void;
};

export function PatientCard({
  id,
  firstName,
  lastName,
  birthDate,
  phone,
  lastAppointment,
  onDelete,
}: Props) {
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

      <Popconfirm
        title="Excluir paciente"
        description="Você tem certeza que deseja excluir esse paciente?"
        onConfirm={() => {
          onDelete(id);
        }}
        okText="Excluir"
        cancelText="Cancelar"
      >
        <Button
          icon={<DeleteOutlined />}
          type="text"
          color="danger"
          style={{
            position: "absolute",
            right: "0.5rem",
            top: "0.5rem",
            color: "red",
          }}
        />
      </Popconfirm>
    </Card>
  );
}
