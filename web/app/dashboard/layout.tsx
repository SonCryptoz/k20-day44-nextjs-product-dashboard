import Link from "next/link";
import { Suspense } from "react";
import DashboardNav from "./DashboardNav";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
                </div>
                <Suspense fallback={<DashboardNavFallback />}>
                    <DashboardNav />
                </Suspense>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 shadow-sm">
                    <span className="text-gray-500 text-sm">Hệ thống quản lý sản phẩm</span>
                </header>
                <main className="flex-1 p-8">{children}</main>
            </div>
        </div>
    );
}

function DashboardNavFallback() {
    return (
        <nav className="flex-1 p-4 space-y-1">
            <Link
                href="/dashboard"
                className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
            >
                Tổng quan (Stats)
            </Link>
            <Link
                href="/dashboard/products"
                className="block px-4 py-2.5 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 font-medium transition"
            >
                Danh sách sản phẩm
            </Link>
        </nav>
    );
}