import type { ComparisonRow } from "../components/CompareDetail";

export const compareFaq = [
  {
    q: "¿De dónde salen estas métricas comparativas?",
    a: "Son índices referenciales derivados de rankings internos del sitio, diseñados para comparar tendencias generales."
  },
  {
    q: "¿Puedo usar esta comparación como dato oficial?",
    a: "No. Es una guía editorial y debe contrastarse con fuentes oficiales o estudios específicos."
  },
  {
    q: "¿Cómo se decide cuál es mejor?",
    a: "Se aplica una regla simple: en métricas numéricas se considera mejor el valor más alto o más bajo según el indicador."
  },
  {
    q: "¿Cada cuánto se actualizan las comparaciones?",
    a: "Se recalculan cuando actualizamos los rankings de origen o agregamos nuevas fuentes."
  },
  {
    q: "¿Qué significa que sea un índice referencial?",
    a: "Indica que es un valor estimado para comparar, no un dato exacto o definitivo."
  }
];

export const buildCompareIntro = (
  entityA: string,
  entityB: string,
  rows: ComparisonRow[]
) => {
  const highlights = rows
    .map((row) => row.label)
    .filter(Boolean)
    .slice(0, 3);
  const highlightsText = highlights.length
    ? `Analizamos métricas como ${highlights.join(", ")}`
    : "Analizamos métricas editoriales clave";

  return `Comparativa editorial entre ${entityA} y ${entityB}. ${highlightsText} para ayudarte a entender diferencias generales y tendencias.`;
};

export const buildCompareSummary = (
  entityA: string,
  entityB: string,
  rows: ComparisonRow[]
) => {
  let winsA = 0;
  let winsB = 0;
  let comparable = 0;

  rows.forEach((row) => {
    if (typeof row.aValue !== "number" || typeof row.bValue !== "number") return;
    if (row.aValue === row.bValue) return;
    comparable += 1;
    const betterWhen = row.betterWhen ?? "higher";
    if (betterWhen === "lower") {
      if (row.aValue < row.bValue) {
        winsA += 1;
      } else {
        winsB += 1;
      }
      return;
    }
    if (row.aValue > row.bValue) {
      winsA += 1;
    } else {
      winsB += 1;
    }
  });

  if (comparable === 0) {
    return `Según estos índices referenciales no hay suficientes métricas numéricas para determinar un ganador claro.`;
  }

  return `Según estos índices referenciales, ${entityA} gana ${winsA} métricas y ${entityB} gana ${winsB} en un total de ${comparable} comparables.`;
};

export const buildCompareItemListSchema = (
  entityA: string,
  entityB: string,
  rows: ComparisonRow[]
) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Comparación ${entityA} vs ${entityB}`,
  itemListElement: rows.map((row, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: row.label,
    description: `${entityA}: ${row.aValue ?? "—"} | ${entityB}: ${row.bValue ?? "—"}`
  }))
});
