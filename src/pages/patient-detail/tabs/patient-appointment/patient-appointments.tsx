import { Row, Col, Empty } from "antd";
import { AppointmentCard } from "../../../../ui/cards/appointment-card";
import { PatientAppointmentsSkeleton } from "./patient-appointment.loading";
import { useGetPatientAppointments } from "../../../../services/appointment/use-get-patient-appointments";
import { useParams } from "react-router";

export function PatientAppointments() {
  const { id } = useParams();
  const { data, isLoading } = useGetPatientAppointments(id as string);

  if (isLoading) return <PatientAppointmentsSkeleton />;

  if (!data || data.length === 0)
    return <Empty style={{ marginTop: "4rem" }} />;

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
            isDone={item.isDone}
          />
        </Col>
      ))}
    </Row>
  );
}
