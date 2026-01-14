import { rankings, type Ranking } from "../data/rankings";
import { topics, type TopicKey } from "./topics";

const topicKeywordMap: Record<TopicKey, string[]> = {
  seguridad: ["seguro", "seguridad", "peligroso", "crimen", "violencia"],
  "costo-de-vida": ["barato", "caro", "costo", "coste", "precio", "renta", "arriendo", "vivienda"],
  "calidad-de-vida": ["calidad de vida", "bienestar", "servicios", "entorno"],
  impuestos: ["impuesto", "tribut", "tax", "fiscal"],
  sueldos: ["salario", "sueld", "ingreso", "remuneracion", "poder adquisitivo"],
  clima: ["clima", "temperatura", "humedad", "confort", "ambiental"],
  contaminacion: ["contaminacion", "contaminante", "calidad del aire", "emisiones"],
  transporte: ["movilidad", "transporte", "metro", "tránsito", "conectividad"],
  salud: ["salud", "sanitario", "bienestar", "hospital", "mortalidad"],
  educacion: ["educacion", "educativo", "educa", "escuela", "universidad", "aprendizaje"]
};

const normalizeText = (value: string) => value.toLowerCase();

const matchesTopicKeywords = (ranking: Ranking, topicKey: TopicKey) => {
  const keywords = topicKeywordMap[topicKey];
  if (!keywords.length) return false;
  const haystack = normalizeText(
    [ranking.title, ranking.description, ranking.methodology].join(" ")
  );
  return keywords.some((keyword) => haystack.includes(keyword));
};

const dedupeBySlug = (items: Ranking[]) => {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
};

export const getRankingsForTopic = (topicKey: TopicKey, limit = 20): Ranking[] => {
  const config = topics[topicKey];
  const seeded = config.rankingSlugs
    .map((slug) => rankings.find((ranking) => ranking.slug === slug))
    .filter((item): item is Ranking => Boolean(item));

  const discovered = rankings
    .filter((ranking) => matchesTopicKeywords(ranking, topicKey))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

  return dedupeBySlug([...seeded, ...discovered]).slice(0, limit);
};

export const getTopicsForRanking = (ranking: Ranking, limit = 3): TopicKey[] => {
  const haystack = normalizeText([ranking.title, ranking.description].join(" "));
  const matches = (Object.keys(topics) as TopicKey[])
    .filter((topicKey) => {
      const keywords = topicKeywordMap[topicKey];
      return keywords.some((keyword) => haystack.includes(keyword));
    })
    .slice(0, limit);

  return matches;
};
