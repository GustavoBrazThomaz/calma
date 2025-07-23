import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

type Props = {
  title: string;
  id: string;
  createdAt: Date;
  patientId: string;
};

export function CaseEvolutionCard({ title, id, createdAt, patientId }: Props) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/paciente/${patientId}/evolucao-de-caso/${id}`)}
      style={{ cursor: "pointer" }}
      hoverable
      actions={[
        <Button
          style={{ width: "98%" }}
          color="default"
          variant="text"
          htmlType="button"
        >
          Ver detalhes
        </Button>,
      ]}
    >
      <Typography.Title level={4}>{title}</Typography.Title>

      <Typography.Text style={{ color: "#9E9E9E" }}>
        Data de criação:
      </Typography.Text>
      <Flex gap="small">
        <Typography.Text>
          <CalendarOutlined style={{ marginRight: "0.3rem" }} />
          {dayjs(createdAt).format("DD/MM/YYYY")}
        </Typography.Text>
        -
        <Typography.Text>
          <ClockCircleOutlined style={{ marginRight: "0.3rem" }} />
          {dayjs(createdAt).format("HH:mm")}
        </Typography.Text>
      </Flex>
    </Card>
  );
}
