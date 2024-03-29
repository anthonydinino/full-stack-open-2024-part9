import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, EntryType, Gender, Patient } from "../../types";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Typography,
} from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import EntryDetails from "./EntryDetails";
import HealthCheckForm from "./HealthCheckForm";
import HostpitalForm from "./HospitalForm";
import OccupationHealthForm from "./OccupationalHealthForm";

const PatientDetailPage = () => {
  const params = useParams();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnosesInfo, setDiagnosesInfo] = useState<Diagnosis[] | null>(null);

  useEffect(() => {
    patientService.getOne(params.id || "").then((data) => {
      setPatient(data);
    });
    diagnosesService.getDiagnosesInfo().then((data) => setDiagnosesInfo(data));
  }, [params.id]);

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case "male":
        return <MaleIcon />;
      case "female":
        return <FemaleIcon />;
      default:
        return <AccessibilityIcon />;
    }
  };

  if (!patient || !params.id) {
    return <p>There is nothing here...</p>;
  }

  return (
    <Card sx={{ padding: "1em", marginTop: "1rem" }}>
      <Container sx={{ display: "flex" }}>
        <Avatar sx={{ marginRight: "1rem" }}>{patient.name.slice(0, 1)}</Avatar>
        <Typography variant="h4" component="h4">
          {patient.name}
        </Typography>
        {getGenderIcon(patient.gender)}
      </Container>
      <Container>
        <p>DOB: {patient.dateOfBirth}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </Container>

      <FormSelection
        id={params.id}
        patient={patient}
        diagnosesInfo={diagnosesInfo}
        setPatient={setPatient}
      />
      <Container>
        <Typography variant="h5" component="h5">
          entries
        </Typography>
        {patient?.entries?.length > 0 && patient.entries ? (
          patient?.entries.map((entry) => {
            return (
              <EntryDetails
                key={entry.id}
                entry={entry}
                diagnosesInfo={diagnosesInfo}
              />
            );
          })
        ) : (
          <p>No entries...</p>
        )}
      </Container>
    </Card>
  );
};

const FormSelection = ({
  id,
  patient,
  diagnosesInfo,
  setPatient,
}: {
  id: string;
  patient: Patient;
  diagnosesInfo: Diagnosis[] | null;
  setPatient: Dispatch<SetStateAction<Patient | null>>;
}) => {
  const [showForm, setShowForm] = useState<string>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const displaySelectedForm = () => {
    switch (showForm) {
      case EntryType.HealthCheck:
        return (
          <HealthCheckForm
            id={id}
            patient={patient}
            diagnosesInfo={diagnosesInfo}
            setPatient={setPatient}
            setErrorMsg={setErrorMsg}
          />
        );
      case EntryType.Hospital:
        return (
          <HostpitalForm
            id={id}
            patient={patient}
            diagnosesInfo={diagnosesInfo}
            setPatient={setPatient}
            setErrorMsg={setErrorMsg}
          />
        );
      case EntryType.OccupationalHealthCare:
        return (
          <OccupationHealthForm
            id={id}
            patient={patient}
            diagnosesInfo={diagnosesInfo}
            setPatient={setPatient}
            setErrorMsg={setErrorMsg}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Box sx={{ mb: "1rem" }}>
        <Button
          variant="outlined"
          onClick={() => setShowForm(EntryType.HealthCheck)}
        >
          Health Check Form
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowForm(EntryType.OccupationalHealthCare)}
        >
          Occupational Health Care Form
        </Button>
        <Button
          variant="outlined"
          onClick={() => setShowForm(EntryType.Hospital)}
        >
          Hospital Form
        </Button>
      </Box>
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {displaySelectedForm()}
      {showForm && (
        <Button size="small" onClick={() => setShowForm("")}>
          Hide
        </Button>
      )}
    </>
  );
};

export default PatientDetailPage;
