import { DiaryEntry } from "../types";

interface DiaryEntriesProps {
  entries: DiaryEntry[];
}

const DiaryEntries = ({ entries }: DiaryEntriesProps) => {
  return (
    <>
      <h2>Diary Entries</h2>
      {entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p style={{ marginBottom: "0.5rem" }}>
              <b>{entry.date}</b>
            </p>
            <p style={{ margin: 0 }}>visibility: {entry.visibility}</p>
            <p style={{ margin: 0 }}>weather: {entry.weather}</p>
          </div>
        );
      })}
    </>
  );
};

export default DiaryEntries;
