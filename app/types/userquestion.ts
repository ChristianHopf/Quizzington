export type UserQuestion = {
  Choice: {
    id: string;
    text: string;
    order_num: number;
    questionId: string | null;
  }[];
  id: string;
  text: string;
  type: string;
  order_num: number;
};
