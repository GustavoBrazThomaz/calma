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
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { paginateItems } from "../../app/utils/paginate-items";
import { useGetPatients } from "../../app/services/hooks/patient/use-get-patients";
import { usePatient } from "../../app/services/hooks/patient/use-patient";
import { useSearchPatient } from "../../app/services/hooks/patient/use-search-patient";
import { PatientCard } from "../../ui/components/patient-card";
import type { Patients } from "../../domain/types";

const { Title } = Typography;
const { useBreakpoint } = Grid;
export function Patients() {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useGetPatients();
  const [patients, setPatients] = useState<Patients[]>([]);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );
  const queryClient = useQueryClient();
  const { deletePatient } = usePatient();
  const { sm, md } = useBreakpoint();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") ?? "";
  const searchPatient = useSearchPatient(search);
  const hasSearch = !!search;
  const currentData = hasSearch ? searchPatient.data : data;
  const isEmpty = !currentData || currentData.length === 0;

  useEffect(() => {
    if (currentData) {
      paginateItems(currentData, 1, setPatients, 8);
      setPagination((prev) => ({
        ...prev,
        count: currentData.length,
      }));
    }
  }, [currentData]);

  function handleDeletePatientById(id: string) {
    deletePatient.mutate(id);
    queryClient.refetchQueries({ queryKey: ["fetchPatients"] });

    if (data) {
      const newData = data.filter((item) => item.id !== id);
      paginateItems(newData, pagination.page, setPatients, 8);
      setPagination((prev) => {
        return {
          ...prev,
          count: newData.length,
        };
      });
    }

    setPatients((prev) => prev.filter((item) => item.id !== id));
  }

  if (isLoading || searchPatient.isLoading)
    return (
      <Flex
        align="center"
        justify="center"
        style={{ width: "100%", height: "100%" }}
      >
        <Spin tip="Loading..." size="large" />
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
        style={{ width: "100%" }}
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
          color="blue"
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
            {patients.map((item) => (
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
          <Pagination
            onChange={(pag) => {
              if (currentData) paginateItems(currentData, pag, setPatients, 8);
              setPagination((prev) => {
                return {
                  ...prev,
                  page: pag,
                };
              });
            }}
            defaultCurrent={1}
            total={pagination.count}
            defaultPageSize={8}
            align="center"
          />
        </>
      )}
    </Flex>
  );
}
