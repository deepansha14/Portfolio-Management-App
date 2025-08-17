import { NextResponse } from "next/server";


// In-memory store for demo (use Redis or DB in production)
const otpStore: Record<string, { emailOtp: string; expires: number }> = {};

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendEmailOtp(email: string, otp: string) {
  const apiKey = process.env.BREVO_API_KEY;
  const payload = {
    sender: { email: "adlakhadeepansha@gmail.com", name: "Portfolio App" },
    to: [{ email }],
    subject: "Your OTP Code",
    htmlContent: `<p>Your OTP code is <b>${otp}</b></p>`,
  };
  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const error = await res.text();
    console.error("Brevo send error", error);
    throw new Error("Failed to send email OTP");
  }
}

export async function POST(req: Request) {
  const { email, mobile } = await req.json();
  console.log("[DEBUG] Sending OTP to email:", email, "and mobile:", mobile);
  if (!email || !mobile) {
    return NextResponse.json({ error: "Email and mobile required" }, { status: 400 });
  }

  // Generate OTPs
  const emailOtp = generateOtp();
  // For demo, we don't send SMS OTP, just use Firebase client-side

  // Send email OTP via Brevo
  try {
    await sendEmailOtp(email, emailOtp);
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to send email OTP" }, { status: 500 });
  }
  // Store OTP in memory (expires in 10 min)
  otpStore[email] = { emailOtp, expires: Date.now() + 10 * 60 * 1000 };

  return NextResponse.json({ success: true });
}
