export type Question = {
  text: string;
  type: "multiple_choice" | "true_false"; // Assuming type can only be 'mc' or 'tf'
  choices: string[] | null;
  correct_choice: number;
  order: number;
};
