import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  const { email, mobile, otpType, otp } = await request.json();

  // Send OTP via email
  if (otpType === "email" && email) {
    // Configure nodemailer (use environment variables for real secrets)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });
    return NextResponse.json({ success: true, method: "email" });
  }

  // Send OTP via SMS (mock)
  if (otpType === "mobile" && mobile) {
    // Integrate with SMS provider here (Twilio, etc.)
    // For demo, just return success
    return NextResponse.json({ success: true, method: "mobile" });
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
