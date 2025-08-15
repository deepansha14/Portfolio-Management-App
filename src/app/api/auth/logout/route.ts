import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    // Clear auth cookies
    cookies().delete('accessToken');
    cookies().delete('refreshToken');
          userId = payload.userId;

          // Log successful logout
          await DatabaseService.createAuditLog({
            userId: userId || "",
            email: userEmail || "unknown",
            action: "LOGOUT",
            result: "success",
            ipAddress,
            userAgent,
            details: { method: "explicit_logout" },
          });
        }
      } catch (jwtError) {
        // Token was invalid, but still proceed with logout
        // Log as anonymous logout attempt
        await DatabaseService.createAuditLog({
          email: "unknown",
          action: "LOGOUT_ATTEMPT",
          result: "success",
          ipAddress,
          userAgent,
          details: {
            error:
              jwtError instanceof Error
                ? jwtError.message
                : "Invalid token during logout",
            method: "explicit_logout",
          },
        });
      }
    } else {
      // Log anonymous logout attempt (no token present)
      await DatabaseService.createAuditLog({
        email: "unknown",
        action: "LOGOUT_ATTEMPT",
        result: "success",
        ipAddress,
        userAgent,
        details: {
          error: "No token present during logout",
          method: "explicit_logout",
        },
      });
    }

    // Create response with success message
    const response = NextResponse.json(
      {
        success: true,
        message: "Logged out successfully",
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );

    // Clear authentication cookie with secure settings
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/", // Ensure cookie is cleared for all paths
    });

    // Additional security: Clear any other potential auth cookies
    response.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    // Production security headers
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
    response.headers.set(
      "Content-Security-Policy",
      "default-src 'self'; frame-ancestors 'none';"
    );

    // Cache control to prevent caching of logout response
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    return response;
  } catch (error) {
    console.error("Logout error:", error);

    // Log logout failure for monitoring
    try {
      const { ipAddress, userAgent } = getClientInfo(request);
      await DatabaseService.createAuditLog({
        email: "unknown",
        action: "LOGOUT_ERROR",
        result: "failure",
        ipAddress,
        userAgent,
        details: {
          error: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      });
    } catch (auditError) {
      // Don't fail logout if audit logging fails
      console.error("Audit logging failed during logout error:", auditError);
    }

    // Even if there's an error, still clear cookies for security
    const response = NextResponse.json(
      {
        success: false,
        error: "Logout processing failed, but session cleared for security",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );

    // Clear cookies even on error
    response.cookies.set("auth_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      expires: new Date(0),
      path: "/",
    });

    return response;
  }
}

// OPTIONS handler for CORS preflight with enhanced security
export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin":
        process.env.ALLOWED_ORIGIN || "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers":
        "Content-Type, Authorization, X-Requested-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "86400", // Cache preflight for 24 hours
    },
  });

  // Add security headers to OPTIONS response too
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");

  return response;
}
