import { Box } from "@mui/material";
import { Diagnosis, Entry, EntryType, HealthCheckRating } from "../../types";
import { assertNever } from "../../utils";
import DiagnosisInformation from "./DiagnosesInformation";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import LocalHospitalTwoToneIcon from "@mui/icons-material/LocalHospitalTwoTone";
import WorkOutlineTwoToneIcon from "@mui/icons-material/WorkOutlineTwoTone";

interface EntryDetailsProps {
  entry: Entry;
  diagnosesInfo: Diagnosis[] | null;
}

const EntryDetails = ({ entry, diagnosesInfo }: EntryDetailsProps) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return (
        <Box sx={{ marginTop: "1rem", border: "1px solid black" }}>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <FavoriteTwoToneIcon
              sx={{ color: getColor(entry.healthCheckRating) }}
            />
            <p>{entry.date}</p>
          </Box>
          <i>{entry.description}</i>
          <DiagnosisInformation entry={entry} diagnosesInfo={diagnosesInfo} />
          <p>Diagnosed by {entry.specialist}</p>
        </Box>
      );
    case EntryType.Hospital:
      return (
        <Box sx={{ marginTop: "1rem", border: "1px solid black" }}>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <LocalHospitalTwoToneIcon sx={{ color: "red" }} />
            <p>{entry.date}</p>
          </Box>
          <i>{entry.description}</i>
          <DiagnosisInformation entry={entry} diagnosesInfo={diagnosesInfo} />
          <p>Diagnosed by {entry.specialist}</p>
        </Box>
      );
    case EntryType.OccupationalHealthCare:
      return (
        <Box sx={{ marginTop: "1rem", border: "1px solid black" }}>
          <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <WorkOutlineTwoToneIcon />
            <p>{entry.date}</p>
            <p>{entry.employerName}</p>
          </Box>
          <i>{entry.description}</i>
          <DiagnosisInformation entry={entry} diagnosesInfo={diagnosesInfo} />
          <p>Diagnosed by {entry.specialist}</p>
        </Box>
      );
    default:
      assertNever(entry);
  }
};

const getColor = (value: HealthCheckRating) => {
  switch (value) {
    case HealthCheckRating.Healthy:
      return "red";
    case HealthCheckRating.LowRisk:
      return "green";
    case HealthCheckRating.HighRisk:
      return "purple";
    case HealthCheckRating.CriticalRisk:
      return "black";
    default:
      assertNever(value);
  }
};

export default EntryDetails;
