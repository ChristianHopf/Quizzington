import { Quiz } from "@/app/types/quiz";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(
  request: NextRequest,
  { params }: { params: { quiz: Quiz } }
) {
  try {
    const quiz = await request.json();
    console.log(quiz);
    const res = await axios.post("http://localhost:5000/quiz", quiz);
    console.log("Quiz sent successfully:", res.data);
    return NextResponse.json(res.data);
  } catch (err) {
    console.error("Error posting quiz: ", err);
    return NextResponse.error();
  }
}
