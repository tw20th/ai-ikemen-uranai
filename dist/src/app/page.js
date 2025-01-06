import Link from "next/link";
export default function Home() {
    return (<div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">AIイケメン占いサイト</h1>
      <p className="mb-4">今日の運勢をイケメンからお届けします！</p>
      <div className="flex justify-center gap-4">
        <Link href="/alternate">
          <a className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            データベース占いへ
          </a>
        </Link>
        <Link href="/">
          <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            ChatGPT占いへ
          </a>
        </Link>
      </div>
    </div>);
}
