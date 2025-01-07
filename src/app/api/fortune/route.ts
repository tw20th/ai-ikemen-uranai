import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  try {
    let fortune;

    if (category) {
      // 指定されたカテゴリの占い結果を取得
      fortune = await prisma.fortune.findFirst({
        where: { category },
        orderBy: { createdAt: "desc" },
      });
    } else {
      // カテゴリが指定されていない場合はランダムに取得
      const allFortunes = await prisma.fortune.findMany();
      if (allFortunes.length > 0) {
        fortune = allFortunes[Math.floor(Math.random() * allFortunes.length)];
      }
    }

    if (!fortune) {
      return NextResponse.json(
        { error: "占い結果が見つかりません。" },
        { status: 404 }
      );
    }

    return NextResponse.json(fortune);
  } catch (error) {
    console.error("Error fetching fortune:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
