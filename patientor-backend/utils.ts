import { Entry, EntryType, Gender, NewPatient } from "./types";

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== "object") {
    throw new Error("Incorrect or missing data");
  }
  if (
    "name" in obj &&
    "dateOfBirth" in obj &&
    "ssn" in obj &&
    "gender" in obj &&
    "occupation" in obj &&
    "entries" in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      dateOfBirth: parseDob(obj.dateOfBirth),
      ssn: parseSsn(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      entries: parseEntries(obj.entries),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const hasEntryType = (entry: Entry): entry is Entry =>
  Boolean(
    entry.type &&
      isString(entry.type) &&
      Object.values(EntryType)
        .map((e) => e.toString())
        .includes(entry.type)
  );

const parseEntries = (entries: unknown): Entry[] => {
  // Just check if type exists and is correct
  const entryArr = entries as Entry[];
  if (entryArr.some((e: Entry) => !hasEntryType(e))) {
    throw new Error("Missing or wrong type on entry");
  } else return entryArr;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name");
  }
  return name;
};

const parseDob = (dob: unknown): string => {
  if (!isString(dob)) {
    throw new Error("Incorrect or missing DOB");
  }
  return dob;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error("Incorrect or missing SSN");
  }
  return ssn;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation");
  }
  return occupation;
};

export default toNewPatient;
