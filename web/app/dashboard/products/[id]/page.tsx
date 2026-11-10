import Link from "next/link";
import { Suspense } from "react";
import { getProductById } from "@/app/lib/products";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
    return (
        <Suspense fallback={<ProductDetailFallback />}>
            <ProductDetail params={params} />
        </Suspense>
    );
}

async function ProductDetail({ params }: PageProps) {
    const { id } = await params;

    // Chuyển đổi sang dạng số nguyên
    const numericId = Number(id);
    const isValidNumber = Number.isInteger(numericId) && numericId > 0;

    // Nếu ID không hợp lệ hoặc không tìm thấy sản phẩm từ API
    const product = isValidNumber ? await getProductById(numericId) : null;

    if (!product) {
        return (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center max-w-lg mx-auto mt-12">
                <h2 className="text-xl font-bold text-red-600 mb-2">Không tìm thấy sản phẩm</h2>
                <p className="text-gray-600 mb-6">
                    Sản phẩm với mã định danh <span className="font-semibold">{id}</span> không tồn
                    tại hoặc đường dẫn không hợp lệ.
                </p>
                <Link
                    href="/dashboard/products"
                    className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                >
                    Quay về danh sách sản phẩm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Chi tiết sản phẩm</h1>

            <div className="space-y-4 mb-8">
                <div>
                    <span className="text-sm font-medium text-gray-500 block">
                        Mã sản phẩm (ID)
                    </span>
                    <span className="text-lg font-semibold text-gray-900">{product.id}</span>
                </div>
                <div>
                    <span className="text-sm font-medium text-gray-500 block">Tên sản phẩm</span>
                    <span className="text-lg font-semibold text-gray-900">{product.name}</span>
                </div>
                <div>
                    <span className="text-sm font-medium text-gray-500 block">Giá tiền</span>
                    <span className="text-xl font-bold text-blue-600">
                        {product.price.toLocaleString()} đ
                    </span>
                </div>
                {product.description && (
                    <div>
                        <span className="text-sm font-medium text-gray-500 block">Mô tả</span>
                        <p className="text-gray-700 mt-1">{product.description}</p>
                    </div>
                )}
            </div>

            <Link
                href="/dashboard/products"
                className="inline-block bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
            >
                Quay lại danh sách
            </Link>
        </div>
    );
}

function ProductDetailFallback() {
    return (
        <div className="max-w-xl bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
            Đang tải thông tin sản phẩm...
        </div>
    );
}
