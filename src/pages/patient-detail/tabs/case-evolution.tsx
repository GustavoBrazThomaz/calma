import { EditOutlined } from "@ant-design/icons";
import { Button, Card, Flex, Typography } from "antd";

const { Paragraph, Title } = Typography;

export function CaseEvolution() {
  return (
    <Flex gap="middle" wrap>
      {Array.from({ length: 5 }).map((_, index) => (
        <Card
          style={{
            width: "200px",
            transform: `rotate(${
              index % 3 === 0 ? 1 : index % 3 === 1 ? -1 : 0
            }deg)`,
            background: "#FFEEA9",
            // borderColor: "#FFBF78",
            border: "none",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "25px",
              height: "15px",
              background: "#f7f7f7",
              backdropFilter: "blur",
              opacity: "80%",
              top: "-0.4rem",
              left: "1.2rem",
            }}
          ></div>

          <Button
            style={{ position: "absolute", top: "0", right: "0" }}
            shape="circle"
            type="text"
            icon={<EditOutlined />}
          />

          <Title level={5}>Titulo da nota</Title>
          <Paragraph>
            Lorem, ipsum dolor sit amet consectetur adipisicing{" "}
          </Paragraph>
        </Card>
      ))}
    </Flex>
  );
}
