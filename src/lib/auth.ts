import crypto from "crypto";

const SECRET = process.env.JWT_SECRET || "aarya-analytics-secret-key-12345-portfolio";

/**
 * Generates a cryptographically signed token that expires in 7 days.
 */
export function generateSessionToken(): string {
  const durationMs = 7 * 24 * 60 * 60 * 1000; // 7 days
  const expiresAt = Date.now() + durationMs;
  
  const hmac = crypto.createHmac("sha256", SECRET);
  hmac.update(String(expiresAt));
  const signature = hmac.digest("hex");
  
  return `${expiresAt}.${signature}`;
}

/**
 * Verifies if the token is valid, has not expired, and contains a correct signature.
 */
export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    
    const [expiresAtStr, signature] = parts;
    const expiresAt = parseInt(expiresAtStr, 10);
    
    // Check expiration
    if (isNaN(expiresAt) || expiresAt < Date.now()) {
      return false;
    }
    
    // Validate signature
    const hmac = crypto.createHmac("sha256", SECRET);
    hmac.update(String(expiresAt));
    const expectedSignature = hmac.digest("hex");
    
    // Using string comparison for simplicity and compatibility
    return signature === expectedSignature;
  } catch {
    return false;
  }
}
