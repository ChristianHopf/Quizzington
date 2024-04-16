import type { Question } from "./question";

export type Quiz = {
  title: string;
  questions: Question[];
};