import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import {
  Diagnosis,
  Entry,
  EntryType,
  HealthCheckRating,
  Patient,
} from "../../types";
import patientService from "../../services/patients";
import axios, { AxiosError } from "axios";
import DiagnosisCodeSelect from "./DiagnosisCodeSelect";

interface HealthCheckFormProps {
  id: Entry["id"];
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
  diagnosesInfo: Diagnosis[] | null;
}

const HealthCheckForm = ({
  id,
  patient,
  setPatient,
  setErrorMsg,
  diagnosesInfo,
}: HealthCheckFormProps) => {
  const initialFormState = {
    description: "",
    date: "",
    specialist: "",
    healthCheckRating: HealthCheckRating.Healthy,
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
          type: EntryType.HealthCheck,
          healthCheckRating: Number(formData.healthCheckRating),
          diagnosisCodes,
        },
        id
      )
      .then((addedEntry) => {
        setPatient({
          ...patient,
          entries: patient.entries.concat(addedEntry),
        });
        setFormData(initialFormState);
        setDiagnosisCodes([]);
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
            <h4>New HealthCheck Entry</h4>
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
              name="specialist"
              value={formData.specialist}
              label="Specialist"
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              name="healthCheckRating"
              value={formData.healthCheckRating}
              label="Health Check Rating"
              variant="standard"
              type="number"
            />
            <DiagnosisCodeSelect
              diagnosesInfo={diagnosesInfo || []}
              diagnosisCodes={diagnosisCodes}
              setDiagnosisCodes={setDiagnosisCodes}
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

export default HealthCheckForm;
