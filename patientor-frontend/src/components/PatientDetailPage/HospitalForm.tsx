import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { Entry, EntryType, Patient } from "../../types";
import patientService from "../../services/patients";
import axios, { AxiosError } from "axios";

interface HostpitalFormProps {
  id: Entry["id"];
  patient: Patient;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

const HostpitalForm = ({
  id,
  patient,
  setPatient,
  setErrorMsg,
}: HostpitalFormProps) => {
  const initialFormState = {
    description: "",
    date: "",
    specialist: "",
    diagnosisCodes: "",
    dischargeDate: "",
    dischargeCriteria: "",
  };
  const [formData, setFormData] = useState(initialFormState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    patientService
      .addEntry(
        {
          ...formData,
          type: EntryType.Hospital,
          diagnosisCodes: formData.diagnosisCodes
            ? formData.diagnosisCodes?.split(",").map((c) => c.trim())
            : [],
          discharge: {
            date: formData.date,
            criteria: formData.dischargeCriteria,
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
            <h4>New Hospital Entry</h4>
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
              name="diagnosisCodes"
              value={formData.diagnosisCodes}
              label="Diagnosis Codes"
              variant="standard"
            />
            <h4>Discharge</h4>
            <TextField
              onChange={handleChange}
              name="dischargeDate"
              value={formData.dischargeDate}
              type="date"
              variant="standard"
            />
            <TextField
              onChange={handleChange}
              name="dischargeCriteria"
              value={formData.dischargeCriteria}
              label="Criteria"
              variant="standard"
            />
            <br />
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Button type="submit" variant="contained">
                Add
              </Button>
              <Button
                variant="contained"
                onClick={() => setFormData(initialFormState)}
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

export default HostpitalForm;
