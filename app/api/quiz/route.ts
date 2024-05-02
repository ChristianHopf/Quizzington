import { Quiz } from "@/app/types/quiz";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions";

export async function POST(
  request: NextRequest,
  { params }: { params: { quiz: Quiz } }
) {
  try {
    const requestJson = await request.json();
    const session = await getServerSession(authOptions);
    console.log(session);
    // Post quiz
    const quiz = await prisma.quiz.create({
      data: {
        title: requestJson.title,
        length: requestJson.questions.length,
        author: { connect: { email: session?.user?.email ?? "" } },
      },
    });

    // Post each question
    for (const questionData of requestJson.questions) {
      const question = await prisma.question.create({
        data: {
          text: questionData.text,
          type: questionData.type,
          correct_choice: questionData.correct_choice,
          order_num: questionData.order_num,
          quizId: quiz.id,
        },
      });

      // Post each choice for each multiple_choice question
      if (questionData.type === "multiple_choice") {
        for (const [index, choiceText] of questionData.choices.entries()) {
          // console.log(questionData);
          await prisma.choice.create({
            data: {
              text: choiceText,
              order_num: index,
              questionId: question.id,
            },
          });
        }
      }
    }
    // console.log(quiz.id);
    return NextResponse.json(quiz.id);
    // const quiz = await request.json();
    // console.log(quiz);
    // const res = await axios.post("http://localhost:5000/quiz", quiz);
    // console.log("Quiz sent successfully:", res.data);
    // return NextResponse.json(res.data);
  } catch (err) {
    console.error("Error posting quiz: ", err);
    return NextResponse.error();
  }
}
