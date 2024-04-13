import type { UserQuestion } from "./userquestion";

export type UserQuiz = {
  title: string;
  questions: UserQuestion[];
};