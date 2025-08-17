import { NextResponse } from "next/server";

// Use the same in-memory store as send-otp (move to a shared file in real app)
const otpStore: Record<string, { emailOtp: string; expires: number }> = {};

export async function POST(req: Request) {
  const { email, emailOtp } = await req.json();
  if (!email || !emailOtp) {
    return NextResponse.json({ error: "Email and OTP required" }, { status: 400 });
  }
  const record = otpStore[email];
  if (!record || record.emailOtp !== emailOtp) {
    return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
  }
  if (Date.now() > record.expires) {
    return NextResponse.json({ error: "OTP expired" }, { status: 400 });
  }
  // OTP valid, delete from store
  delete otpStore[email];
  return NextResponse.json({ success: true });
}
