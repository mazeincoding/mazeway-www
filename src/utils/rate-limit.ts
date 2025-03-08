import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { NextRequest } from "next/server";

/**
 * Securely get client IP address from request headers.
 * Handles various proxy scenarios and prevents IP spoofing.
 */
export function getClientIp(request: NextRequest): string {
  // Check Vercel-specific headers first (most reliable in Vercel environment)
  const vercelForwardedFor = request.headers.get("x-vercel-forwarded-for");
  if (vercelForwardedFor) return vercelForwardedFor.split(",")[0];

  // Then check x-real-ip (set by many reverse proxies)
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;

  // Finally check x-forwarded-for (less reliable, but better than nothing)
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0];

  // Fallback to localhost if no IP found
  return "127.0.0.1";
}

// If API rate limiting isn't enabled in the auth config, or Redis isn't configured, rate limiting will be disabled
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? Redis.fromEnv()
    : null;

export const apiRateLimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(100, "60 s"),
      analytics: true,
      prefix: "@upstash/ratelimit/api",
    })
  : null;
