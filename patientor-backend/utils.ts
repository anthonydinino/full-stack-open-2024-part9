import {
  Entry,
  EntryType,
  Gender,
  NewEntry,
  NewPatient,
  Diagnosis,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from "./types";

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
      name: parseString(obj.name, "name"),
      dateOfBirth: parseString(obj.dateOfBirth, "dateOfBirth"),
      ssn: parseString(obj.ssn, "ssn"),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
      entries: parseEntries(obj.entries),
    };
    return newPatient;
  }
  throw new Error("Incorrect data: some fields are missing");
};

export const toNewEntry = (obj: unknown): NewEntry => {
  if (!obj || typeof obj !== "object" || !("type" in obj)) {
    throw new Error("Incorrect or missing data");
  }

  const typedObj = obj as NewEntry;

  const baseEntry = {
    description: parseString(typedObj.description, "description"),
    date: parseString(typedObj.date, "date"),
    specialist: parseString(typedObj.specialist, "specialist"),
    diagnosisCodes: parseDiagnosisCodes(typedObj.diagnosisCodes),
  };

  switch (typedObj.type) {
    case EntryType.Hospital:
      return {
        ...baseEntry,
        type: typedObj.type,
        discharge: parseDischarge(typedObj.discharge),
      };
    case EntryType.OccupationalHealthCare:
      return {
        ...baseEntry,
        type: typedObj.type,
        employerName: parseString(typedObj.employerName, "employerName"),
        sickLeave: parseSickLeave(typedObj.sickLeave),
      };
    case EntryType.HealthCheck:
      return {
        ...baseEntry,
        type: typedObj.type,
        healthCheckRating: parseHealthCheckRating(typedObj.healthCheckRating),
      };
    default:
      assertNever(typedObj);
  }
  throw new Error("Something bad happened");
};

const isString = (text: unknown): text is string => {
  return (typeof text === "string" || text instanceof String) && Boolean(text);
};

const parseDischarge = (object: unknown): Discharge => {
  if (
    object &&
    typeof object === "object" &&
    "date" in object &&
    "criteria" in object &&
    isString(object.date) &&
    isString(object.criteria)
  ) {
    return object as Discharge;
  } else {
    throw new Error(
      "Value of discharge missing or incorrect " + JSON.stringify(object)
    );
  }
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (
    object &&
    typeof object === "object" &&
    "startDate" in object &&
    "endDate" in object &&
    isString(object.startDate) &&
    isString(object.endDate)
  ) {
    return object as SickLeave;
  } else {
    throw new Error(
      "Value of sickLeave missing or incorrect " + JSON.stringify(object)
    );
  }
};

const parseHealthCheckRating = (object: unknown): HealthCheckRating => {
  switch (object) {
    case HealthCheckRating.Healthy:
    case HealthCheckRating.LowRisk:
    case HealthCheckRating.HighRisk:
    case HealthCheckRating.CriticalRisk:
      return object;
    default:
      throw new Error("Value of healthCheckRating incorrect: " + object);
  }
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!Array.isArray(object)) return [] as Array<Diagnosis["code"]>;
  return object as Array<Diagnosis["code"]>;
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

const parseString = (name: unknown, field: string): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing " + field);
  }
  return name;
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

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default toNewPatient;
