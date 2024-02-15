import { isArrayNumbers } from "./helper";
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseArguments = (args: string[]) => {
  const isValid = isArrayNumbers(args.slice(2));
  if (isValid) {
    return args.slice(2).map((n) => Number(n));
  } else {
    throw new Error("Arguments must all be numbers [target] [hours...]");
  }
};

const calculateRating = (hours: number[], target: number): [number, string] => {
  const score = (hours.filter((h) => h >= target).length / hours.length) * 100;
  if (score >= 100) return [3, "nice work, keep going"];
  if (score > 50) return [2, "not too bad but could be better"];
  else return [1, "bad"];
};

const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((a, c) => a + c, 0) / hours.length;
  const rating = calculateRating(hours, target);

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h != 0).length,
    success: average >= target,
    rating: rating[0],
    ratingDescription: rating[1],
    target,
    average,
  };
};

if (require.main === module) {
  const args: number[] = parseArguments(process.argv);
  console.log(calculateExercises(args.slice(1), args[0]));
}

export default calculateExercises;
