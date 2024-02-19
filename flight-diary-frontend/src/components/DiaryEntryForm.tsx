import { ChangeEvent, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import diaryService from "../../services/diaryService";
import { DiaryEntry } from "../types";
import axios from "axios";

interface DiaryFormProps {
  setEntries: Dispatch<SetStateAction<DiaryEntry[]>>;
  entries: DiaryEntry[];
}

const DiaryEntryForm = ({ setEntries, entries }: DiaryFormProps) => {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [formData, setFormData] = useState({
    date: "",
    visibility: "",
    weather: "",
    comment: "",
  });

  const addDiaryEntry = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const newEntry = await diaryService.createDiaryEntry(formData);
      setEntries(entries.concat(newEntry));
      setFormData({ date: "", visibility: "", weather: "", comment: "" });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data);
        setTimeout(() => setErrorMsg(""), 5000);
      } else {
        console.error(error);
      }
    }
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
      <p style={{ color: "red" }}>{errorMsg}</p>
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
