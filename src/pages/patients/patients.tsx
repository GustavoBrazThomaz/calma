import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Col,
  Empty,
  Flex,
  Input,
  Pagination,
  Row,
  Spin,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useGetPatients } from "../../services/patient/use-get-patients";
import { usePatient } from "../../services/patient/use-patient";
import { useSearchPatient } from "../../services/patient/use-search-patient";
import type { Patients } from "../../types/patient";
import { PatientCard } from "../../ui/cards/patient-card";
import { paginateItems } from "../../utils/paginate-items";

const { Title } = Typography;

export function Patients() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, refetch } = useGetPatients();
  const [patients, setPatients] = useState<Patients[]>([]);
  const search = searchParams.get("search") ?? "";
  const searchPatient = useSearchPatient(search);
  const [pagination, setPagination] = useState<{ count: number; page: number }>(
    { count: 0, page: 1 }
  );
  const queryClient = useQueryClient();
  const { deletePatient } = usePatient();

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

      <Flex gap="middle" justify="space-between" style={{ width: "100%" }}>
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
              <Col span={6} key={item.id}>
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
