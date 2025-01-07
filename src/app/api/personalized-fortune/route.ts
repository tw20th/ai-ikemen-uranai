import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 最新のユーザー情報を取得
    const user = await prisma.user.findFirst({
      orderBy: { createdAt: "desc" },
    });

    if (!user) {
      return NextResponse.json(
        { error: "ユーザーが登録されていません。" },
        { status: 404 }
      );
    }

    // ユーザー情報に基づいてカスタマイズされた占い結果を生成
    const age = new Date().getFullYear() - new Date(user.birthday).getFullYear();
    const fortune = {
      story: `${user.name}さん、${age}歳のあなたにとって今日は特別な日です！`,
      advice: "新しい挑戦をすると運気が上昇するでしょう。",
    };

    return NextResponse.json(fortune);
  } catch (error) {
    console.error("Error generating personalized fortune:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
}
