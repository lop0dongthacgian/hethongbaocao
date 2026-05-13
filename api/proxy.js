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
    const upstream = await fetch(GAS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await upstream.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(502).json({ error: "Lỗi khi gọi GAS: " + err.message });
  }
}
