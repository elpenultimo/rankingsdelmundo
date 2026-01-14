import type { CategoryKey, RankingYear, RegionKey } from "./taxonomy";

export type RankingCategory = CategoryKey;

export type RankingItem = {
  rank: number;
  name: string;
  value: string;
  note: string;
};

export type RankingFAQ = {
  q: string;
  a: string;
};

export type Ranking = {
  slug: string;
  title: string;
  description: string;
  category: RankingCategory;
  year?: RankingYear;
  regionScope?: RegionKey;
  updatedAt: string;
  methodology: string;
  sourceNote: string;
  items: RankingItem[];
  faq: RankingFAQ[];
  related: string[];
};

const buildItems = (prefix: string): RankingItem[] =>
  Array.from({ length: 20 }, (_, index) => {
    const rank = index + 1;
    return {
      rank,
      name: `${prefix} ${rank}`,
      value: `Índice ${80 - index * 1.3}`,
      note: "Estimación referencial"
    };
  });

const buildNamedItems = (names: string[]): RankingItem[] =>
  names.slice(0, 20).map((name, index) => ({
    rank: index + 1,
    name,
    value: `Índice ${80 - index * 1.3}`,
    note: "Estimación referencial"
  }));

const countryNames = [
  "Argentina",
  "Australia",
  "Alemania",
  "Brasil",
  "Canadá",
  "Chile",
  "China",
  "Colombia",
  "Corea del Sur",
  "España",
  "Estados Unidos",
  "Francia",
  "India",
  "Italia",
  "Japón",
  "México",
  "Países Bajos",
  "Perú",
  "Reino Unido",
  "Suecia"
];

const cityNames = [
  "Buenos Aires",
  "Santiago",
  "Ciudad de México",
  "Bogotá",
  "Lima",
  "Madrid",
  "Barcelona",
  "París",
  "Londres",
  "Nueva York",
  "Toronto",
  "Sídney",
  "Tokio",
  "Seúl",
  "Berlín",
  "Roma",
  "Ámsterdam",
  "Lisboa",
  "Miami",
  "São Paulo"
];

const baseFaq: RankingFAQ[] = [
  {
    q: "¿Cómo se calcula este ranking?",
    a: "Se agregan indicadores públicos y se normalizan para obtener un índice comparativo."
  },
  {
    q: "¿Con qué frecuencia se actualiza?",
    a: "Se revisa cuando hay nuevas publicaciones y se actualiza cada trimestre."
  },
  {
    q: "¿Puedo usar estos datos en reportes?",
    a: "Sí, como referencia informativa; recuerda citar la fuente original."
  }
];

export const rankings: Ranking[] = [
  {
    slug: "calidad-de-vida-global",
    title: "Ranking global de calidad de vida",
    description: "Comparativa de entornos urbanos con indicadores de bienestar, servicios y entorno social.",
    category: "vida",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-06-15",
    methodology: "Índice compuesto basado en acceso a servicios, seguridad percibida y entorno saludable.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(cityNames),
    faq: baseFaq,
    related: ["ciudades-mas-seguras", "ciudades-mas-verdes", "coste-de-vida-ciudades"]
  },
  {
    slug: "paises-mas-innovadores",
    title: "Países más innovadores",
    description: "Evaluación del ecosistema de innovación según inversión, talento y patentes.",
    category: "paises",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-05-22",
    methodology: "Se ponderan indicadores de I+D, capital humano y producción tecnológica.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(countryNames),
    faq: baseFaq,
    related: ["paises-mas-competitivos", "paises-mayor-inversion-educacion", "paises-con-mejor-salud"]
  },
  {
    slug: "ciudades-mas-seguras",
    title: "Ciudades más seguras",
    description: "Ranking de percepción de seguridad y respuesta institucional en áreas urbanas.",
    category: "ciudades",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-06-01",
    methodology: "Índice de seguridad basado en reportes públicos y encuestas ciudadanas.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(cityNames),
    faq: baseFaq,
    related: ["calidad-de-vida-global", "ciudades-mas-verdes", "ciudades-con-mejor-movilidad"]
  },
  {
    slug: "coste-de-vida-ciudades",
    title: "Coste de vida en ciudades",
    description: "Comparación del costo promedio de vivienda, transporte y servicios.",
    category: "dinero",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-04-30",
    methodology: "Índice relativo con costos de bienes esenciales y servicios urbanos.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(cityNames),
    faq: baseFaq,
    related: ["salarios-promedio-globales", "ciudades-mas-seguras", "economias-mas-estables"]
  },
  {
    slug: "salarios-promedio-globales",
    title: "Salarios promedio globales",
    description: "Comparativa de ingresos medios y poder adquisitivo por región.",
    category: "dinero",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-05-10",
    methodology: "Promedios estimados con ajuste por paridad de poder adquisitivo.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildItems("Región"),
    faq: baseFaq,
    related: ["economias-mas-estables", "coste-de-vida-ciudades", "paises-mas-competitivos"]
  },
  {
    slug: "climas-mas-agradables",
    title: "Climas más agradables",
    description: "Ranking basado en estabilidad térmica, humedad y confort anual.",
    category: "clima",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-03-18",
    methodology: "Se combinan indicadores de temperatura media, humedad y extremos climáticos.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildItems("Zona"),
    faq: baseFaq,
    related: ["ciudades-mas-verdes", "destinos-con-buena-calidad-aire", "mejores-playas-mundo"]
  },
  {
    slug: "ciudades-mas-verdes",
    title: "Ciudades más verdes",
    description: "Ranking de cobertura vegetal, parques urbanos y sostenibilidad.",
    category: "clima",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-04-12",
    methodology: "Índice compuesto de áreas verdes per cápita y políticas ambientales.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(cityNames),
    faq: baseFaq,
    related: ["climas-mas-agradables", "destinos-con-buena-calidad-aire", "ciudades-con-mejor-movilidad"]
  },
  {
    slug: "destinos-con-buena-calidad-aire",
    title: "Destinos con buena calidad de aire",
    description: "Comparativa de destinos con menor concentración de contaminantes.",
    category: "clima",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-05-02",
    methodology: "Promedio anual de concentración de partículas y gases principales.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildItems("Destino"),
    faq: baseFaq,
    related: ["ciudades-mas-verdes", "climas-mas-agradables", "ciudades-mas-seguras"]
  },
  {
    slug: "paises-mayor-inversion-educacion",
    title: "Países con mayor inversión educativa",
    description: "Ranking de esfuerzo presupuestario y cobertura educativa.",
    category: "paises",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-03-28",
    methodology: "Se pondera gasto educativo, cobertura y calidad de infraestructura.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(countryNames),
    faq: baseFaq,
    related: ["paises-mas-innovadores", "paises-con-mejor-salud", "paises-mas-competitivos"]
  },
  {
    slug: "paises-con-mejor-salud",
    title: "Países con mejor salud",
    description: "Ranking de acceso sanitario y bienestar general.",
    category: "vida",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-06-05",
    methodology: "Índice basado en acceso, calidad y resultados sanitarios generales.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(countryNames),
    faq: baseFaq,
    related: ["paises-mayor-inversion-educacion", "paises-mas-innovadores", "economias-mas-estables"]
  },
  {
    slug: "economias-mas-estables",
    title: "Economías más estables",
    description: "Comparativa de estabilidad macroeconómica y resiliencia.",
    category: "dinero",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-04-08",
    methodology: "Se ponderan inflación, empleo y balance fiscal en un índice sintético.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(countryNames),
    faq: baseFaq,
    related: ["salarios-promedio-globales", "paises-mas-competitivos", "coste-de-vida-ciudades"]
  },
  {
    slug: "ciudades-con-mejor-movilidad",
    title: "Ciudades con mejor movilidad",
    description: "Ranking de conectividad urbana, transporte público y accesibilidad.",
    category: "ciudades",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-05-29",
    methodology: "Índice combinado de cobertura, tiempos medios y multimodalidad.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(cityNames),
    faq: baseFaq,
    related: ["ciudades-mas-seguras", "ciudades-mas-verdes", "calidad-de-vida-global"]
  },
  {
    slug: "paises-mas-competitivos",
    title: "Países más competitivos",
    description: "Ranking de productividad, infraestructura y clima de negocios.",
    category: "paises",
    year: "2024",
    regionScope: "global",
    updatedAt: "2024-04-18",
    methodology: "Se combinan indicadores de productividad, apertura e infraestructura.",
    sourceNote: "Compilación de fuentes públicas con revisión editorial.",
    items: buildNamedItems(countryNames),
    faq: baseFaq,
    related: ["paises-mas-innovadores", "economias-mas-estables", "salarios-promedio-globales"]
  }
];

export const featuredRankings = rankings.slice(0, 6);

export const categories: { key: RankingCategory; label: string; description: string }[] = [
  { key: "paises", label: "Países", description: "Comparativas entre países y regiones." },
  { key: "ciudades", label: "Ciudades", description: "Rankings urbanos y estilo de vida." },
  { key: "dinero", label: "Dinero", description: "Economía, salarios y coste de vida." },
  { key: "clima", label: "Clima", description: "Ambiente, sostenibilidad y aire limpio." },
  { key: "vida", label: "Vida", description: "Bienestar, salud y calidad de vida." }
];

export const getRankingBySlug = (slug: string): Ranking | undefined =>
  rankings.find((ranking) => ranking.slug === slug);
