// Shared in-memory OTP store
const otpStore: Record<string, { emailOtp: string; expires: number }> = {};

export function saveOtp(email: string, emailOtp: string, expires: number) {
  otpStore[email] = { emailOtp, expires };
}

export function getOtp(email: string) {
  return otpStore[email];
}

export function deleteOtp(email: string) {
  delete otpStore[email];
}
