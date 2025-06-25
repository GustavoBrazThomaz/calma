import { Row, Col } from "antd";
import { AppointmentCard } from "../../../ui/cards/appointment-card";
import { useGetAppointment } from "../../../services/appointment/use-get-appointment";

export function PatientAppointments() {
  const { data, isLoading } = useGetAppointment();

  if (isLoading || !data) return <p>Loading...</p>;
  return (
    <Row gutter={[16, 16]}>
      {data.map((item, index) => (
        <Col span={12} key={"col_" + index}>
          <AppointmentCard
            id={item.id}
            patientId={item.patientId}
            paymentType={item.paymentType}
            firstName={item.firstName}
            lastName={item.lastName}
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
