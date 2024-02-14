import express from "express";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
import { isANumber, isArrayNumbers } from "./helper";

const app = express();

app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isANumber(height) && isANumber(weight)) {
    return res.json({
      weight,
      height,
      bmi: calculateBmi(Number(height), Number(weight)),
    });
  } else {
    return res.json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target)
    return res.json({ error: "parameters missing" });
  if (!isArrayNumbers(daily_exercises) || !isANumber(target))
    return res.json({ error: "malformatted parameters" });
  return res.json(calculateExercises(daily_exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
