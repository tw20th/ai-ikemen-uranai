"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ユーザーの型定義
type User = {
  name: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null); // ユーザー状態
  const [loading, setLoading] = useState(true); // ローディング状態

  // サーバーからユーザーのログイン状態を取得する
  const fetchUserStatus = async () => {
    setLoading(true);
    try {
      console.log("Fetching user status..."); // リクエスト開始時にログを表示
      const response = await fetch("/api/auth/status", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache", // キャッシュ無効化
        },
      });
      const data = await response.json();
      console.log("User status response:", data); // レスポンス内容をログ出力

      if (data.isLoggedIn) {
        console.log("User is logged in:", data.user); // ログイン済みの場合のログ
        setUser(data.user); // ユーザー情報をセット
      } else {
        console.log("User is not logged in."); // 未ログインの場合のログ
        setUser(null);
      }
    } catch (error) {
      console.error("ログイン状態の取得に失敗しました:", error); // エラー時のログ
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered!"); // useEffectの発火確認
    fetchUserStatus();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">読み込み中...</p>;
  }

  return (
    <div className="p-4">
      {/* ヘッダー */}
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">占いサイト</h1>
        <nav>
          {user ? (
            <>
              <Link href="/profile" className="mr-4">プロフィール</Link>
              <Link href="/logout" className="text-blue-500">ログアウト</Link>
            </>
          ) : (
            <>
              <Link href="/login" className="mr-4">ログイン</Link>
              <Link href="/register" className="text-blue-500">登録</Link>
            </>
          )}
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="text-center mt-8">
        {user ? (
          <>
            <h2 className="text-3xl font-bold mb-4">おかえりなさい、{user.name}さん！</h2>
            <p className="mb-8 text-gray-600">今日の運勢を占ってみましょう！</p>
            <Link href="/alternate">
              <button className="px-6 py-2 bg-red-500 text-white rounded-lg">
                占いを始める
              </button>
            </Link>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-bold mb-4">あなたの今日の運勢を占いましょう！</h2>
            <p className="mb-8 text-gray-600">登録せずに占いを試すこともできます。</p>
            <div className="space-y-4">
              <Link href="/alternate">
                <button className="px-6 py-2 bg-red-500 text-white rounded-lg">
                  占いを始める
                </button>
              </Link>
              <Link href="/register">
                <button className="px-6 py-2 bg-blue-500 text-white rounded-lg">
                  アカウント登録はこちら
                </button>
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
