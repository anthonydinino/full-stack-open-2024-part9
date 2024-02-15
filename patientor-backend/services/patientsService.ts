import { Patient } from "../types";
import data from "../data/patients";

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

export default { getPatients, getNonSensistivePatients };
