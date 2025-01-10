"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/fortune")} // 修正したURL
      className="px-4 py-2 bg-gray-500 text-white rounded-lg mt-4"
    >
      戻る
    </button>
  );
}
