import { NewPatient, Patient } from "../types";
import data from "../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return data;
};

const getNonSensistivePatients = (): Omit<Patient, "ssn">[] => {
  return data.map(({ id, name, dateOfBirth, gender, occupation }: Patient) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const addPatient = (patient: NewPatient): NewPatient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };
  data.push(newPatient);
  return newPatient;
};

export default { getPatients, getNonSensistivePatients, addPatient };
