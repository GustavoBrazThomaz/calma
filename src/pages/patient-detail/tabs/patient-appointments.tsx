import { Row, Col } from "antd";
import { appointments } from "../../../constants";
import { AppointmentCard } from "../../../ui/cards/appointment-card";

export function PatientAppointments() {
  return (
    <Row gutter={[16, 16]}>
      {appointments.map((item, index) => (
        <Col span={12} key={"col_" + index}>
          <AppointmentCard
            firstName={item.firstName}
            isPaid={item.isPaid}
            phone={item.phone}
            scheduled={item.scheduled}
            price={item.price}
            status={item.status}
          />
        </Col>
      ))}
    </Row>
  );
}
