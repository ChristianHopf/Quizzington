import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import axios from "axios";
import prisma from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: params.id,
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
    console.log(quiz);
    console.log(JSON.stringify(quiz));
    return NextResponse.json(quiz);
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
