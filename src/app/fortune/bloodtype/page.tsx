"use client";

import { useSearchParams } from "next/navigation";
import BackButton from "@/components/BackButton"; // 修正されたインポートパス

export default function HoroscopePage() {
  const searchParams = useSearchParams();
  const theme = searchParams.get("theme");

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">星座占い</h1>
      <p className="text-center">
        あなたが選んだテーマは「{theme}」です！
      </p>
      <p className="text-center mt-4">占い結果を表示するロジックをここに追加します。</p>
      <div className="text-center">
        <BackButton />
      </div>
    </div>
  );
}
