BÁO CÁO KIỂM TRA
1. **Mau01.html** & **Mau02.html** nâng cấp với: ô tìm kiếm chi bộ theo mã + nút "Gửi báo cáo"
2. **code.gs** — Apps Script cho Google Drive + Sheets

Bây giờ tôi đã nắm đầy đủ cấu trúc. Tôi sẽ tạo các đoạn code bổ sung (patch) — bao gồm: **chibo-search component** dùng chung, **phần Gửi báo cáo** cho cả 2 file, và **code.gs** hoàn chỉnh.

Bây giờ tạo **chibo-search snippet** — đoạn HTML/JS dùng chung, sẽ thay thế ô nhập chi bộ trong cả 2 file:

Bây giờ tôi tạo 2 file HTML nâng cấp. Tôi sẽ dùng `bash` để copy và patch từng file:

Now add the `chibo.js` data inline and fix the DOMContentLoaded to include `chibo-search` init in Mau01:

Now add the `DS_CHI_BO_GS` data before the script block in Mau01:

Now do the same for **Mau02.html**:

Now copy files to output:

Đã hoàn thành 3 file. Dưới đây là tóm tắt những gì đã thay đổi:

---

## Những thay đổi trong Mau01.html & Mau02.html

**1. Ô tìm kiếm chi bộ** (thay ô text cũ):
- Gõ số hoặc tên → dropdown lọc tức thì (hỗ trợ cả tiếng Việt không dấu)
- Ký tự khớp được **tô vàng** trong kết quả
- Dùng phím ↑↓ / Enter để chọn, nút ✕ để xóa
- Giá trị thực được lưu vào `<input hidden id="chibo">` để các hàm xuất Word dùng

**2. Nút "📤 Gửi báo cáo lên Drive"**:
- Mở modal xác nhận trước khi gửi
- Tự tạo file .docx → chuyển base64 → POST lên Google Apps Script
- Hiển thị trạng thái: đang tạo file → đang gửi → thành công / lỗi
- Khi thành công: hiện link trực tiếp đến file trên Drive

---

## Hướng dẫn cài code.gs lên Google Apps Script

1. Vào [script.google.com](https://script.google.com) → **Dự án mới**
2. Dán toàn bộ nội dung `code.gs` vào, lưu
3. **Triển khai** → "Triển khai mới" → chọn loại **Ứng dụng web** → Ai có quyền truy cập: **Mọi người**
4. Sao chép URL deploy
5. Thay `YOUR_SCRIPT_ID` trong cả 2 file HTML bằng URL đó (dòng `const GAS_URL = "..."`)

**Cấu trúc Drive tự động tạo:**
```
📁 BÁO CÁO KIỂM TRA GIÁM SÁT/
  📊 THỐNG KÊ BÁO CÁO KTGS.xlsx  ← sheet đầu tiên: thống kê
  📁 2026/
    📁 MẪU 01CB - Hằng tháng/
    📁 MẪU 02CB - Định kỳ/
```Cho tôi xem lại code.gs hiện tại để hiểu rõ cấu trúc trước khi viết lại:

Rõ rồi. Tôi cần thiết kế lại hoàn toàn logic sheet — dạng **bảng ngang theo chi bộ**, mỗi loại báo cáo là một cột riêng, tự khởi tạo toàn bộ danh sách lần đầu.

Đây là `code.gs` v2 đã viết lại hoàn toàn. Giải thích cấu trúc sheet mới:

---

## Cấu trúc sheet thống kê mới

```
     A    │  B (TÊN CHI BỘ)  │ C..N (Mẫu 01CB - 12 tháng) │ O..R (Mẫu 02CB)
 ─────────┼──────────────────┼─────────────────────────────┼──────────────────
  Hàng 1  │  [tiêu đề nhóm]  │  MẪU 01CB - HẰNG THÁNG     │  MẪU 02CB - ĐỊnh KỲ
  Hàng 2  │  TÊN CHI BỘ      │  T.1 T.2 ... T.12           │  6T-đầu 6T-cuối Năm NK
  Hàng 3  │  1 TÂN NINH B    │  (trống = chưa nộp)         │
  ...      │  ...              │                             │
  Hàng N  │  TÂN LẬP B5      │                             │
  (trống) │                  │                             │
  Tổng    │  TỔNG ĐÃ NỘP     │  =COUNTA(C3:C161)  ...      │
```

**Khi chi bộ nộp báo cáo:**
- Ô tương ứng tự động điền `dd/MM HH:mm` + link trực tiếp đến file Drive → **màu xanh lá**
- Ô trống = chưa nộp
- Hàng `TỔNG ĐÃ NỘP` dùng `COUNTA` đếm tự động từng cột

**Lần đầu triển khai:** Sheet tự tạo với toàn bộ 174 chi bộ, đặt làm sheet đầu tiên trong file. Mỗi năm tạo một sheet riêng (ví dụ: `THỐNG KÊ NỘP BÁO CÁO 2026`).

