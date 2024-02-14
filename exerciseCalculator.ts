interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

type rating = 1 | 2 | 3;

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
