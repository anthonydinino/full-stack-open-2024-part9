import { ChangeEvent, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import diaryService from "../../services/diaryService";
import { DiaryEntry } from "../types";

interface DiaryFormProps {
  setEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
  entries: DiaryEntry[];
}

const DiaryEntryForm = ({ setEntries, entries }: DiaryFormProps) => {
  const [formData, setFormData] = useState({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const addDiaryEntry = async (e: SyntheticEvent) => {
    e.preventDefault();
    const newEntry = await diaryService.createDiaryEntry(formData);
    setEntries(entries.concat(newEntry));
    setFormData({ date: "", visibility: "", weather: "", comment: "" });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={addDiaryEntry}>
        <label htmlFor="date">date</label>
        <input
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="visibility">visibility</label>
        <input
          id="visibility"
          name="visibility"
          value={formData.visibility}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="weather">weather</label>
        <input
          id="weather"
          name="weather"
          value={formData.weather}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="comment">comment</label>
        <input
          id="comment"
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default DiaryEntryForm;
