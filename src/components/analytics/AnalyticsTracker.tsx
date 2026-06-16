"use client";

import { useEffect, useRef } from "react";

// Generate a simple unique session ID
function generateSessionId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Parse User Agent details on the client
function parseUserAgent() {
  const ua = navigator.userAgent;
  let browser = "Other";
  let os = "Other";
  let device = "Desktop";

  // Browser detection
  if (ua.indexOf("Firefox") > -1) browser = "Firefox";
  else if (ua.indexOf("SamsungBrowser") > -1) browser = "Samsung";
  else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) browser = "Opera";
  else if (ua.indexOf("Trident") > -1) browser = "IE";
  else if (ua.indexOf("Edge") > -1 || ua.indexOf("Edg") > -1) browser = "Edge";
  else if (ua.indexOf("Chrome") > -1) browser = "Chrome";
  else if (ua.indexOf("Safari") > -1) browser = "Safari";

  // OS detection
  if (ua.indexOf("Windows NT") > -1) os = "Windows";
  else if (ua.indexOf("Macintosh") > -1 || ua.indexOf("Mac OS X") > -1) os = "MacOS";
  else if (ua.indexOf("iPhone") > -1 || ua.indexOf("iPad") > -1) os = "iOS";
  else if (ua.indexOf("Android") > -1) os = "Android";
  else if (ua.indexOf("Linux") > -1) os = "Linux";

  // Device detection
  if (/Mobi|Android|iPhone|iPod/i.test(ua)) {
    device = "Mobile";
  } else if (/Tablet|iPad|PlayBook|Silk/i.test(ua)) {
    device = "Tablet";
  }

  return { browser, os, device };
}

// Global function to trigger custom events from components
export function trackAnalyticsEvent(eventName: string, eventValue?: string, eventType: string = "click") {
  if (typeof window === "undefined") return;
  const sessionId = sessionStorage.getItem("analytics_session_id");
  if (!sessionId) return;

  fetch("/api/analytics/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId,
      type: "event",
      payload: {
        eventType,
        eventName,
        eventValue,
      },
    }),
  }).catch((err) => console.error("Failed to track event:", err));
}

// Attach helper to window object so it's accessible globally
if (typeof window !== "undefined") {
  (window as unknown as { trackAnalyticsEvent: typeof trackAnalyticsEvent }).trackAnalyticsEvent = trackAnalyticsEvent;
}

export default function AnalyticsTracker() {
  const activeSectionRef = useRef<string>("/");
  const sectionTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Session Setup
    let sessionId = sessionStorage.getItem("analytics_session_id");
    let isNewSession = false;
    if (!sessionId) {
      sessionId = generateSessionId();
      sessionStorage.setItem("analytics_session_id", sessionId);
      isNewSession = true;
    }

    const { browser, os, device } = parseUserAgent();
    const referrer = document.referrer ? new URL(document.referrer).hostname : "Direct";

    // 2. Report Session Start & Page View
    const initAnalytics = async () => {
      try {
        if (isNewSession) {
          await fetch("/api/analytics/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sessionId,
              type: "session_start",
              payload: { browser, os, device, referrer },
            }),
          });
        }

        // Track main page load
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            type: "view",
            payload: { path: window.location.pathname, type: "page" },
          }),
        });
      } catch (err) {
        console.error("Error initializing analytics:", err);
      }
    };

    initAnalytics();

    // 3. Heartbeat (Every 10 seconds, tracks total time on site and active section duration)
    const heartbeatInterval = setInterval(() => {
      if (!document.hasFocus()) return; // Only track when page is active

      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          type: "heartbeat",
          payload: {
            path: activeSectionRef.current,
            type: activeSectionRef.current.startsWith("#") ? "section" : "page",
            duration: 10,
          },
        }),
      }).catch((err) => console.error("Heartbeat failed:", err));
    }, 10000);

    // 4. Section Reach Tracking (Intersection Observer)
    // Tracks when a section enters viewport and user stays there for >= 2 seconds
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.4, // Section occupies 40% of the screen
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = `#${entry.target.id}`;
        if (entry.isIntersecting) {
          // Set timeout to ensure they stay on this section for 2 seconds (not just scrolling fast)
          sectionTimeouts.current[sectionId] = setTimeout(() => {
            activeSectionRef.current = sectionId;
            fetch("/api/analytics/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                sessionId,
                type: "view",
                payload: { path: sectionId, type: "section" },
              }),
            }).catch((err) => console.error("Section view failed:", err));
          }, 2000);
        } else {
          // If scrolled away before 2s, cancel the view log
          if (sectionTimeouts.current[sectionId]) {
            clearTimeout(sectionTimeouts.current[sectionId]);
            delete sectionTimeouts.current[sectionId];
          }
        }
      });
    }, observerOptions);

    // Observe all sections in the portfolio
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => sectionObserver.observe(section));

    // 5. Automatic Click Event Interception
    const handleGlobalClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        // Explicitly annotated analytics elements
        const customName = target.getAttribute("data-analytics-name");
        if (customName) {
          const customVal = target.getAttribute("data-analytics-value") || "";
          const customType = target.getAttribute("data-analytics-type") || "click";
          trackAnalyticsEvent(customName, customVal, customType);
          break;
        }

        // Automatic hyperlink tracking
        if (target.tagName === "A") {
          const href = target.getAttribute("href") || "";
          const text = target.innerText || "";
          
          // Resume links
          if (href.toLowerCase().includes("resume") || text.toLowerCase().includes("resume")) {
            trackAnalyticsEvent("resume_download", href);
            break;
          }

          // Social or external outbound links
          if (href.startsWith("http") && !href.includes(window.location.host)) {
            if (href.includes("github.com")) {
              trackAnalyticsEvent("social_click", `GitHub (${href})`);
            } else if (href.includes("linkedin.com")) {
              trackAnalyticsEvent("social_click", `LinkedIn (${href})`);
            } else {
              trackAnalyticsEvent("outbound_click", href);
            }
            break;
          }
        }
        target = target.parentElement;
      }
    };

    document.addEventListener("click", handleGlobalClick);

    const timeouts = sectionTimeouts.current;

    return () => {
      clearInterval(heartbeatInterval);
      sectionObserver.disconnect();
      document.removeEventListener("click", handleGlobalClick);
      
      // Clear all active scroll timeouts
      Object.values(timeouts).forEach((t) => clearTimeout(t));
    };
  }, []);

  return null; // Invisible analytics background listener
}
