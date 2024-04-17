import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const requestJson = await request.json();
    console.log(requestJson);
    const answers = await prisma.quiz.findUnique({
      where: {
        id: requestJson.quizId,
      },
      include: {
        Question: {
          select: {
            correct_choice: true,
          },
          orderBy: {
            order_num: "asc",
          },
        },
      },
    });

    if (!answers) {
      throw new Error(`Quiz with ID ${requestJson.quizId} not found.`);
    }
    const correct = answers.Question.map(
      (question) => question.correct_choice
    ).flat();

    const score = [];
    for (let i = 0; i < requestJson.questionChoices.length; i++) {
      requestJson.questionChoices[i] === correct[i]
        ? score.push(1)
        : score.push(0);
    }
    console.log(score);
    return NextResponse.json(score);
    // // Fetch correct answers
    // const res = await axios.post("http://localhost:5000/answers", requestJson);
    // console.log("Choices submitted successfully, correct answers:", res.data);

    // return NextResponse.json(res.data);
  } catch (err) {
    console.error("Error posting quiz: ", err);
    return NextResponse.error();
  }
}
