// Imports
// ========================================================
import {type NextRequest, NextResponse} from "next/server";

// Config
// ========================================================
const corsOptions: {
    allowedMethods: string[];
    allowedOrigins: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    maxAge?: number;
    credentials: boolean;
} = {
    allowedMethods: (process.env?.ALLOWED_METHODS || "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS").split(","),
    allowedOrigins: (process.env?.ALLOWED_ORIGIN || "https://flower.weblimes.com,https://weblimes.com").split(","),
    allowedHeaders: (process.env?.ALLOWED_HEADERS || "Content-Type, Authorization").split(","),
    exposedHeaders: (process.env?.EXPOSED_HEADERS || "").split(","),
    maxAge: 86400, // 60 * 60 * 24 * 30, // 30 days
    credentials: true,
};

// Middleware
// ========================================================
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    // Response
    const response = NextResponse.next();

    // Allowed origins check
    const origin = request.headers.get('origin') ?? '';
    if (corsOptions.allowedOrigins.includes('*') || corsOptions.allowedOrigins.includes(origin)) {
        response.headers.set('Access-Control-Allow-Origin', origin);
    }

    // Set default CORS headers
    response.headers.set("Access-Control-Allow-Credentials", corsOptions.credentials.toString());
    response.headers.set("Access-Control-Allow-Methods", corsOptions.allowedMethods.join(","));
    response.headers.set("Access-Control-Allow-Headers", corsOptions.allowedHeaders.join(","));
    response.headers.set("Access-Control-Expose-Headers", corsOptions.exposedHeaders.join(","));
    response.headers.set("Access-Control-Max-Age", corsOptions.maxAge?.toString() ?? "");

    // Return
    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/:path*",
};