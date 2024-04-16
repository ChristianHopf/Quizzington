export type UserQuestion = {
    question_text: string;
    question_type: "multiple_choice" | "true_false"; // Assuming type can only be 'mc' or 'tf'
    choices: string[] | null;
    question_order_num: number;
  };
  