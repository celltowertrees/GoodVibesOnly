import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, content } = body;
  const post = await prisma.post.create({
    data: {
      id,
      content,
      authorId: 1,
    },
  });

  return NextResponse.json({ post });
}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json({ posts });
}
