import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category"); // カテゴリを取得

  if (!category) {
    return NextResponse.json(
      { error: "カテゴリが指定されていません。" },
      { status: 400 }
    );
  }

  try {
    // 指定されたカテゴリからランダムに1件取得
    const fortune = await prisma.fortune.findFirst({
      where: { category },
      orderBy: { createdAt: "desc" },
    });

    if (!fortune) {
      return NextResponse.json(
        { error: `カテゴリ「${category}」の占い結果が見つかりません。` },
        { status: 404 }
      );
    }

    return NextResponse.json(fortune);
  } catch (error) {
    console.error("Error fetching fortune:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
