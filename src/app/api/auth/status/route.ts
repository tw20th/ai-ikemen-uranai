import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Prismaのインスタンスをインポート

export async function GET() {
  // 仮定: ユーザーが認証済みの場合、セッションまたはトークンからユーザーIDを取得する
  const userId = 1; // 仮のユーザーID（セッション管理を導入する際に変更）

  // データベースからユーザー情報を取得
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (user) {
    return NextResponse.json({
      isLoggedIn: true,
      user: { name: user.name },
    });
  } else {
    return NextResponse.json({
      isLoggedIn: false,
      user: null,
    });
  }
}
