"use client";

import type { MetricKind, MetricScope } from "./types";

const EVENT_THROTTLE_MS = 800;
const lastEvent = new Map<string, number>();

const shouldSend = (key: string) => {
  const now = Date.now();
  const last = lastEvent.get(key) ?? 0;
  if (now - last < EVENT_THROTTLE_MS) return false;
  lastEvent.set(key, now);
  return true;
};

const sendMetric = async (kind: MetricKind, scope: MetricScope, slug: string) => {
  const payload = { kind, scope, slug };
  try {
    await fetch("/api/metrics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch {
    // ignore network errors
  }
};

export const trackView = (scope: MetricScope, slug: string) => {
  if (typeof window === "undefined") return;
  const key = `viewed:${scope}:${slug}`;
  if (window.sessionStorage.getItem(key)) return;
  window.sessionStorage.setItem(key, "1");
  if (!shouldSend(`view:${scope}:${slug}`)) return;
  void sendMetric("view", scope, slug);
};

export const trackEvent = (kind: MetricKind, scope: MetricScope, slug: string) => {
  if (typeof window === "undefined") return;
  if (!shouldSend(`${kind}:${scope}:${slug}`)) return;
  void sendMetric(kind, scope, slug);
};
