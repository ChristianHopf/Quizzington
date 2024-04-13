import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";
import axios from "axios";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log(params.id);
    const res = await axios.get(`http://localhost:5000/quiz/${params.id}`);
    // console.log("Quiz:", res.data);
    return NextResponse.json(res.data);
  } catch (err) {
    console.error("Error: ", err);
    return NextResponse.error();
  }
}
