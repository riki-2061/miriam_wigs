const RESEND_API_URL = "https://api.resend.com/emails";

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.end(JSON.stringify(body));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 200_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("allow", "POST");
    return json(res, 405, { error: "Method not allowed" });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  const from = process.env.CONTACT_EMAIL_FROM || "Miriam Rotenberg <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return json(res, 500, { error: "Missing server configuration" });
  }

  let payload;
  try {
    const raw = await readBody(req);
    payload = raw ? JSON.parse(raw) : {};
  } catch {
    return json(res, 400, { error: "Invalid JSON" });
  }

  const name = String(payload?.name || "").trim();
  const phone = String(payload?.phone || "").trim();
  const message = String(payload?.message || "").trim();

  if (!name || !phone) {
    return json(res, 400, { error: "Missing required fields" });
  }

  const subject = `פנייה מהאתר — ${name}`;
  const text = [
    "פנייה חדשה מהאתר:",
    "",
    `שם: ${name}`,
    `טלפון: ${phone}`,
    message ? `הודעה: ${message}` : "הודעה: (לא מולא)",
    "",
    `נשלח בתאריך: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const resendRes = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
      }),
    });

    const resendJson = await resendRes.json().catch(() => null);

    if (!resendRes.ok) {
      return json(res, 502, {
        error: "Email provider error",
        message: resendJson?.message || resendJson?.error || "Failed to send email",
      });
    }

    return json(res, 200, { ok: true, id: resendJson?.id || null });
  } catch {
    return json(res, 502, { error: "Failed to reach email provider" });
  }
};

