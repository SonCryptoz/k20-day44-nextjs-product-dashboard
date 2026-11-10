import Link from "next/link";
import { Suspense } from "react";
import { getProducts } from "@/app/lib/products";

interface ProductsPageProps {
    searchParams: Promise<{ query?: string | string[]; page?: string | string[] }>;
}

export default function ProductsPage({ searchParams }: ProductsPageProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Danh sách sản phẩm</h1>
            </div>

            <Suspense fallback={<ProductsFallback />}>
                <ProductsList searchParams={searchParams} />
            </Suspense>
        </div>
    );
}

async function ProductsList({ searchParams }: ProductsPageProps) {
    const params = await searchParams;
    const rawQuery = Array.isArray(params.query) ? params.query[0] : params.query;
    const query = rawQuery?.trim() ?? "";
    const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
    const requestedPage = Number(rawPage);
    const page =
        Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;
    const { items: products, total, totalPages, currentPage } = await getProducts(query, page);

    return (
        <div>
            <form action="/dashboard/products" method="get" className="mb-6 flex gap-3">
                <label htmlFor="product-query" className="sr-only">
                    Tìm kiếm sản phẩm
                </label>
                <input
                    id="product-query"
                    type="search"
                    name="query"
                    defaultValue={query}
                    placeholder="Tìm theo tên sản phẩm..."
                    className="w-full max-w-md rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    Tìm kiếm
                </button>
            </form>
            <p className="mb-3 text-sm text-gray-500">
                {query ? `Tìm thấy ${total} sản phẩm` : `Tổng cộng ${total} sản phẩm`}
            </p>
            {products.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center text-gray-500">
                    {query
                        ? "Không tìm thấy sản phẩm phù hợp."
                        : "Không có sản phẩm nào trong hệ thống."}
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                                <th className="py-3 px-6 font-semibold">ID</th>
                                <th className="py-3 px-6 font-semibold">Tên sản phẩm</th>
                                <th className="py-3 px-6 font-semibold">Giá</th>
                                <th className="py-3 px-6 font-semibold text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 text-sm text-gray-700">
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="py-4 px-6 font-medium text-gray-900">
                                        {product.id}
                                    </td>
                                    <td className="py-4 px-6">{product.name}</td>
                                    <td className="py-4 px-6 font-semibold text-blue-600">
                                        {product.price.toLocaleString()} đ
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <Link
                                            href={`/dashboard/products/${product.id}`}
                                            className="text-blue-600 hover:underline font-medium"
                                        >
                                            Chi tiết
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
            <nav
                aria-label="Phân trang sản phẩm"
                className="mt-6 flex items-center justify-between"
            >
                <span className="text-sm text-gray-500">
                    Trang {currentPage} / {totalPages}
                </span>
                <div className="flex gap-2">
                    {currentPage > 1 ? (
                        <Link
                            href={getPageHref(query, currentPage - 1)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Trang trước
                        </Link>
                    ) : (
                        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-400">
                            Trang trước
                        </span>
                    )}
                    {currentPage < totalPages ? (
                        <Link
                            href={getPageHref(query, currentPage + 1)}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Trang sau
                        </Link>
                    ) : (
                        <span className="rounded-lg border border-gray-200 bg-gray-100 px-4 py-2 text-sm text-gray-400">
                            Trang sau
                        </span>
                    )}
                </div>
            </nav>
        </div>
    );
}

function getPageHref(query: string, page: number) {
    const searchParams = new URLSearchParams({ page: String(page) });
    if (query) searchParams.set("query", query);
    return `/dashboard/products?${searchParams.toString()}`;
}

function ProductsFallback() {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                        <th className="py-3 px-6 font-semibold">ID</th>
                        <th className="py-3 px-6 font-semibold">Tên sản phẩm</th>
                        <th className="py-3 px-6 font-semibold">Giá</th>
                        <th className="py-3 px-6 font-semibold text-right">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500">
                            Đang tải sản phẩm...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
