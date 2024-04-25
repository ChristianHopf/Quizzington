import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const quizzes = await prisma.quiz.findMany({
      where: {
        author: {
          email: session?.user?.email,
        },
      },
      include: {
        Question: {
          select: {
            id: true,
            text: true,
            type: true,
            order_num: true,
            Choice: true,
          },
        },
      },
    });
    console.log(quizzes);
    console.log(JSON.stringify(quizzes));
    return NextResponse.json(quizzes);
  } catch (error) {
    console.error("Error fetching quiz:", error);
    throw error;
  }
  //   console.log(params.id);
  //   const res = await axios.get(`http://localhost:5000/quiz/${params.id}`);
  //   // console.log("Quiz:", res.data);
  //   return NextResponse.json(res.data);
  // } catch (err) {
  //   console.error("Error: ", err);
  //   return NextResponse.error();
  // }
}
