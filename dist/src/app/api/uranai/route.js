import { NextResponse } from "next/server";
import OpenAI from "openai";
// OpenAI API 設定
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // 環境変数からAPIキーを取得
});
// API ハンドラー関数
export async function GET() {
    try {
        // OpenAI APIにリクエスト
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: "こんにちは、今日の運勢を教えて！" }],
            max_tokens: 100,
        });
        // レスポンスを返す
        return NextResponse.json({ result: completion.choices[0].message.content });
    }
    catch (error) {
        console.error("Error creating completion:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
