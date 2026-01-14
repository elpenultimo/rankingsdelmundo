"use client";

import { useEffect } from "react";
import type { MetricScope } from "../lib/metrics/types";
import { trackView } from "../lib/metrics/client";

export const TrackView = ({ scope, slug }: { scope: MetricScope; slug: string }) => {
  useEffect(() => {
    trackView(scope, slug);
  }, [scope, slug]);

  return null;
};
