# Buổi 44: Next.js App Router, Layouts & Pages, Navigation

Ứng dụng quản lý sản phẩm được xây dựng bằng **Next.js App Router** và **Tailwind CSS**, tích hợp dữ liệu từ API Express mẫu, bao gồm cả các tính năng nâng cao và mở rộng hiệu năng.

---

## Các tính năng đã hoàn thành

### Tính năng cơ bản

| Tính năng | Mô tả |
|----------|--------|
| **Trang chủ** (`/`) | Trang giới thiệu ngắn gọn kèm liên kết chuyển hướng nhanh vào khu vực quản lý (`/dashboard`) |
| **Layout chung** (`/dashboard/layout.tsx`) | Xây dựng khung giao diện quản trị (Admin Panel) với Sidebar/Header dùng chung, sử dụng component `Link` của Next.js |
| **Trang Tổng quan** (`/dashboard`) | Đọc dữ liệu thống kê (`total`, `averagePrice`) trực tiếp từ API `/products/stats` thông qua Server Component |
| **Danh sách sản phẩm** (`/dashboard/products`) | Gọi API lấy danh sách sản phẩm, hiển thị chi tiết ID, tên, giá |
| **Chi tiết sản phẩm** (`/dashboard/products/[id]`) | Đọc Dynamic Route, xác thực định dạng số nguyên dương, hiển thị màn hình thông báo **Không tìm thấy** khi ID không hợp lệ |

### Tính năng mở rộng (Nâng cao)

**Tìm kiếm & Phân trang**
- Đọc query parameters (`query`, `page`) từ URL (`searchParams`)
- Truyền tham số trực tiếp cho API để lọc dữ liệu theo từ khóa tìm kiếm
- Hỗ trợ điều hướng chuyển trang mượt mà mà vẫn giữ nguyên từ khóa tìm kiếm

**Tối ưu hóa hiệu năng**
- Sử dụng `next/font` (`Inter`) tại layout gốc để tối ưu tải font chữ Google
- Tối ưu hóa hiển thị hình ảnh với component `<Image />` từ `next/image`

---

## Hướng dẫn cài đặt và chạy ứng dụng

> Lưu ý: API Express mẫu sử dụng dữ liệu lưu trong bộ nhớ (`in-memory`). Cần khởi động **cả API Server và Next.js Client** ở **hai terminal riêng biệt**.

### Bước 1: Khởi động API Express mẫu

```bash
# 1. Di chuyển vào thư mục API mẫu của buổi 44
cd <path-to-api-server>

# 2. Cài đặt các gói phụ thuộc
npm install

# 3. Khởi động server API (mặc định chạy tại cổng 3001)
npm run dev
```

### Bước 2: Khởi động ứng dụng Next.js

```bash
# 1. Di chuyển vào thư mục dự án
cd k20-day44-nextjs-product-dashboard

# 2. Tạo file biến môi trường .env.local
echo "API_URL=http://localhost:3001" > .env.local

# 3. Cài đặt các gói phụ thuộc
npm install

# 4. Chạy ứng dụng ở chế độ phát triển
npm run dev

# 5. Mở trình duyệt và truy cập
# http://localhost:3000
```

---

## Các URL kiểm tra nhanh

| Chức năng | URL |
|-----------|-----|
| Trang chủ | [http://localhost:3000](http://localhost:3000) |
| Tổng quan Dashboard | [http://localhost:3000/dashboard](http://localhost:3000/dashboard) |
| Danh sách sản phẩm (có tìm kiếm & phân trang) | [http://localhost:3000/dashboard/products](http://localhost:3000/dashboard/products) |
| Chi tiết sản phẩm (ID: 1) | [http://localhost:3000/dashboard/products/1](http://localhost:3000/dashboard/products/1) |
| Kiểm tra lỗi 404 (ID không tồn tại) | [http://localhost:3000/dashboard/products/999](http://localhost:3000/dashboard/products/999) |
| Kiểm tra lỗi 404 (ID không hợp lệ) | [http://localhost:3000/dashboard/products/abc](http://localhost:3000/dashboard/products/abc) |