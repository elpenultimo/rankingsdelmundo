export type MetricKind =
  | "view"
  | "compare"
  | "share"
  | "copy_link"
  | "embed_copy";

export type MetricScope =
  | "ranking"
  | "compare_pais"
  | "compare_ciudad"
  | "pais"
  | "ciudad"
  | "categoria"
  | "tema"
  | "home";

export type MetricKey = `${MetricScope}:${string}`;
