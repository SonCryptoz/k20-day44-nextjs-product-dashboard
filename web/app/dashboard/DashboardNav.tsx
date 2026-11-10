"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const baseLinkClass =
    "block px-4 py-2.5 rounded-lg font-medium transition";
const inactiveLinkClass =
    "text-gray-700 hover:bg-blue-50 hover:text-blue-600";
const activeLinkClass = "bg-blue-50 text-blue-600";

export default function DashboardNav() {
    const pathname = usePathname();
    const isProductsActive = pathname.startsWith("/dashboard/products");
    const isOverviewActive = pathname === "/dashboard";

    return (
        <nav className="flex-1 p-4 space-y-1">
            <Link
                href="/dashboard"
                aria-current={isOverviewActive ? "page" : undefined}
                className={`${baseLinkClass} ${isOverviewActive ? activeLinkClass : inactiveLinkClass}`}
            >
                Tổng quan (Stats)
            </Link>
            <Link
                href="/dashboard/products"
                aria-current={isProductsActive ? "page" : undefined}
                className={`${baseLinkClass} ${isProductsActive ? activeLinkClass : inactiveLinkClass}`}
            >
                Danh sách sản phẩm
            </Link>
        </nav>
    );
}
