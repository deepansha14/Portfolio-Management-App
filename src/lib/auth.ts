import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || "default_secret_replace_in_production"
);

export interface UserJwtPayload {
  userId: string;
  email: string;
  role: string;
  [key: string]: unknown;
}

export async function generateAccessToken(payload: UserJwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(secretKey);
}

export async function generateRefreshToken(payload: UserJwtPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as UserJwtPayload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as UserJwtPayload;
  } catch (error) {
    return null;
  }
}

export function getTokens() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return { accessToken, refreshToken };
}

export async function getUserFromToken() {
  const { accessToken } = getTokens();
  if (!accessToken) return null;

  const payload = await verifyAccessToken(accessToken);
  return payload;
}