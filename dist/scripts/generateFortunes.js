import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function generateFortunes() {
    const categories = ["恋愛運", "仕事運", "健康運", "金運"];
    const messages = [
        "今日は絶好調！新しい挑戦にぴったりの日です。",
        "集中力が高まり、結果を出せる日。",
        "健康面に注意！リラックスして過ごしましょう。",
        "金運がアップ！買い物を楽しみましょう。",
    ];
    for (let i = 0; i < 20; i++) {
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        await prisma.fortune.create({
            data: {
                category: randomCategory,
                message: randomMessage,
            },
        });
    }
    console.log("データ生成が完了しました！");
}
generateFortunes();
