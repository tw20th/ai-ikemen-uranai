"use client";

import { useState } from "react";

// タロットカードのデータ
const tarotCards = [
  { id: 1, name: "太陽", description: "成功と喜びの象徴。今日はポジティブなエネルギーが満ちています。" },
  { id: 2, name: "月", description: "迷いと直感を表すカード。不安を乗り越える鍵は自分の感覚を信じること。" },
  { id: 3, name: "星", description: "希望と未来を示すカード。努力が報われる兆しが見えます。" },
  { id: 4, name: "死神", description: "終わりと新しい始まりの象徴。変化を受け入れることで新たな道が開けます。" },
  { id: 5, name: "恋人", description: "愛と調和を示すカード。大切な人との関係が深まる日です。" },
];

export default function TarotPage() {
  const [selectedCard, setSelectedCard] = useState<null | { name: string; description: string }>(null);

  const handleCardClick = () => {
    // ランダムでカードを選ぶ
    const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    setSelectedCard(randomCard);
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-6">タロット占い</h1>

      {!selectedCard ? (
        <>
          <p className="mb-4">カードをクリックして、今日の運勢を占いましょう。</p>
          <div className="grid grid-cols-3 gap-4">
            {tarotCards.map((card) => (
              <div
                key={card.id}
                className="bg-gray-200 p-4 rounded-lg shadow cursor-pointer"
                onClick={handleCardClick}
              >
                <div className="w-16 h-24 bg-gray-400 mx-auto mb-2"></div> {/* カードの背面イメージ */}
                <p>カード {card.id}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
          <p className="mt-4 text-gray-600">{selectedCard.description}</p>
          <button
            className="mt-6 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => setSelectedCard(null)}
          >
            戻る
          </button>
        </div>
      )}
    </div>
  );
}
