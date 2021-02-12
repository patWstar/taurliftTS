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

const validateName = ({ name, nameCriteria }: NameProps): boolean => {
  return name.length >= nameCriteria.min && name.length <= nameCriteria.max
    ? true
    : false;
};

const validateNumericValue = ({
  value,
  valueCriteria,
}: NumericValueProps): boolean => {
  return value >= valueCriteria.min && value <= valueCriteria.max
    ? true
    : false;
};

// Basic login check. Rest of the responses are created by the server

export const validateLogin = (userCredentials: UserCredentials): string[] => {
  const errors: string[] = [];

  isEmpty(userCredentials.email) && errors.push("Username can't be empty");
  isEmpty(userCredentials.password) && errors.push("Password can't be empty");

  return errors;
};

//Create Workout validator.

interface Exercise {
  workoutName: string;
  exerciseName: string;
  setGoal: number;
}
interface Criteria {
  min: number;
  max: number;
}
interface ValidCriteria {
  workoutName: Criteria;
  exerciseName: Criteria;
  setGoal: Criteria;
}

export const validateExercise = (
  createdExercise: Exercise,
  validCriteria: ValidCriteria
): string[] => {
  const errors: string[] = [];

  const { exerciseName, workoutName, setGoal } = createdExercise;

  !validateName({
    name: workoutName,
    nameCriteria: validCriteria.workoutName,
  }) &&
    errors.push(
      `Workout Name must be between ${validCriteria.workoutName.min} and ${validCriteria.workoutName.max} letters.`
    );

  !validateName({
    name: exerciseName,
    nameCriteria: validCriteria.exerciseName,
  }) &&
    errors.push(
      `Exercise Name must be between ${validCriteria.exerciseName.min} and ${validCriteria.exerciseName.max} letters.`
    );

  !validateNumericValue({
    value: setGoal,
    valueCriteria: validCriteria.setGoal,
  }) &&
    errors.push(
      `Set number must be between ${validCriteria.setGoal.min} and ${validCriteria.setGoal.max}`
    );

  return errors;
};

//Calculator validators
interface CalorieValidatorProps {
  inputs: { userHeight: number; userWeight: number; userAge: number };
  inputsCriteria: {
    userHeightCriteria: {
      min: number;
      max: number;
    };
    userWeightCriteria: {
      min: number;
      max: number;
    };
    userAgeCriteria: {
      min: number;
      max: number;
    };
  };
}

//Calories
export const calorieValidator = ({
  inputs,
  inputsCriteria,
}: CalorieValidatorProps) => {
  const errors = [];

  const { userAge, userHeight, userWeight } = inputs;

  const {
    userAgeCriteria,
    userHeightCriteria,
    userWeightCriteria,
  } = inputsCriteria;

  !validateNumericValue({ value: userAge, valueCriteria: userAgeCriteria }) &&
    errors.push(
      `Age must be between ${userAgeCriteria.min} and ${userAgeCriteria.max}`
    );
  !validateNumericValue({
    value: userHeight,
    valueCriteria: userHeightCriteria,
  }) &&
    errors.push(
      `Height must be between ${userHeightCriteria.min} and ${userHeightCriteria.max}`
    );
  !validateNumericValue({
    value: userWeight,
    valueCriteria: userWeightCriteria,
  }) &&
    errors.push(
      `Weight must be between ${userWeightCriteria.min} and ${userWeightCriteria.max}`
    );

  return errors;
};

interface MacroValidatorProps {
  inputs: {
    userCalories: number;
    userProtein: number;
    userCarbs: number;
    userFats: number;
  };
  inputsCriteria: {
    userCaloriesCriteria: {
      min: number;
      max: number;
    };
    userProteinCriteria: {
      min: number;
      max: number;
    };
    userCarbsCriteria: {
      min: number;
      max: number;
    };
    userFatsCriteria: {
      min: number;
      max: number;
    };
    percentSum: number;
  };
}
//Macros
export const macronutrientValidator = ({
  inputs,
  inputsCriteria,
}: MacroValidatorProps): string[] => {
  const errors = [];

  const { userCalories, userProtein, userCarbs, userFats } = inputs;

  const {
    userCaloriesCriteria,
    userProteinCriteria,
    userCarbsCriteria,
    userFatsCriteria,
    percentSum,
  } = inputsCriteria;

  !validateNumericValue({
    value: userCalories,
    valueCriteria: userCaloriesCriteria,
  }) &&
    errors.push(
      `Calories must be between ${userCaloriesCriteria.min} and ${userCaloriesCriteria.max}`
    );
  !validateNumericValue({
    value: userProtein,
    valueCriteria: userProteinCriteria,
  }) &&
    errors.push(
      `Proteins must be between ${userProteinCriteria.min} and ${userProteinCriteria.max}`
    );
  !validateNumericValue({
    value: userCarbs,
    valueCriteria: userCarbsCriteria,
  }) &&
    errors.push(
      `Carbs must be between ${userCarbsCriteria.min} and ${userCarbsCriteria.max}`
    );
  !validateNumericValue({ value: userFats, valueCriteria: userFatsCriteria }) &&
    errors.push(
      `Fats must be between ${userFatsCriteria.min} and ${userFatsCriteria.max}`
    );
  Number(userProtein) + Number(userCarbs) + Number(userFats) !==
    Number(percentSum) && errors.push("Percentages must add up to a full 100%");

  return errors;
};

interface BMIValidatorProps {
  inputs: { userHeight: number; userWeight: number };
  inputsCriteria: {
    userHeightCriteria: {
      min: number;
      max: number;
    };
    userWeightCriteria: {
      min: number;
      max: number;
    };
  };
}
//BMI

export const BMIValidator = ({
  inputs,
  inputsCriteria,
}: BMIValidatorProps): string[] => {
  const errors = [];

  const { userHeight, userWeight } = inputs;

  const { userHeightCriteria, userWeightCriteria } = inputsCriteria;

  !validateNumericValue({
    value: userHeight,
    valueCriteria: userHeightCriteria,
  }) &&
    errors.push(
      `Height must be between ${userHeightCriteria.min} and ${userHeightCriteria.max}`
    );
  !validateNumericValue({
    value: userWeight,
    valueCriteria: userWeightCriteria,
  }) &&
    errors.push(
      `Weight must be between ${userWeightCriteria.min} and ${userWeightCriteria.max}`
    );

  return errors;
};
