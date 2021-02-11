//Those are just basic FrontEnd validators. Better and safer authentication is present on the backend.
//Further signup and login validation happens in the backend.
const passwordMin: number = 6;
const passwordMax: number = 12;
//Authentication
//Basic signup validation before sending requests to the backend.
//~~~~~~~~~~~~~~~~~~~Interfaces & types
interface NewUserCredentialsProps {
  email: string;
  password: string;
  confirmPassword: string;
}

interface NameProps {
  name: string;
  nameCriteria: {
    min: number;
    max: number;
  };
}

interface NumericValueProps {
  value: number;
  valueCriteria: { min: number; max: number };
}

interface UserCredentials {
  email: string;
  password: string;
}
//~~~~~~~~~~~~~~~~~~~Shared validators
const isEmail = (email: string): boolean => {
  const regEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regEx) ? true : false;
};

const isEmpty = (string: string): boolean =>
  string.trim() === "" ? true : false;

//~~~~~~~~~~~~~~~~~~~Main Validator for Signup
export const validateSignupCredentials = (
  newUserCredentials: NewUserCredentialsProps
) => {
  const errors: string[] = [];

  !!isEmpty &&
    (isEmpty(newUserCredentials.email) ||
      isEmpty(newUserCredentials.password)) &&
    errors.push("Please fill out every window.");

  //E-mail regex check
  !isEmail(newUserCredentials.email) && errors.push("Incorrect e-mail format.");

  //Password length check
  (newUserCredentials.password.length < passwordMin ||
    newUserCredentials.password.length > passwordMax) &&
    errors.push(
      `Password must be between ${passwordMin} and ${passwordMax} letters.`
    );

  //Matching passwords check
  newUserCredentials.password !== newUserCredentials.confirmPassword &&
    errors.push("Passwords must match.");

  return errors;
};

// const validateName = ({ name, nameCriteria }: NameProps): boolean => {
//   return name.length >= nameCriteria.min && name.length <= nameCriteria.max
//     ? true
//     : false;
// };

// const validateNumericValue = ({
//   value,
//   valueCriteria,
// }: NumericValueProps): boolean => {
//   return value >= valueCriteria.min && value <= valueCriteria.max
//     ? true
//     : false;
// };
//Basic login check. Rest of the responses are created by the server

export const validateLogin = (userCredentials: UserCredentials): string[] => {
  const errors: string[] = [];

  isEmpty(userCredentials.email) && errors.push("Username can't be empty");
  isEmpty(userCredentials.password) && errors.push("Password can't be empty");

  return errors;
};

// //Create Workout validator.
// export const validateExercise = (createdWorkout, validCriteria) => {
//   const errors = [];

//   const {
//     workoutName: workoutNameCriteria,
//     exerciseName: exerciseNameCriteria,
//     setGoal: setGoalCriteria,
//   } = validCriteria;

//   const { exerciseName, workoutName, setGoal } = createdWorkout;

//   !validateName(workoutName, workoutNameCriteria) &&
//     errors.push(
//       `Workout Name must be between ${workoutNameCriteria.min} and ${workoutNameCriteria.max} letters.`
//     );

//   !validateName(exerciseName, exerciseNameCriteria) &&
//     errors.push(
//       `Exercise Name must be between ${workoutNameCriteria.min} and ${workoutNameCriteria.max} letters.`
//     );

//   !validateNumericValue(setGoal, setGoalCriteria) &&
//     errors.push(
//       `Set number must be between ${setGoalCriteria.min} and ${setGoalCriteria.max}`
//     );

//   return errors;
// };
// //CustomWorkouts as a whole are validated on the server

// //Calculator validators

// //Calories
// export const calorieValidator = (inputs, inputsCriteria) => {
//   const errors = [];

//   const { userAge, userHeight, userWeight } = inputs;

//   const {
//     userAge: userAgeCriteria,
//     userHeight: userHeightCriteria,
//     userWeight: userWeightCriteria,
//   } = inputsCriteria;

//   !validateNumericValue(userAge, userAgeCriteria) &&
//     errors.push(
//       `Age must be between ${userAgeCriteria.min} and ${userAgeCriteria.max}`
//     );
//   !validateNumericValue(userHeight, userHeightCriteria) &&
//     errors.push(
//       `Height must be between ${userHeightCriteria.min} and ${userHeightCriteria.max}`
//     );
//   !validateNumericValue(userWeight, userWeightCriteria) &&
//     errors.push(
//       `Weight must be between ${userWeightCriteria.min} and ${userWeightCriteria.max}`
//     );

//   return errors;
// };

// //Macros
// export const macronutrientValidator = (inputs, inputsCriteria) => {
//   const errors = [];

//   const { userCalories, userProtein, userCarbs, userFats } = inputs;

//   const {
//     userCalories: userCaloriesCriteria,
//     userProtein: userProteinCriteria,
//     userCarbs: userCarbsCriteria,
//     userFats: userFatsCriteria,
//     percentSum,
//   } = inputsCriteria;

//   !validateNumericValue(userCalories, userCaloriesCriteria) &&
//     errors.push(
//       `Calories must be between ${userCaloriesCriteria.min} and ${userCaloriesCriteria.max}`
//     );
//   !validateNumericValue(userProtein, userProteinCriteria) &&
//     errors.push(
//       `Proteins must be between ${userProteinCriteria.min} and ${userProteinCriteria.max}`
//     );
//   !validateNumericValue(userCarbs, userCarbsCriteria) &&
//     errors.push(
//       `Carbs must be between ${userCarbsCriteria.min} and ${userCarbsCriteria.max}`
//     );
//   !validateNumericValue(userFats, userFatsCriteria) &&
//     errors.push(
//       `Fats must be between ${userFatsCriteria.min} and ${userFatsCriteria.max}`
//     );
//   Number(userProtein) + Number(userCarbs) + Number(userFats) !==
//     Number(percentSum) && errors.push("Percentages must add up to a full 100%");

//   return errors;
// };

// //BMI

// export const BMIValidator = (inputs, inputsCriteria) => {
//   const errors = [];

//   const { userHeight, userWeight } = inputs;

//   const {
//     userHeight: userHeightCriteria,
//     userWeight: userWeightCriteria,
//   } = inputsCriteria;

//   !validateNumericValue(userHeight, userHeightCriteria) &&
//     errors.push(
//       `Height must be between ${userHeightCriteria.min} and ${userHeightCriteria.max}`
//     );
//   !validateNumericValue(userWeight, userWeightCriteria) &&
//     errors.push(
//       `Weight must be between ${userWeightCriteria.min} and ${userWeightCriteria.max}`
//     );

//   return errors;
// };
