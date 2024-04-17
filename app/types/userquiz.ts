import type { UserQuestion } from "./userquestion";

export type UserQuiz =
  | ({
      Question: {
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
      }[];
    } & {
      id: string;
      title: string;
    })
  | null;
