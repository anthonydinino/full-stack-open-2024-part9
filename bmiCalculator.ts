interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

/**
 * @param height in centimeters
 * @param weight in kilograms
 * @returns string
 */
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  }
  if (bmi < 24.9) {
    return "Normal (healthy weight)";
  }
  if (bmi < 29.9) {
    return "Overwight";
  }
  if (bmi > 30) {
    return "Obese";
  }
  return "Something went wrong with calculation";
};

const { height, weight }: BmiValues = parseArguments(process.argv);
console.log(calculateBmi(height, weight));
