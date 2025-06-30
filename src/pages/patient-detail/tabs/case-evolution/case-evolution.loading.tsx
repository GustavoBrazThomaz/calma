import { Col, Flex, Row, Skeleton } from "antd";

export function CaseEvolutionSkeleton() {
  const cardStyle = { width: "650px", height: "400px" };

  return (
    <Flex vertical gap="middle">
      <Flex justify="flex-end">
        <Skeleton.Button style={{ width: "8rem" }} />
      </Flex>
      <Flex wrap gap="middle">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Skeleton.Avatar shape="square" style={cardStyle} />
          </Col>
          <Col span={12}>
            <Skeleton.Avatar shape="square" style={cardStyle} />
          </Col>
        </Row>
      </Flex>
    </Flex>
  );
}
