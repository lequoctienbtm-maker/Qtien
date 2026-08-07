# QTIEN // PROFILE

Trang hồ sơ cá nhân phong cách hacker/tin tặc — tông đen trắng, có màn hình boot terminal, matrix rain nền, menu fullscreen mượt, biểu đồ kỹ năng dạng mạng nhện (radar chart), và nhạc nền tự phát khi vào trang.

## 📁 Cấu trúc file

```
qtien-site/
├── index.html      → nội dung & cấu trúc trang
├── style.css        → toàn bộ giao diện/animation
├── script.js         → hiệu ứng + CONFIG (sửa nội dung ở đây)
└── assets/
    ├── music.mp3     → nhạc nền (BẠN CẦN TỰ THÊM FILE NÀY)
    └── avatar.jpg    → ảnh đại diện mặc định (tuỳ chọn)
```

---

## 🚀 CÁCH 1 — Đưa lên GitHub Pages (khuyên dùng, miễn phí)

### Bước 1: Tạo repo trên GitHub
1. Đăng nhập GitHub → bấm nút **"New repository"**.
2. Đặt tên repo, ví dụ: `qtien-profile` (hoặc `ten-github-cua-ban.github.io` nếu muốn nó thành trang chủ chính của bạn).
3. Để **Public**, không cần tích thêm gì khác → **Create repository**.

### Bước 2: Tải file lên
**Cách đơn giản (không cần cài gì):**
1. Vào trang repo vừa tạo → bấm **"Add file" → "Upload files"**.
2. Kéo thả toàn bộ `index.html`, `style.css`, `script.js` và thư mục `assets/` (kèm `music.mp3`) vào.
3. Bấm **"Commit changes"**.

**Cách dùng Git (nếu đã cài Git):**
```bash
git clone https://github.com/<ten-user>/qtien-profile.git
cd qtien-profile
# copy toàn bộ file của bạn vào đây
git add .
git commit -m "init: hacker profile"
git push origin main
```

### Bước 3: Bật GitHub Pages
1. Vào repo → tab **Settings** → mục **Pages** (bên menu trái).
2. Ở **Source**, chọn branch `main`, thư mục `/ (root)` → **Save**.
3. Đợi 1–2 phút, GitHub sẽ hiện link dạng:
   `https://<ten-user>.github.io/qtien-profile/`
4. Mở link đó — xong! 🎉

---

## 🎵 Thêm nhạc nền

Trang được thiết kế để **tự phát nhạc khi bạn bấm nút "NHẤN ĐỂ KHỞI ĐỘNG"** ở màn hình boot (trình duyệt chặn autoplay có tiếng nếu chưa có tương tác, nên nút này vừa đúng luật vừa hợp vibe hacker).

Cách thêm nhạc:
1. Chuẩn bị 1 file nhạc định dạng `.mp3`.
2. Đổi tên thành `music.mp3`.
3. Bỏ vào thư mục `assets/` (đè lên file cũ nếu có).
4. Commit/upload lại lên GitHub.

⚠️ Lưu ý bản quyền: chỉ dùng nhạc bạn có quyền sử dụng (nhạc free-copyright, nhạc tự làm, hoặc đã mua bản quyền).

---

## 🖼️ Đổi ảnh đại diện

Có 2 cách:

**Cách 1 — Đổi trực tiếp trên trang (nhanh, chỉ lưu trên máy bạn):**
- Vào mục "GIỚI_THIỆU", rê chuột vào ảnh → bấm **[ĐỔI_ẢNH]** → chọn ảnh từ máy.
- Ảnh sẽ được lưu trong trình duyệt (localStorage), chỉ bạn thấy trên máy đó — người khác vào link vẫn thấy ảnh mặc định.

**Cách 2 — Đổi vĩnh viễn cho mọi người xem:**
- Đặt ảnh của bạn vào `assets/avatar.jpg` (đúng tên này) rồi upload lên GitHub.
- Nếu không có ảnh, trang tự dùng ảnh đại diện dạng robot mặc định.

---

## ⚙️ Tuỳ chỉnh nội dung

Mở file `script.js`, sửa phần `CONFIG` ở đầu file:

```js
const CONFIG = {
  name: "Qtien",
  typedLines: [ ... ],   // các dòng chữ chạy hiệu ứng gõ ở trang chủ
  skills: [
    { label: "CODE",      value: 10 },
    { label: "DESIGNER",  value: 5  },
    { label: "DEBUG",     value: 20 },
    { label: "Ý_TƯỞNG",   value: 65 },
    { label: "VIBE_CODE", value: 99 }
  ]
};
```

Đổi số `value` (1–100) để thay đổi hình dạng biểu đồ mạng nhện. Muốn đổi tên mục kỹ năng → sửa `label`.

Các phần văn bản khác (giới thiệu, sở thích, liên hệ...) sửa trực tiếp trong `index.html`.

---

## 🧪 Xem thử trước khi đưa lên mạng

Không cần cài gì phức tạp — chỉ cần double-click vào `index.html` để mở bằng trình duyệt (Chrome/Edge/Firefox). Vài trình duyệt có thể chặn nhạc/font khi mở file trực tiếp (do chính sách `file://`) — nếu vậy hãy dùng 1 trong 2 cách:
- Dùng extension **"Live Server"** trong VS Code (bấm chuột phải vào `index.html` → "Open with Live Server").
- Hoặc cứ đưa thẳng lên GitHub Pages ở Bước 2 rồi xem qua link thật — cách này luôn chạy đúng 100%.

---

## 🛠️ Công nghệ dùng

HTML thuần + CSS thuần + JavaScript thuần (vanilla) — không cần Node.js, không cần build, không cần cài package nào. Font chữ lấy từ Google Fonts (`JetBrains Mono`, `Space Mono`).
