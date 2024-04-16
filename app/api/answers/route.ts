import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: NextRequest) {
  try {
    const requestJson = await request.json();
    console.log(requestJson);
    // Fetch correct answers
    const res = await axios.post("http://localhost:5000/answers", requestJson);
    console.log("Choices submitted successfully, correct answers:", res.data);
    
    return NextResponse.json(res.data);
  } catch (err) {
    console.error("Error posting quiz: ", err);
    return NextResponse.error();
  }
}
