import axios from "axios";
import { DiaryEntry } from "../src/types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaryEntries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export default { getAllDiaryEntries };
