export type Question = {
  text: string;
  type: string; // Assuming type can only be 'mc' or 'tf'
  choices: string[] | null;
  correct_choice: number;
  order_num: number;
};
