import { isANumber } from "./helper";
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
  const isValid = args.slice(2).every((n) => isANumber(n));
  if (isValid) {
    return args.slice(2).map((n) => Number(n));
  } else {
    throw new Error("Arguments must all be numbers [target] [hours...]");
  }
};

const calculateExercises = (hours: number[], target: number): Result => {
  const average = hours.reduce((a, c) => a + c, 0) / hours.length;
  const difference = average - target;

  let rating = 3;
  if (difference < 0) {
    rating = 2;
  } else if (difference < -1) {
    rating = 1;
  }

  let ratingDescription = "";
  switch (rating) {
    case 1:
      ratingDescription = "you need to try a bit harder to reach your target";
      break;
    case 2:
      ratingDescription = "not too bad but could be better";
      break;
    case 3:
      ratingDescription = "nice work, keep going";
      break;
    default:
      throw new Error("Rating calculation went wrong");
  }

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((h) => h != 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const args: number[] = parseArguments(process.argv);
console.log(calculateExercises(args.slice(1), args[0]));
