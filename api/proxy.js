// api/proxy.js  –  Vercel Serverless Function
// GAS_URL thật được lưu trong Vercel Environment Variable: GAS_URL
// Không bao giờ hard-code URL ở đây.

export default async function handler(req, res) {
  // Chỉ cho phép POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const GAS_URL = process.env.GAS_URL;
  if (!GAS_URL) {
    return res.status(500).json({ error: "GAS_URL chưa được cấu hình trong biến môi trường Vercel." });
  }

  try {
    // Vercel không tự parse body — đọc raw stream rồi parse thủ công
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

    const upstream = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Lỗi khi gọi GAS: " + err.message });
  }
}
