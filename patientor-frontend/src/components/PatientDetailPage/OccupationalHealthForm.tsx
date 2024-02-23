import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Diagnosis, Entry, EntryType, Patient } from "../../types";
import patientService from "../../services/patients";
import axios, { AxiosError } from "axios";
import DiagnosisCodeSelect from "./DiagnosisCodeSelect";

interface OccupationHealthProps {
  id: Entry["id"];
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  diagnosesInfo: Diagnosis[] | null;
}

const OccupationHealth = ({
  id,
  patient,
  setPatient,
  setErrorMsg,
  diagnosesInfo,
}: OccupationHealthProps) => {
  const initialFormState = {
    occupation: patient.occupation || "",
    employeeName: "",
    description: "",
    date: "",
    specialist: "",
    sickLeaveStart: "",
    sickLeaveEnd: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    patientService
      .addEntry(
        {
          ...formData,
          type: EntryType.OccupationalHealthCare,
          occupation: formData.occupation,
          employerName: formData.employeeName,
          diagnosisCodes,
          sickLeave: {
            startDate: formData.sickLeaveStart,
            endDate: formData.sickLeaveEnd,
          },
        },
        id
      )
      .then((addedEntry) => {
        setPatient({
          ...patient,
          entries: patient.entries.concat(addedEntry),
        });
        setFormData(initialFormState);
      })
      .catch((error: Error | AxiosError) => {
        if (axios.isAxiosError(error)) {
          setErrorMsg(error.response?.data);
        } else {
          setErrorMsg("Something went wrong");
        }
        setTimeout(() => setErrorMsg(""), 5000);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <Container
        sx={{
          border: "2px dashed black",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ gap: "0.5rem" }}>
            <h4>New Occupational Health Entry</h4>
            <TextField
              onChange={handleChange}
              name="description"
              value={formData.description}
              label="Description"
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              name="date"
              value={formData.date}
              variant="standard"
              type="date"
            />
            <TextField
              onChange={handleChange}
              name="occupation"
              value={formData.occupation}
              label="Occupation"
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              name="employeeName"
              value={formData.employeeName}
              label="Employee Name"
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              name="specialist"
              value={formData.specialist}
              label="Specialist"
              variant="standard"
            />
            <DiagnosisCodeSelect
              diagnosesInfo={diagnosesInfo || []}
              diagnosisCodes={diagnosisCodes}
              setDiagnosisCodes={setDiagnosisCodes}
            />
            <h4>Sick Leave</h4>
            <p>Sick Leave Start Date:</p>
            <TextField
              onChange={handleChange}
              name="sickLeaveStart"
              value={formData.sickLeaveStart}
              type="date"
              variant="standard"
            />
            <p>Sick Leave End Date:</p>
            <TextField
              onChange={handleChange}
              name="sickLeaveEnd"
              value={formData.sickLeaveEnd}
              type="date"
              variant="standard"
            />
            <br />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button type="submit" variant="contained">
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  setFormData(initialFormState);
                  setDiagnosisCodes([]);
                }}
                color="error"
              >
                Cancel
              </Button>
            </Box>
          </FormControl>
        </form>
        <br />
      </Container>
    </>
  );
};

export default OccupationHealth;
