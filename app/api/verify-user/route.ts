import prisma from "@/lib/prisma";
import { authOptions } from "@/utils/authOptions";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { name: string } }
) {
  const requestJson = await request.json();
  const session = await getServerSession(authOptions);
  // console.log(requestJson);
  const res = await prisma.user.findUnique({
    where: {
      id: requestJson.id,
    },
  });
  // Return true if the quiz authorId matches the authenticated user id
  if (session?.user?.email === res?.email) {
    return NextResponse.json(true);
  }
  return NextResponse.json(false);
}
