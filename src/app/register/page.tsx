"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, birthday }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("登録が完了しました！占いページに移動します...");
        setTimeout(() => {
          router.push("/alternate"); // 占いページにリダイレクト
        }, 2000);
      } else {
        setMessage(`エラー: ${data.error || "登録に失敗しました。"}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("サーバーエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">アカウント登録</h1>
      <p className="mb-4">名前と誕生日を入力して登録を完了してください。</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded mr-2"
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>
      <button
        onClick={handleRegister}
        className={`px-4 py-2 rounded ${
          loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
        } text-white`}
        disabled={loading}
      >
        {loading ? "登録中..." : "登録"}
      </button>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
