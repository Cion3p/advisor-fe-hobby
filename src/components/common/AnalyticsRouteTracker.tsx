'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getClientAnalyticsContext, getCookieConsent } from '@/lib/cookieManager';
import { trackAnalyticsEventAPI } from '@/lib/api';

export function AnalyticsRouteTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;

    const queryString = searchParams?.toString() ? `?${searchParams.toString()}` : '';
    const fullPath = `${pathname}${queryString}`;

    // Prevent duplicate tracks for same path in brief interval
    if (lastTrackedPathRef.current === fullPath) {
      return;
    }
    lastTrackedPathRef.current = fullPath;

    // Small delay to allow Next.js to update document.title
    const timer = setTimeout(() => {
      try {
        const context = getClientAnalyticsContext();
        const pageTitle = typeof document !== 'undefined' ? document.title : pathname;
        const referrer = typeof document !== 'undefined' ? document.referrer : '';

        trackAnalyticsEventAPI('PAGE_VIEW', {
          pagePath: pathname,
          pageTitle: pageTitle || pathname,
          referrer,
          visitorId: context.visitorId,
          sessionId: context.sessionId,
          deviceType: context.deviceType,
          browser: context.browser,
          consentStatus: context.consentStatus,
          eventData: {
            search: queryString || undefined,
            timestamp: new Date().toISOString(),
          },
        });
      } catch (err) {
        // Silently catch to not disrupt user experience
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}
