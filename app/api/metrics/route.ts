import { NextResponse } from "next/server";
import { getUtcDayKey, metricsStore } from "../../../lib/metrics/store";
import type { MetricKind, MetricScope } from "../../../lib/metrics/types";

const validKinds: MetricKind[] = ["view", "compare", "share", "copy_link", "embed_copy"];
const validScopes: MetricScope[] = [
  "ranking",
  "compare_pais",
  "compare_ciudad",
  "pais",
  "ciudad",
  "categoria",
  "tema",
  "home"
];

const slugPattern = /^[a-z0-9\-_.|:]+$/i;
const rateLimitWindowMs = 500;
const recentRequests = new Map<string, number>();

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { kind, scope, slug } = body as {
    kind?: MetricKind;
    scope?: MetricScope;
    slug?: string;
  };

  if (!kind || !scope || !slug) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!validKinds.includes(kind) || !validScopes.includes(scope)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const trimmedSlug = slug.trim();
  if (trimmedSlug.length === 0 || trimmedSlug.length > 140 || !slugPattern.test(trimmedSlug)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const rateKey = `${kind}:${scope}:${trimmedSlug}`;
  const now = Date.now();
  const last = recentRequests.get(rateKey);
  if (last && now - last < rateLimitWindowMs) {
    return NextResponse.json({ ok: true });
  }
  recentRequests.set(rateKey, now);

  const metricKey = `${scope}:${trimmedSlug}` as const;
  const dayKey = getUtcDayKey();

  await metricsStore.incr(metricKey, kind, dayKey);

  return NextResponse.json({ ok: true });
}
