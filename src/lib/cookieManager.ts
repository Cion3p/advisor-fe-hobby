export interface CookieConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
  status: 'all' | 'essential_only' | 'custom';
}

export const COOKIE_KEYS = {
  VISITOR_ID: 'modtanoy_vid',
  SESSION_ID: 'modtanoy_sid',
  CONSENT: 'modtanoy_cookie_consent',
  STATS: 'modtanoy_cookie_stats',
};

// Client-side helper to read a cookie
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
  return match ? decodeURIComponent(match[3]) : null;
}

// Client-side helper to write a cookie
export function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

// Generate random UUID/ID
function generateId(prefix: string = 'id'): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

// Get or initialize persistent Visitor ID (stored in cookie + localStorage)
export function getOrCreateVisitorId(): string {
  if (typeof window === 'undefined') return 'srv_visitor';
  
  // 1. Try Cookie
  let vid = getCookie(COOKIE_KEYS.VISITOR_ID);
  if (!vid) {
    // 2. Try localStorage fallback
    try {
      vid = localStorage.getItem(COOKIE_KEYS.VISITOR_ID);
    } catch {}
  }

  // 3. Generate if not found
  if (!vid) {
    vid = generateId('vid');
  }

  // Persist in both cookie (1 year) and localStorage
  setCookie(COOKIE_KEYS.VISITOR_ID, vid, 365);
  try {
    localStorage.setItem(COOKIE_KEYS.VISITOR_ID, vid);
  } catch {}

  return vid;
}

// Get or initialize Session ID (expires after 30 mins of inactivity)
export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return 'srv_session';

  let sid = getCookie(COOKIE_KEYS.SESSION_ID);
  if (!sid) {
    try {
      sid = sessionStorage.getItem(COOKIE_KEYS.SESSION_ID);
    } catch {}
  }

  if (!sid) {
    sid = generateId('sid');
  }

  // Keep session alive for 1 day in cookie, or session lifetime
  setCookie(COOKIE_KEYS.SESSION_ID, sid, 1);
  try {
    sessionStorage.setItem(COOKIE_KEYS.SESSION_ID, sid);
  } catch {}

  return sid;
}

// Read current cookie consent
export function getCookieConsent(): CookieConsentPreferences | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(COOKIE_KEYS.CONSENT) || getCookie(COOKIE_KEYS.CONSENT);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {}
  return null;
}

// Save cookie consent
export function setCookieConsent(prefs: CookieConsentPreferences): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(prefs);
    localStorage.setItem(COOKIE_KEYS.CONSENT, serialized);
    setCookie(COOKIE_KEYS.CONSENT, serialized, 365);
    window.dispatchEvent(new CustomEvent('modtanoy_cookie_consent_updated', { detail: prefs }));
  } catch {}
}

// Detect device type
export function detectDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof navigator === 'undefined') return 'desktop';
  const ua = navigator.userAgent || '';
  if (/iPad|Tablet/i.test(ua)) return 'tablet';
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return 'mobile';
  return 'desktop';
}

// Detect browser
export function detectBrowser(): string {
  if (typeof navigator === 'undefined') return 'Browser';
  const ua = navigator.userAgent || '';
  if (/Edg/i.test(ua)) return 'Edge';
  if (/Chrome/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Opera|OPR/i.test(ua)) return 'Opera';
  return 'Browser';
}

// Get full client context for analytics tracking
export function getClientAnalyticsContext() {
  const visitorId = getOrCreateVisitorId();
  const sessionId = getOrCreateSessionId();
  const consent = getCookieConsent();
  const consentStatus = consent ? consent.status : 'pending';
  const deviceType = detectDeviceType();
  const browser = detectBrowser();

  return {
    visitorId,
    sessionId,
    consentStatus,
    consent,
    deviceType,
    browser,
  };
}
