"use client";
import { useState } from "react";
const categories = ["恋愛運", "仕事運", "健康運", "金運"];
export default function AlternatePage() {
    const [selectedCategory, setSelectedCategory] = useState(categories[0]); // 初期カテゴリ
    const [fortune, setFortune] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchFortune = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/fortune?category=${selectedCategory}`);
            const data = await response.json();
            setFortune(data);
        }
        catch (error) {
            console.error("Error fetching fortune:", error);
        }
        finally {
            setLoading(false);
        }
    };
    return (<div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">データベース占い</h1>
      <p className="mb-4">カテゴリを選んで占い結果を確認しましょう！</p>

      {/* カテゴリ選択 */}
      <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="mb-4 px-4 py-2 border rounded">
        {categories.map((category) => (<option key={category} value={category}>
            {category}
          </option>))}
      </select>

      {/* 占いボタン */}
      <button onClick={fetchFortune} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        占いを見る
      </button>

      {/* ローディング */}
      {loading && <p className="mt-4 text-gray-600">占い中...</p>}

      {/* 結果表示 */}
      {fortune && (<div className="mt-4 p-4 border rounded shadow-lg">
          <h2 className="text-xl font-semibold">{fortune.category}</h2>
          <p className="mt-2 text-gray-800">{fortune.message}</p>
        </div>)}
    </div>);
}
