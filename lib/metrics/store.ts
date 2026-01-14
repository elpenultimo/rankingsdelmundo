import "server-only";

import type { MetricKey, MetricKind, MetricScope } from "./types";

const hasKvEnv = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

type MetricsStore = {
  incr: (key: MetricKey, kind: MetricKind, dayKey: string) => Promise<void>;
  getTop: (
    kind: MetricKind,
    scope: MetricScope,
    days: number,
    limit: number
  ) => Promise<Array<{ key: MetricKey; count: number }>>;
};

const buildDailyKey = (kind: MetricKind, scope: MetricScope, dayKey: string) =>
  `metrics:${kind}:${scope}:${dayKey}`;

const memoryStore = (() => {
  const buckets = new Map<string, Map<string, number>>();

  const incr = async (key: MetricKey, kind: MetricKind, dayKey: string) => {
    const bucketKey = buildDailyKey(kind, key.split(":")[0] as MetricScope, dayKey);
    const bucket = buckets.get(bucketKey) ?? new Map<string, number>();
    const current = bucket.get(key) ?? 0;
    bucket.set(key, current + 1);
    buckets.set(bucketKey, bucket);
  };

  const getTop = async (
    kind: MetricKind,
    scope: MetricScope,
    days: number,
    limit: number
  ) => {
    const totals = new Map<MetricKey, number>();
    const dayKeys = buildRecentDayKeys(days);
    for (const dayKey of dayKeys) {
      const bucketKey = buildDailyKey(kind, scope, dayKey);
      const bucket = buckets.get(bucketKey);
      if (!bucket) continue;
      for (const [metricKey, count] of bucket.entries()) {
        totals.set(metricKey as MetricKey, (totals.get(metricKey as MetricKey) ?? 0) + count);
      }
    }
    return sortTotals(totals, limit);
  };

  return { incr, getTop } satisfies MetricsStore;
})();

type KvClient = {
  hincrby: (key: string, field: string, increment: number) => Promise<number>;
  hgetall: <T extends Record<string, number>>(key: string) => Promise<T | null>;
};

const kvStore = (() => {
  if (!hasKvEnv) return null;

  let kvClientPromise: Promise<KvClient | null> | null = null;

  const getClient = async () => {
    if (!kvClientPromise) {
      const dynamicImport = new Function("modulePath", "return import(modulePath)") as (
        modulePath: string
      ) => Promise<{ kv: KvClient }>;
      kvClientPromise = dynamicImport("@vercel/kv")
        .then((mod) => mod.kv)
        .catch(() => null);
    }
    return kvClientPromise;
  };

  const incr = async (key: MetricKey, kind: MetricKind, dayKey: string) => {
    const scope = key.split(":")[0] as MetricScope;
    const bucketKey = buildDailyKey(kind, scope, dayKey);
    const kv = await getClient();
    if (!kv) return;
    await kv.hincrby(bucketKey, key, 1);
  };

  const getTop = async (
    kind: MetricKind,
    scope: MetricScope,
    days: number,
    limit: number
  ) => {
    const kv = await getClient();
    if (!kv) return [];
    const totals = new Map<MetricKey, number>();
    const dayKeys = buildRecentDayKeys(days);

    await Promise.all(
      dayKeys.map(async (dayKey) => {
        const bucketKey = buildDailyKey(kind, scope, dayKey);
        const bucket = (await kv.hgetall<Record<string, number>>(bucketKey)) ?? {};
        for (const [metricKey, count] of Object.entries(bucket)) {
          const safeCount = typeof count === "number" ? count : Number(count);
          if (!Number.isFinite(safeCount)) continue;
          totals.set(
            metricKey as MetricKey,
            (totals.get(metricKey as MetricKey) ?? 0) + safeCount
          );
        }
      })
    );

    return sortTotals(totals, limit);
  };

  return { incr, getTop } satisfies MetricsStore;
})();

export const metricsStore: MetricsStore = kvStore ?? memoryStore;

export const getUtcDayKey = (date = new Date()) => {
  const year = date.getUTCFullYear();
  const month = `${date.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${date.getUTCDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const buildRecentDayKeys = (days: number) => {
  const safeDays = Math.max(1, Math.floor(days));
  const keys: string[] = [];
  const today = new Date();
  for (let i = 0; i < safeDays; i += 1) {
    const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    date.setUTCDate(date.getUTCDate() - i);
    keys.push(getUtcDayKey(date));
  }
  return keys;
};

const sortTotals = (totals: Map<MetricKey, number>, limit: number) =>
  Array.from(totals.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
