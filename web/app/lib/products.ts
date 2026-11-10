const API_URL = process.env.API_URL || "http://localhost:3001";

// Định nghĩa TypeScript Interfaces
export interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

export interface ProductStats {
    total: number;
    averagePrice: number;
}

export interface ProductsResponse {
    items: Product[];
    total: number;
    totalPages: number;
    currentPage: number;
}

// 1. Lấy thống kê (Tổng số lượng & Giá trung bình)
export async function getProductStats(): Promise<ProductStats | null> {
    try {
        const res = await fetch(`${API_URL}/products/stats`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("Lỗi khi lấy thống kê sản phẩm:", error);
        return null;
    }
}

// 2. Lấy danh sách sản phẩm
export async function getProducts(query = "", page = 1): Promise<ProductsResponse> {
    try {
        const searchParams = new URLSearchParams({ page: String(page) });
        if (query) searchParams.set("query", query);

        const res = await fetch(`${API_URL}/products?${searchParams.toString()}`, {
            cache: "no-store",
        });
        if (!res.ok) {
            return { items: [], total: 0, totalPages: 1, currentPage: 1 };
        }
        return res.json();
    } catch (error) {
        console.error("Lỗi khi lấy danh sách sản phẩm:", error);
        return { items: [], total: 0, totalPages: 1, currentPage: 1 };
    }
}

// 3. Lấy chi tiết sản phẩm theo ID
export async function getProductById(id: number): Promise<Product | null> {
    try {
        const res = await fetch(`${API_URL}/products/${id}`, {
            cache: "no-store",
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error(`Lỗi khi lấy sản phẩm với ID ${id}:`, error);
        return null;
    }
}
