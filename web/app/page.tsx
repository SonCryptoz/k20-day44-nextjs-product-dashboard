import Link from "next/link";

export default function Home() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Ứng dụng Quản Lý Sản Phẩm</h1>
                <p className="text-gray-600 mb-6">
                    Bài tập Buổi 44 - Next.js App Router & Tailwind CSS.
                </p>
                <Link
                    href="/dashboard"
                    className="inline-block bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Truy cập Dashboard
                </Link>
            </div>
        </main>
    );
}
