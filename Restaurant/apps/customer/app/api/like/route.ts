import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@repo/database/generated/prisma';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  // Get userId from cookie (auth_token)
  const userId = Number(req.cookies.get("auth_token")?.value);
  const { itemId, type } = await req.json();

  if (!userId || !itemId || !type) {
    return NextResponse.json({ error: "Missing fields or not authenticated" }, { status: 400 });
  }

  try {
    const like = await prisma.like.upsert({
      where: {
        userId_itemId: { userId, itemId },
      },
      update: { type },
      create: { userId, itemId, type },
    });
    return NextResponse.json(like);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}