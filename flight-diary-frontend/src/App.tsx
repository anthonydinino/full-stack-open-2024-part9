import { useEffect, useState } from "react";
import DiaryEntries from "./components/DiaryEntries";
import { DiaryEntry } from "./types";
import diaryService from "../services/diaryService";
import DiaryEntryForm from "./components/DiaryEntryForm";

function App() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  useEffect(() => {
    diaryService.getAllDiaryEntries().then((data) => setEntries(data));
  }, []);
  return (
    <>
      <DiaryEntryForm setEntries={setEntries} entries={entries} />
      <DiaryEntries entries={entries} />
    </>
  );
}

export default App;
