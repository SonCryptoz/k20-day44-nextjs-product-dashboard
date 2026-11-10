import { Suspense } from "react";
import { getProductStats } from "@/app/lib/products";

export default function DashboardOverviewPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Tổng quan hệ thống</h1>

            <Suspense fallback={<ProductStatsFallback />}>
                <ProductStatsCards />
            </Suspense>
        </div>
    );
}

async function ProductStatsCards() {
    const stats = await getProductStats();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card Tổng số sản phẩm */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Tổng số sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                    {stats ? stats.total : "---"}
                </p>
            </div>

            {/* Card Giá trung bình */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Giá trung bình</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">
                    {stats ? `${stats.averagePrice.toLocaleString()} đ` : "---"}
                </p>
            </div>
        </div>
    );
}

function ProductStatsFallback() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Tổng số sản phẩm</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">Đang tải...</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <p className="text-sm font-medium text-gray-500">Giá trung bình</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">Đang tải...</p>
            </div>
        </div>
    );
}
