import axios from "axios";
import { apiBaseUrl } from "../constants";

const getDiagnosesInfo = async () => {
  const response = await axios.get(`${apiBaseUrl}/diagnoses`);
  return response.data;
};

export default { getDiagnosesInfo };
