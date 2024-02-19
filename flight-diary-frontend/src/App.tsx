import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "./types";
import diaryService from "../services/diaryService";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAllDiaryEntries().then((data) => setEntries(data));
  }, []);
  return (
    <>
      <DiaryEntries entries={entries} />
    </>
  );
}

export default App;
