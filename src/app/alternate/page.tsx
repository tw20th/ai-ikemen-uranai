"use client";

import { useEffect, useState } from "react";

type Fortune = {
  story: string;
  advice: string;
};

export default function AlternatePage() {
  const [fortune, setFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPersonalizedFortune = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/personalized-fortune");
      const data = await response.json();

      if (response.ok) {
        setFortune(data);
      } else {
        console.error("Error fetching fortune:", data.error);
        setFortune(null);
      }
    } catch (error) {
      console.error("Error fetching fortune:", error);
      setFortune(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalizedFortune();
  }, []);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">今日の占い</h1>
      {loading && <p className="text-gray-600">占いを生成中...</p>}
      {fortune ? (
        <div className="mt-4 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold">占い結果</h2>
          <p className="mt-2">{fortune.story}</p>
          <p className="mt-4 text-gray-600">アドバイス: {fortune.advice}</p>
        </div>
      ) : (
        <p className="text-red-600">占い結果が表示できませんでした。</p>
      )}
    </div>
  );
}
