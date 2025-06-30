import { Col, Flex, Row, Skeleton } from "antd";

export function AppointmentInDashboardLoading() {
  const skeletonCardStyle = { width: 650, height: 140 };
  return (
    <Flex>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Skeleton.Node style={skeletonCardStyle} />
        </Col>
        <Col span={12}>
          <Skeleton.Node style={skeletonCardStyle} />
        </Col>
        <Col span={12}>
          <Skeleton.Node style={skeletonCardStyle} />
        </Col>
        <Col span={12}>
          <Skeleton.Node style={skeletonCardStyle} />
        </Col>
      </Row>
    </Flex>
  );
}
