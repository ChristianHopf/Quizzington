import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch quizzes,
    // Only need id for routing and length for displaying question count
    const quizzes = await prisma.quiz.findMany({
      select: {
        id: true,
        title: true,
        length: true,
      },
      take: 10,
    });
    console.log(JSON.stringify(quizzes));
    return NextResponse.json(quizzes);
  } catch (err) {
    console.error("Error fetching quizzes: ", err);
    return NextResponse.error();
  }
}
