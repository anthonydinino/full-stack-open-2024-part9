import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";
import { Diagnosis, Gender, Patient } from "../../types";
import { Avatar, Card, Container, Typography } from "@mui/material";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import EntryDetails from "./EntryDetails";

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

  if (!patient) {
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

export default PatientDetailPage;
