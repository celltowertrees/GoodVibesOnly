import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const hiddenPrompt = process.env.HIDDEN_PROMPT;

const prisma = new PrismaClient();
import { fal } from "@fal-ai/client";

fal.config({
  proxyUrl: "/api/fal/proxy",
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { id, content } = body;

  try {
    const result = await fal.subscribe("fal-ai/any-llm", {
      input: {
        prompt: `${hiddenPrompt} ${content}`,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          console.log(update.logs);
        }
      }
    });

    const output = result.data.output;

    const post = await prisma.post.create({
      data: {
        id,
        content: output,
        authorId: 1,
      },
    });
  
    return NextResponse.json({ post });
  
  } catch (error) {
    console.error(error);
  }

}

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json({ posts });
}
