"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, birthday }),
    });

    if (response.ok) {
      // 登録成功時にトップページにリダイレクト
      router.push("/");
    } else {
      console.error("登録に失敗しました");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">アカウント登録</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">名前</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">生年月日</label>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            className="border px-4 py-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          登録
        </button>
      </form>
    </div>
  );
}
