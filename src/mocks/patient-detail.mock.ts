import { PAYMENT_TYPE } from "../enum/payment_type";
import type { PatientDetails } from "../types/patient-detail";

export const patientsDetails: PatientDetails[] = [
  {
    id: "f7249848-d991-459d-97a5-e4cb3313d79b",
    firstName: "Ana",
    lastName: "Gomes",
    birthDate: new Date("1988-10-22"),
    contactInformation: {
      phone: "(65) 97139-2528",
      email: "ana.gomes@email.com",
    },
    personalInformation: {
      religion: "Espírita",
      maritalStatus: "União Estável",
      address: "Rua Pereira, 945 - São Paulo, SP",
      education: "Ensino Fundamental",
      profession: "Nutricionista",
      gender: "Não-binário",
      sexuality: "Assexual",
    },
    paymentInfo: {
      price: "R$ 143,00",
      paymentType: PAYMENT_TYPE.APPOINTMENT,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a toc e tdah.",
    currentMedications:
      "Fluoxetina 20mg - 1x ao dia\nSertralina 50mg - 1x ao dia",
    diagnoses: "TOC\nTDAH",
  },
  {
    id: "ca62f255-2b4b-44e9-a191-60b70838d054",
    firstName: "João",
    lastName: "Souza",
    birthDate: new Date("1975-02-19"),
    contactInformation: {
      phone: "(85) 92166-1451",
      email: "joão.souza@email.com",
    },
    personalInformation: {
      religion: "Ateu",
      maritalStatus: "União Estável",
      address: "Rua Pereira, 988 - São Paulo, SP",
      education: "Pós-graduação",
      profession: "Designer",
      gender: "Não-binário",
      sexuality: "Homossexual",
    },
    paymentInfo: {
      price: "R$ 250,00",
      paymentType: PAYMENT_TYPE.APPOINTMENT,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a insônia e tag.",
    currentMedications: "Escitalopram 10mg - 1x ao dia\nClonazepam 0,5mg - SOS",
    diagnoses: "Insônia\nTAG",
  },
  {
    id: "09a2ae04-97e1-4ca5-9063-7b14c09c0421",
    firstName: "Juliana",
    lastName: "Silva",
    birthDate: new Date("2000-03-29"),
    contactInformation: {
      phone: "(13) 99222-1892",
      email: "juliana.silva@email.com",
    },
    personalInformation: {
      religion: "Candomblé",
      maritalStatus: "Casado(a)",
      address: "Rua Pereira, 555 - São Paulo, SP",
      education: "Ensino Médio",
      profession: "Psicóloga",
      gender: "Feminino",
      sexuality: "Heterossexual",
    },
    paymentInfo: {
      price: "R$ 129,00",
      paymentType: PAYMENT_TYPE.MONTHLY,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a tag e depressão.",
    currentMedications: "Rivotril - 1x ao dia\nFluoxetina 20mg - 1x ao dia",
    diagnoses: "TAG\nDepressão",
  },
  {
    id: "2400c912-faa4-461d-b146-87775abc3488",
    firstName: "Maria",
    lastName: "Pereira",
    birthDate: new Date("2001-12-07"),
    contactInformation: {
      phone: "(81) 93675-5146",
      email: "maria.pereira@email.com",
    },
    personalInformation: {
      religion: "Muçulmano",
      maritalStatus: "Viúvo(a)",
      address: "Rua Barbosa, 564 - Belo Horizonte, SP",
      education: "Mestrado",
      profession: "Professora",
      gender: "Outro",
      sexuality: "Homossexual",
    },
    paymentInfo: {
      price: "R$ 199,00",
      paymentType: PAYMENT_TYPE.APPOINTMENT,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a síndrome do pânico e tag.",
    currentMedications: "Rivotril - 1x ao dia\nFluoxetina 20mg - 1x ao dia",
    diagnoses: "Síndrome do Pânico\nTAG",
  },
  {
    id: "fbb13219-2897-442d-bf05-52d79f9997d0",
    firstName: "Camila",
    lastName: "Oliveira",
    birthDate: new Date("1983-12-28"),
    contactInformation: {
      phone: "(12) 92185-7530",
      email: "camila.oliveira@email.com",
    },
    personalInformation: {
      religion: "Candomblé",
      maritalStatus: "União Estável",
      address: "Rua Almeida, 130 - São Paulo, SP",
      education: "Pós-graduação",
      profession: "Advogada",
      gender: "Outro",
      sexuality: "Homossexual",
    },
    paymentInfo: {
      price: "R$ 138,00",
      paymentType: PAYMENT_TYPE.APPOINTMENT,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a síndrome do pânico e transtorno de ansiedade.",
    currentMedications: "Clonazepam 0,5mg - SOS\nFluoxetina 20mg - 1x ao dia",
    diagnoses: "Síndrome do Pânico\nTranstorno de Ansiedade",
  },
  {
    id: "42d6196d-08a2-407a-b867-8c8b6d77aa0b",
    firstName: "Mariana",
    lastName: "Gomes",
    birthDate: new Date("2001-01-30"),
    contactInformation: {
      phone: "(77) 91288-9561",
      email: "mariana.gomes@email.com",
    },
    personalInformation: {
      religion: "Candomblé",
      maritalStatus: "Solteiro(a)",
      address: "Rua Silva, 693 - Rio de Janeiro, SP",
      education: "Ensino Superior Incompleto",
      profession: "Programador",
      gender: "Feminino",
      sexuality: "Pansexual",
    },
    paymentInfo: {
      price: "R$ 242,00",
      paymentType: PAYMENT_TYPE.MONTHLY,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a fobia social e insônia.",
    currentMedications: "Escitalopram 10mg - 1x ao dia\nClonazepam 0,5mg - SOS",
    diagnoses: "Fobia Social\nInsônia",
  },
  {
    id: "f665e59a-d8cf-4853-a4cd-4df47747c5af",
    firstName: "Lucas",
    lastName: "Almeida",
    birthDate: new Date("1999-05-12"),
    contactInformation: {
      phone: "(13) 99789-2951",
      email: "lucas.almeida@email.com",
    },
    personalInformation: {
      religion: "Espírita",
      maritalStatus: "Casado(a)",
      address: "Rua Gomes, 814 - São Paulo, SP",
      education: "Pós-graduação",
      profession: "Advogado",
      gender: "Masculino",
      sexuality: "Bissexual",
    },
    paymentInfo: {
      price: "R$ 238,00",
      paymentType: PAYMENT_TYPE.MONTHLY,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a transtorno de ansiedade e toc.",
    currentMedications: "Clonazepam 0,5mg - SOS\nRivotril - 1x ao dia",
    diagnoses: "Transtorno de Ansiedade\nTOC",
  },
  {
    id: "e15afb3b-8a26-443b-b04a-4f03a30689fb",
    firstName: "João",
    lastName: "Oliveira",
    birthDate: new Date("1981-03-09"),
    contactInformation: {
      phone: "(53) 94531-4598",
      email: "joão.oliveira@email.com",
    },
    personalInformation: {
      religion: "Budista",
      maritalStatus: "Solteiro(a)",
      address: "Rua Silva, 367 - Rio de Janeiro, SP",
      education: "Ensino Médio",
      profession: "Psicólogo",
      gender: "Outro",
      sexuality: "Outro",
    },
    paymentInfo: {
      price: "R$ 116,00",
      paymentType: PAYMENT_TYPE.MONTHLY,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a tdah e insônia.",
    currentMedications: "Sertralina 50mg - 1x ao dia\nClonazepam 0,5mg - SOS",
    diagnoses: "TDAH\nInsônia",
  },
  {
    id: "053fcd03-1373-42a0-bead-d8e5100b1bfe",
    firstName: "Mariana",
    lastName: "Oliveira",
    birthDate: new Date("1993-07-12"),
    contactInformation: {
      phone: "(32) 98804-3015",
      email: "mariana.oliveira@email.com",
    },
    personalInformation: {
      religion: "Católica",
      maritalStatus: "Divorciado(a)",
      address: "Rua Souza, 475 - São Paulo, SP",
      education: "Ensino Fundamental",
      profession: "Psicóloga",
      gender: "Feminino",
      sexuality: "Homossexual",
    },
    paymentInfo: {
      price: "R$ 118,00",
      paymentType: PAYMENT_TYPE.APPOINTMENT,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a toc e tag.",
    currentMedications:
      "Escitalopram 10mg - 1x ao dia\nSertralina 50mg - 1x ao dia",
    diagnoses: "TOC\nTAG",
  },
  {
    id: "de2d821e-9d35-4c6c-aa02-b01e201235a1",
    firstName: "Camila",
    lastName: "Carvalho",
    birthDate: new Date("2002-10-12"),
    contactInformation: {
      phone: "(98) 92163-3839",
      email: "camila.carvalho@email.com",
    },
    personalInformation: {
      religion: "Candomblé",
      maritalStatus: "Casado(a)",
      address: "Rua Barbosa, 639 - Belo Horizonte, SP",
      education: "Ensino Fundamental",
      profession: "Psicóloga",
      gender: "Outro",
      sexuality: "Outro",
    },
    paymentInfo: {
      price: "R$ 112,00",
      paymentType: PAYMENT_TYPE.MONTHLY,
    },
    clinicalObservations:
      "Paciente apresenta sintomas relacionados a fobia social e síndrome do pânico.",
    currentMedications: "Sertralina 50mg - 1x ao dia\nClonazepam 0,5mg - SOS",
    diagnoses: "Fobia Social\nSíndrome do Pânico",
  },
];
