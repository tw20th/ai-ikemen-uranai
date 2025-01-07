import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, birthday } = await request.json();

  // 入力のバリデーション
  if (!name || !birthday) {
    return NextResponse.json(
      { error: "名前と誕生日を入力してください。" },
      { status: 400 }
    );
  }

  try {
    // ユーザーが既に存在するか確認
    let user = await prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      // 存在しない場合は新規作成
      user = await prisma.user.create({
        data: {
          name,
          birthday: new Date(birthday),
        },
      });
    } else {
      return NextResponse.json(
        { error: "この名前は既に登録されています。" },
        { status: 409 } // Conflict
      );
    }

    return NextResponse.json({ message: "登録完了", user });
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json({ error: "サーバーエラーが発生しました。" }, { status: 500 });
  }
}
