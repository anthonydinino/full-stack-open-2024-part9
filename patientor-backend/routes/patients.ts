import express from "express";
import patientsService from "../services/patientsService";
import { NewEntry, NewPatient } from "../types";
import toNewPatient, { toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.json(patientsService.getNonSensistivePatients());
});

router.get("/:id", (req, res) => {
  res.json(patientsService.getPatient(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedEntry = patientsService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  const newEntry: NewEntry = toNewEntry(req.body);
  try {
    const addedEntry = patientsService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + errorMessage;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
