import { ChangeEvent, SyntheticEvent, Dispatch, SetStateAction } from "react";
import { useState } from "react";
import diaryService from "../../services/diaryService";
import { DiaryEntry, Visibility, Weather } from "../types";
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
      setFormData({ ...formData, date: "", comment: "" });
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
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <br />
        <fieldset
          style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
        >
          <b style={{ marginRight: "1rem" }}>visibility</b>
          {Object.values(Visibility)
            .map((v) => v.toString())
            .map((v) => (
              <div key={v}>
                <label style={{ marginLeft: "0.5rem" }} htmlFor={v}>
                  {v}
                </label>
                <input
                  type="radio"
                  name="visibility"
                  id={v}
                  value={v}
                  onChange={handleChange}
                />
              </div>
            ))}
        </fieldset>
        <fieldset
          style={{ marginTop: "1rem", display: "flex", alignItems: "center" }}
        >
          <b style={{ marginRight: "1rem" }}>weather</b>
          {Object.values(Weather)
            .map((w) => w.toString())
            .map((w) => (
              <div key={w}>
                <label style={{ marginLeft: "0.5rem" }} htmlFor={w}>
                  {w}
                </label>
                <input
                  type="radio"
                  name="weather"
                  id={w}
                  value={w}
                  onChange={handleChange}
                />
              </div>
            ))}
        </fieldset>
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
