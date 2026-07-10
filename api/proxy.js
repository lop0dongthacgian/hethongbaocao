// api/proxy.js  –  Vercel Serverless Function
// GAS_URL thật được lưu trong Vercel Environment Variable: GAS_URL
// Không bao giờ hard-code URL ở đây.

export default async function handler(req, res) {
  // ===== CHO PHÉP CẢ GET VÀ POST =====
  // GET: lấy dữ liệu (danh sách sheet, chi tiết sheet)
  // POST: gửi báo cáo lên Drive
  
  const GAS_URL = process.env.GAS_URL;
  if (!GAS_URL) {
    return res.status(500).json({ error: "GAS_URL chưa được cấu hình trong biến môi trường Vercel." });
  }

  try {
    let url = new URL(GAS_URL);
    let options = {
      method: req.method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // ===== XỬ LÝ GET =====
    if (req.method === "GET") {
      // Chuyển query params từ request sang GAS_URL
      if (req.query) {
        Object.keys(req.query).forEach(key => {
          url.searchParams.append(key, req.query[key]);
        });
      }
      
      const response = await fetch(url.toString(), options);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ===== XỬ LÝ POST =====
    if (req.method === "POST") {
      // Đọc raw body
      const rawBody = await new Promise((resolve, reject) => {
        let data = "";
        req.on("data", chunk => { data += chunk; });
        req.on("end", () => resolve(data));
        req.on("error", reject);
      });

      let payload;
      try {
        payload = JSON.parse(rawBody);
      } catch {
        return res.status(400).json({ error: "Body không phải JSON hợp lệ." });
      }

      options.body = JSON.stringify(payload);

      const response = await fetch(url.toString(), options);
      const data = await response.json();
      return res.status(response.status).json(data);
    }

    // ===== METHOD KHÔNG HỖ TRỢ =====
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });

  } catch (err) {
    console.error('❌ Proxy error:', err.message);
    return res.status(502).json({ error: "Lỗi khi gọi GAS: " + err.message });
  }
}
