/**
 * Calculates bmi based on height and weight
 * @param height in centimeters
 * @param weight in kilograms
 * @returns string
 */
const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight (not healthy weight)";
  }
  if (bmi < 24.9) {
    return "Normal (healthy weight)";
  }
  if (bmi < 29.9) {
    return "Overwight (not healthy weight)";
  }
  if (bmi > 30) {
    return "Obese (not healthy weight)";
  }
  return "Something went wrong with calculation";
};

console.log(calculateBmi(180, 74));
