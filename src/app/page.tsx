"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header"; // ヘッダーコンポーネントをインポート
import Footer from "@/components/Footer"; // フッターコンポーネントをインポート

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
      const response = await fetch("/api/auth/status", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache", // キャッシュ無効化
        },
      });
      const data = await response.json();

      if (data.isLoggedIn) {
        setUser(data.user); // ユーザー情報をセット
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("ログイン状態の取得に失敗しました:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserStatus();
  }, []);

  if (loading) {
    return <p className="text-center mt-8">読み込み中...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header user={user} /> {/* ユーザー情報をヘッダーに渡す */}

      <main className="flex-1 text-center mt-8">
        {user ? (
          <>
            <h2 className="text-3xl font-bold mb-4">おかえりなさい、{user.name}さん！</h2>
            <p className="mb-8 text-gray-600">今日の運勢を占ってみましょう！</p>
            <Link href="/fortune">
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
              <Link href="/fortune">
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

      <Footer /> {/* フッターコンポーネントを追加 */}
    </div>
  );
}
