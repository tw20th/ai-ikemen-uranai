"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ルーターを利用

export default function FortunePage() {
  const router = useRouter(); // ルーターのインスタンス
  const [selectedType, setSelectedType] = useState<string>(""); // 占いの種類
  const [selectedTheme, setSelectedTheme] = useState<string>(""); // 占いのテーマ
  const [error, setError] = useState<string | null>(null); // エラーメッセージ

  const handleFortune = () => {
    if (!selectedType || !selectedTheme) {
      setError("占いの種類とテーマを選択してください。");
      return;
    }

    // 選択された種類に応じてページ遷移
    switch (selectedType) {
      case "タロット占い":
        router.push(`/fortune/tarot?theme=${selectedTheme}`);
        break;
      case "星座占い":
        router.push(`/fortune/horoscope?theme=${selectedTheme}`);
        break;
      case "血液型占い":
        router.push(`/fortune/bloodtype?theme=${selectedTheme}`);
        break;
      default:
        setError("不明な占いの種類です。");
    }
  };

  const types = ["タロット占い", "星座占い", "血液型占い"];
  const themes = ["恋愛", "金運", "健康", "仕事", "対人運"];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">占いページ</h1>

      {/* 占いの種類 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">占いの種類</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {types.map((type) => (
            <div
              key={type}
              onClick={() => setSelectedType(type)}
              className={`p-4 border rounded-lg shadow cursor-pointer ${
                selectedType === type ? "bg-blue-500 text-white" : "bg-white"
              }`}
            >
              {type}
            </div>
          ))}
        </div>
      </div>

      {/* 占いのテーマ */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">占いのテーマ</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {themes.map((theme) => (
            <div
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              className={`p-4 border rounded-lg shadow cursor-pointer ${
                selectedTheme === theme ? "bg-green-500 text-white" : "bg-white"
              }`}
            >
              {theme}
            </div>
          ))}
        </div>
      </div>

      {/* 占いボタン */}
      <div className="text-center">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg"
          onClick={handleFortune}
        >
          占いを始める
        </button>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div className="mt-6 text-center text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
