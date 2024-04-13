export type Question = {
  question_text: string;
  question_type: "multiple_choice" | "true_false"; // Assuming type can only be 'mc' or 'tf'
  choices: string[] | null;
  correct_choice: number;
  question_order_num: number;
};
