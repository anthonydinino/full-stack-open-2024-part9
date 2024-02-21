import {
  Entry,
  NewEntry,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from "../types";
import data from "../data/patients";
import { v1 as uuid } from "uuid";

const getPatients = (): Patient[] => {
  return data;
};

const getPatient = (id: string) => {
  return data.find((p) => p.id === id);
};

const getNonSensistivePatients = (): NonSensitivePatient[] => {
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

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry,
  };
  const foundPatient = data.findIndex((p) => p.id === id);

  if (foundPatient >= 0) {
    data[foundPatient].entries.push(newEntry);
  } else {
    throw new Error("ID doesn't exist");
  }

  return newEntry;
};

export default {
  getPatients,
  getPatient,
  getNonSensistivePatients,
  addPatient,
  addEntry,
};
