import dayjs from "dayjs";
import { headers } from "next/headers";

function extractIp(xff?: string | null, cf?: string | null) {
  // Prefer Cloudflare header if present, fallback to first XFF IP.
  if (cf) return cf;
  if (!xff) return undefined;
  return xff.split(",")[0]?.trim();
}

function parseUserAgent(ua?: string | null) {
  if (!ua) return { browser: "Unknown", os: "Unknown", device: "Unknown" };
  const low = ua.toLowerCase();

  const browser =
    low.includes("edg/") ? "Edge" :
    low.includes("chrome/") ? "Chrome" :
    low.includes("safari/") && !low.includes("chrome/") ? "Safari" :
    low.includes("firefox/") ? "Firefox" :
    low.includes("msie") || low.includes("trident/") ? "IE" : "Unknown";

  const os =
    low.includes("windows") ? "Windows" :
    low.includes("mac os x") ? "macOS" :
    low.includes("android") ? "Android" :
    low.includes("iphone") || low.includes("ipad") ? "iOS" :
    low.includes("linux") ? "Linux" : "Unknown";

  const device =
    low.includes("mobile") ? "Mobile" :
    low.includes("tablet") ? "Tablet" : "Desktop";

  return { browser, os, device };
}

export async function getUserAgentInfo() {
  const h = await headers();
  const ua = h.get("user-agent");
  const xff = h.get("x-forwarded-for");
  const cfIp = h.get("cf-connecting-ip") || h.get("true-client-ip");

  const { browser, os, device } = parseUserAgent(ua);
  const ip = extractIp(xff, cfIp);

  const now = dayjs();
  const time = now.format("HH:mm:ss");
  const dayOfWeek = now.format("dddd");
  const day = now.format("DD");
  const month = now.format("MM");
  const year = now.format("YYYY");

  return {
    ip,
    browser,
    os,
    device,
    time,
    dayOfWeek,
    day,
    month,
    year,
  }
}