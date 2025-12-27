# ZenBlog AI

Ứng dụng blog cá nhân (React + Vite) với giao diện cute. Bài viết và profile có thể công khai cho mọi người, và được lưu bền vững qua Supabase.

## Tính năng
- Xem danh sách bài viết, xem chi tiết
- Viết/chỉnh sửa/xóa bài (admin)
- Lưu dữ liệu bền vững trên Supabase (Postgres)

## Cấu hình Supabase
1. Tạo project Supabase: https://supabase.com/dashboard
2. Tạo bảng và policy bằng SQL (mở SQL editor và chạy file `supabase_setup.sql` trong repo):

   - `id` (text, primary key)
   - `title` (text)
   - `excerpt` (text)
   - `content` (text)
   - `category` (text)
   - `author` (text)
   - `date` (text)
   - `imageUrl` (text)
   - `readTime` (text)

3. Thêm bạn vào bảng `admins`:
   - Vào Auth → Users, copy `id` của tài khoản của bạn.
   - SQL: `insert into public.admins(user_id) values ('YOUR-USER-ID-UUID');`
   - Sau đó chỉ bạn mới có thể thêm/sửa/xóa bài.

4. Lấy `Project URL` và `Anon key`, điền vào `.env.local` (tạo từ `.env.example`):

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_PUBLIC_KEY
```

## Chạy dự án

```bash
npm install
npm run dev
```

## Deploy công khai (GitHub Pages)
1. Đẩy mã nguồn lên GitHub repo công khai
2. Bật GitHub Pages trong Settings → Pages → Deploy from `gh-pages` hoặc `main` (tuỳ config)
3. Cập nhật `VITE_SUPABASE_*` trên môi trường build (nếu dùng action) hoặc build cục bộ rồi push `dist/` lên branch pages.

## Lưu ý bảo mật
- Anon key chỉ nên có quyền đọc. Quyền ghi cần đăng nhập (Supabase Auth) để bạn là admin.
- Không commit `.env.local` vào repo công khai.
<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
