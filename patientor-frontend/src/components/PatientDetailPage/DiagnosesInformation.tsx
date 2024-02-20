import { Diagnosis, Entry } from "../../types";

interface DiagnosisInformation {
  entry: Entry | null;
  diagnosesInfo: Diagnosis[] | null;
}

const DiagnosisInformation = ({
  entry,
  diagnosesInfo,
}: DiagnosisInformation) => {
  const getDiagnosisInformation = (code: Diagnosis["code"]) => {
    try {
      return diagnosesInfo?.find((d) => d.code === code)?.name ?? "";
    } catch (error) {
      return "";
    }
  };
  return (
    <ul>
      {entry?.diagnosisCodes?.map((code) => (
        <li key={code}>{code + " " + getDiagnosisInformation(code)}</li>
      ))}
    </ul>
  );
};

export default DiagnosisInformation;
