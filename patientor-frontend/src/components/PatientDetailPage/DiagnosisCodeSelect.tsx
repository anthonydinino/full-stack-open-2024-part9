import { Select, MenuItem, SelectChangeEvent } from "@mui/material";
import { Diagnosis } from "../../types";
import { SetStateAction } from "react";

interface Props {
  diagnosesInfo: Diagnosis[];
  diagnosisCodes: Array<Diagnosis["code"]>;
  setDiagnosisCodes: React.Dispatch<SetStateAction<Array<Diagnosis["code"]>>>;
}

const DiagnosisCodeSelect = ({
  diagnosesInfo,
  diagnosisCodes,
  setDiagnosisCodes,
}: Props) => {
  const handleSelectChange = (e: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = e;
    setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <>
      <p style={{ marginBottom: 0 }}>Diagnosis Codes</p>
      <Select
        id="diagnosisCodes"
        multiple
        value={diagnosisCodes}
        onChange={handleSelectChange}
        variant="standard"
      >
        {diagnosesInfo &&
          diagnosesInfo.map(({ code }) => (
            <MenuItem key={code} value={code}>
              {code}
            </MenuItem>
          ))}
      </Select>
    </>
  );
};

export default DiagnosisCodeSelect;
