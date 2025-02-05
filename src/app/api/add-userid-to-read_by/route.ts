import { NextResponse } from "next/server";
import { Report } from "@/db/mongoDB/report-schema";

export async function POST(request: Request) {
  const { userId, id } = await request.json();

  const updatedPost = await Report.findByIdAndUpdate(id, {
    $set: {
      read_by: userId,
    },
  });

  return NextResponse.json(updatedPost);
}
