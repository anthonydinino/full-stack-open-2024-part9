import axios from "axios";
import { DiaryEntry } from "../src/types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAllDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createDiaryEntry = async (newDiaryEntry: unknown) => {
  if (newDiaryEntry && typeof newDiaryEntry === "object") {
    const response = await axios.post(baseUrl, newDiaryEntry);
    return response.data;
  } else {
    throw new Error("Form data doesn't exist or is malformatted");
  }
};

export default { getAllDiaryEntries, createDiaryEntry };
