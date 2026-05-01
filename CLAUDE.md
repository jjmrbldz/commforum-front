# CommForum Frontend — Security Audit & Developer Reference

## Project Overview

Korean casino community website built with **Next.js 15 / React 19 / MySQL (Drizzle ORM)**. Deployed as a single AWS EC2 instance running all services together:

| Service | Port |
|---------|------|
| Next.js frontend | 5001 |
| MySQL database | 3306 |
| Admin API | 5003 |
| Admin dashboard | (same instance) |

**Active incident:** The server has been compromised by a cryptocurrency miner. Primary suspected entry vector is the image upload mechanism writing files to the public filesystem. Because all services share one EC2 instance, a code execution vulnerability in the Next.js app gives an attacker direct access to the database, admin API, and all secrets on disk.

---

## IMMEDIATE ACTIONS — Do These Before Any Code Fix

### 1. Rotate All Secrets (Do Now)

The following credentials are stored in `.env.local` on the compromised server. Assume they are already stolen.

- `DB_PASSWORD` — Change the MySQL password immediately via AWS RDS or your DB admin panel
- `SESSION_SECRET` — Generate a new 32+ byte random secret; rotating this invalidates all active user sessions (acceptable tradeoff)
- `DB_USERNAME` — Consider creating a new limited-privilege DB user and revoking the old one

### 2. Forensics — Run on the EC2 Instance

```bash
# Find active miner processes
ps aux | grep -iE 'miner|xmrig|kswapd0|sysupdate|kdevtmpfsi|crypto'
top -bn1 | head -25

# Check cron jobs for miner persistence (survives reboots)
crontab -l
sudo crontab -l
cat /etc/crontab
ls -la /etc/cron.d/ /etc/cron.hourly/ /etc/cron.daily/

# Scan uploads folder for executable files that should not be there
find /path/to/project/public/uploads -type f \( -name "*.php" -o -name "*.sh" -o -name "*.py" -o -name "*.pl" -o -name "*.rb" \)

# Find files modified in the last 7 days (look for unknown files)
find /path/to/project -mtime -7 -type f -not -path "*/node_modules/*" -not -path "*/.next/*"

# Check active outbound connections (miners phone home to mining pools)
netstat -tulpn
ss -tulpn | grep ESTABLISHED

# Check for SSH backdoors
cat ~/.ssh/authorized_keys
sudo cat /root/.ssh/authorized_keys

# Check Nginx config — does it pass .php files in uploads to PHP-FPM?
sudo cat /etc/nginx/sites-enabled/*
sudo nginx -T 2>/dev/null | grep -A 10 "location.*uploads"
```

### 3. If a PHP Webshell Is Found in `/public/uploads/`

1. Do **not** request the file URL — that would execute it again
2. Delete it: `rm /path/to/public/uploads/<suspicious-file>`
3. Check access logs for requests to that filename to understand what the attacker did
4. Check for cron jobs and new user accounts created around the same time

---

## Security Vulnerabilities

### CRITICAL

#### C1 — No Server-Side File Type Validation (Primary Attack Vector)

**File:** `app/profile/actions.ts` — lines 99–102

```typescript
// VULNERABLE: file.type is client-supplied, never verified
const filePath = `${randomUUID()}-${Date.now()}.${file.type.split("/")[1]}`;
const bytes = await file.arrayBuffer();
await writeFile(path.join(process.cwd(), "public/uploads", filePath), Buffer.from(bytes));
```

**What the attacker does:** Sends a crafted HTTP request with `Content-Type: image/php` (or `image/x-httpd-php`). The server writes the file with a `.php` extension into `public/uploads/`. If Nginx is configured with PHP-FPM and does not block `.php` execution in the uploads directory, the file executes on the next HTTP request.

**Also missing:**
- No magic byte / file signature check (actual file content is never inspected)
- No extension whitelist on the server side
- No per-file size limit (only a 2MB request-body limit in `next.config.ts`)

**Fix required:**
```typescript
import { fileTypeFromBuffer } from 'file-type'; // install: npm i file-type

const ALLOWED_MIME = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};
const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

for (const file of files) {
  if (file.size > MAX_FILE_BYTES) throw new Error('File too large');
  const bytes = await file.arrayBuffer();
  const detected = await fileTypeFromBuffer(bytes);
  if (!detected || !ALLOWED_MIME.has(detected.mime)) {
    throw new Error('Invalid file type');
  }
  const ext = ALLOWED_EXT[detected.mime];
  const filePath = `${randomUUID()}-${Date.now()}.${ext}`;
  await writeFile(path.join(process.cwd(), 'public/uploads', filePath), Buffer.from(bytes));
}
```

---

#### C2 — Uploads Directory Excluded from All Middleware Protection

**File:** `middleware.ts` — line 6

```typescript
// uploads/ is excluded — all uploaded files are permanently public, no auth gate
'/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|uploads/).*)'
```

Any file written to `/public/uploads/` is immediately accessible to the entire internet with no authentication. This is required for static files to work but means uploaded webshells are also fully public.

**Fix required:** Block Nginx-level execution of scripts in the uploads directory regardless of extension (Nginx config fix, not code):

```nginx
location /uploads/ {
    # Never execute anything in this directory
    add_header X-Content-Type-Options nosniff;
    types { }
    default_type application/octet-stream;
    location ~* \.(php|php5|phtml|sh|py|pl|rb|cgi)$ {
        deny all;
    }
}
```

---

#### C3 — All Secrets in `.env.local` on Compromised Server

**File:** `.env.local`

**Variables at risk:** `DB_HOST`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`, `SESSION_SECRET`, `NEXT_PUBLIC_BACC_API_URL`

With server access, an attacker runs `cat .env.local` and has full database credentials and the JWT signing secret — meaning they can forge session tokens for any user, including admins.

**Fix required:**
- Rotate all credentials (see Immediate Actions above)
- Move secrets to AWS Secrets Manager or AWS Parameter Store
- Never commit `.env.local` (verify `.gitignore` includes it — it currently does)

---

### HIGH

#### H1 — Session Cookie `secure: false`

**File:** `lib/session.ts` — line 78

```typescript
cookieStore.set('session', session, {
  httpOnly: true,
  secure: false, // ibalik sa true pag may SSL na hahah
  // ...
});
```

Session cookies are sent over plain HTTP. Anyone on the same network (or any MITM position) can steal a user's session token.

**Fix:** Set `secure: true` once SSL is configured. This is a one-line change but requires HTTPS to be working first.

---

#### H2 — `dangerouslySetInnerHTML` Without DOMPurify (Stored XSS)

**File:** `components/pages/posts/post.tsx` — line 36

```typescript
<article dangerouslySetInnerHTML={{__html: html}} />
```

The `html` variable is generated from user-created post content via a headless Lexical editor (`app/posts/[category]/[id]/actions.ts` lines 30–66). `dompurify` is installed but never called in this path.

**Fix:**

```typescript
import DOMPurify from 'isomorphic-dompurify';
// ...
<article dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(html)}} />
```

---

#### H3 — No Server-Side Per-File Size Limit

**File:** `app/profile/actions.ts`

The `bodySizeLimit: '2mb'` in `next.config.ts` limits the entire request body, not individual files. A client bypassing the 5MB frontend check can submit oversized files, exhausting disk space — which combined with an active miner using memory accelerates crashes.

**Fix:** Add `if (file.size > MAX_FILE_BYTES) throw new Error('File too large')` before processing each file (shown in C1 fix above).

---

### MEDIUM

#### M1 — Wildcard `remotePatterns` Enables SSRF

**File:** `next.config.ts` — lines 5–9

```typescript
remotePatterns: [
  { protocol: 'https', hostname: '**' },
  { protocol: 'http',  hostname: '**' },
]
```

The Next.js image optimization route (`/_next/image?url=...`) will server-side fetch images from **any URL**. An attacker passes `url=http://169.254.169.254/latest/meta-data/` (AWS EC2 metadata endpoint) to probe internal infrastructure.

**Fix:** Whitelist only your own domains:
```typescript
remotePatterns: [
  { protocol: 'https', hostname: 'your-cdn-domain.com' },
  { protocol: 'http', hostname: 'localhost' },
]
```

---

#### M2 — MySQL Connection Pool Has No Explicit Limit

**File:** `db/index.ts`

```typescript
const pool = mysql.createPool({
  host: process.env.DB_HOST!,
  // connectionLimit: 10,  // COMMENTED OUT
  // charset: 'utf8mb4',   // COMMENTED OUT
});
```

No connection limit + miner consuming memory = faster crashes under load.

**Fix:** Uncomment and set `connectionLimit: 10` (adjust based on your RDS instance size).

---

#### M3 — Artificial 1-Second Delay in Every Authenticated Request

**File:** `lib/session.ts` — lines 95–143

```typescript
return new Promise((resolve) =>
  setTimeout(() => { resolve(cookieData) }, 1000)  // unnecessary 1-second delay
)
```

Every page load that checks session adds 1 full second of latency. Under memory pressure from miners this makes the app feel like it is crashing even when it is not.

**Fix:** Remove the `setTimeout` wrapper and resolve the Promise directly.

---

#### M4 — Next.js Image Optimization Accessible to Public (SSRF + Bandwidth)

Related to M1. The `/_next/image` endpoint is unauthenticated and proxies arbitrary remote URLs. This can also be abused to exhaust server bandwidth or generate unauthorized traffic billed to your AWS account.

**Fix:** Add rate limiting or authentication to the image endpoint if possible, and fix M1 first.

---

#### M5 — Admin API Over Plain HTTP

**File:** `.env.local`

`NEXT_PUBLIC_BACC_API_URL` points to an IP over HTTP. Bearer tokens sent to the admin API travel unencrypted. Since this is on the same EC2 instance the risk is lower (loopback), but the pattern is unsafe if services are ever split across instances.

---

### LOW

#### L1 — Registration Group Assignment Logic Bug

**File:** `app/register/actions.ts`

```typescript
const userGroup = "A,B,C,D,E";
const splitUserGroup = userGroup.split(",");
// BUG: uses userGroup.length (9) instead of splitUserGroup.length (5)
const randUserGroup = splitUserGroup[Math.floor(Math.random() * userGroup.length)];
```

Groups C, D, E are almost never assigned. Change `userGroup.length` to `splitUserGroup.length`.

---

#### L2 — No File Deletion / Upload Cleanup

Uploaded files in `/public/uploads/` accumulate indefinitely. No user-facing delete, no TTL, no orphan cleanup. This contributes to disk exhaustion alongside the miner.

---

#### L3 — Build Can Skip Type Checking

**File:** `next.config.ts`

`NEXT_LITE_BUILD=1` disables both ESLint and TypeScript checks during `next build`. Ensure this environment variable is never set in the production CI/CD pipeline.

---

## Good Practices Already in Place

| Practice | Location |
|----------|----------|
| bcrypt (12 rounds) for password hashing | `app/register/actions.ts` line 35 |
| Drizzle ORM parameterized queries (no raw SQL + user input) | `db/query/*.ts` |
| Zod schema validation on all form inputs | `db/validations/*.ts` |
| `httpOnly: true` on session cookie | `lib/session.ts` line 77 |
| `requireUserSession()` auth guard on all server actions | `lib/session.ts` lines 147–151 |
| UUID-based upload filenames (prevents directory traversal) | `app/profile/actions.ts` line 99 |
| `dompurify` installed | `package.json` — just needs to be wired in (see H2) |

---

## Fix Priority Order

1. **Run server forensics and kill miner** (see Immediate Actions)
2. **Rotate `DB_PASSWORD` and `SESSION_SECRET`** — assume stolen
3. **Fix file upload validation (C1)** — install `file-type`, validate magic bytes, whitelist extensions
4. **Fix Nginx to block script execution in `/uploads/`** — server config, not code
5. **Fix `remotePatterns` in next.config.ts (M1)** — whitelist domains
6. **Wire in DOMPurify on `dangerouslySetInnerHTML` (H2)** — one-line fix
7. **Remove 1-second session delay (M3)** — quick win for performance
8. **Set `secure: true` on cookie once HTTPS is live (H1)**
9. **Add `connectionLimit` to DB pool (M2)**
10. **Fix registration group bug (L1)**
