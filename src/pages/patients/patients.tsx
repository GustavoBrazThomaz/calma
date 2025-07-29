import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Empty,
  Flex,
  Grid,
  Input,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useGetPatients } from "../../app/api/hooks/patient/use-get-patients";
import { usePatient } from "../../app/api/hooks/patient/use-patient";
import { useSearchPatient } from "../../app/api/hooks/patient/use-search-patient";
import { PatientCard } from "../../ui/components/patient-card";

const { Title } = Typography;
const { useBreakpoint } = Grid;
export function Patients() {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetPatients({
    page,
    limit: 8,
  });

  const queryClient = useQueryClient();
  const { deletePatient } = usePatient();
  const { sm, md } = useBreakpoint();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchPatient = useSearchPatient(search);
  const hasSearch = !!search;
  const currentData = hasSearch ? searchPatient.data : data?.patients;
  const isEmpty = !currentData || currentData.length === 0;

  const patient = useMemo(() => {
    if (searchPatient.data) return searchPatient.data;
    if (!data) return [];
    return data.patients;
  }, [data, searchPatient.data]);

  function handleDeletePatientById(id: string) {
    deletePatient.mutate(id);
    queryClient.invalidateQueries({ queryKey: ["fetchPatients", page] });
  }

  if (isLoading || searchPatient.isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin size="large" />
      </Flex>
    );

  return (
    <Flex vertical gap="large">
      <Flex>
        <Title level={3}>Pacientes</Title>
      </Flex>

      <Flex
        gap="middle"
        wrap={!sm}
        justify="space-between"
        style={{ width: "100%", marginTop: !md ? "-1rem" : "0" }}
      >
        <Input.Search
          placeholder="Buscar por paciente pelo nome"
          allowClear
          onSearch={(search: string) => setSearchParams({ search: search })}
          onClear={() => {
            setSearchParams({});
            refetch();
          }}
          defaultValue={search}
        />

        <Button
          onClick={() => navigate("/novo-paciente")}
          variant="solid"
          color="primary"
          style={{ width: !sm ? "100%" : "" }}
        >
          Novo Paciente
        </Button>
      </Flex>

      {isEmpty ? (
        <Empty style={{ marginTop: "4rem" }} />
      ) : (
        <>
          <Row gutter={[16, 16]}>
            {patient.map((item) => (
              <Col
                style={{ minWidth: !md ? "100%" : "" }}
                span={16}
                md={12}
                lg={8}
                xxl={6}
                key={item.id}
              >
                <PatientCard
                  id={item.id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  birthDate={item.birthDate}
                  phone={item.phone}
                  lastAppointment={item.lastAppointment}
                  onDelete={handleDeletePatientById}
                />
              </Col>
            ))}
          </Row>

          {!hasSearch && (
            <Pagination
              onChange={(pag) => {
                setPage(pag);
              }}
              defaultCurrent={1}
              total={data?.total}
              defaultPageSize={8}
              align="center"
            />
          )}
        </>
      )}
    </Flex>
  );
}
