import type { CategoryKey, RegionKey } from "./taxonomy";
import { validateRankings } from "../lib/rankings-schema";

export type RankingCategory = CategoryKey;

export type RankingItem = {
  rank: number;
  name: string;
  value: number;
  note?: string;
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
  year: "2026";
  regionScope?: RegionKey;
  updatedAt: string;
  methodology: string;
  sourceNote: string;
  items: RankingItem[];
  faq: RankingFAQ[];
  related: string[];
};

const baseSourceNote =
  "Índices referenciales con compilación editorial de fuentes públicas. Consulta /fuentes para contexto.";

const buildRankedItems = (
  names: string[],
  start = 88,
  step = 2,
  note = "Índice referencial"
): RankingItem[] =>
  names.slice(0, 20).map((name, index) => ({
    rank: index + 1,
    name,
    value: Math.max(20, Math.round(start - index * step)),
    note
  }));

const buildFaq = (title: string, focus: string): RankingFAQ[] => [
  {
    q: `¿Qué mide el ranking "${title}"?`,
    a: `Resume un índice comparativo sobre ${focus}, construido con señales públicas y lectura editorial.`
  },
  {
    q: `¿Cómo se interpreta el índice en "${title}"?`,
    a: "Los valores son referenciales: sirven para comparar tendencias generales, no para fijar cifras exactas."
  },
  {
    q: `¿Qué tipo de fuentes se consideran para "${title}"?`,
    a: "Se consideran fuentes públicas y bases abiertas, junto con ponderación editorial para mantener consistencia."
  },
  {
    q: `¿Qué limita al ranking "${title}"?`,
    a: "No refleja microrealidades locales ni cambios recientes; es una guía comparativa de alto nivel."
  },
  {
    q: `¿Cómo usar "${title}" junto con rankings relacionados?`,
    a: "Combínalo con rankings de costo, seguridad o calidad de vida para una lectura más equilibrada."
  }
];

export const rankings: Ranking[] = [
  {
    slug: "paises-mas-baratos-para-vivir",
    title: "Países más baratos para vivir",
    description:
      "Comparativa editorial del costo cotidiano de vivir en distintos países. Útil para detectar destinos con gastos diarios más bajos.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-05",
    methodology:
      "Índice estimado relativo con foco en vivienda, alimentos, transporte y servicios básicos en cada país.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "India",
        "Vietnam",
        "Indonesia",
        "Filipinas",
        "Tailandia",
        "México",
        "Colombia",
        "Perú",
        "Bolivia",
        "Paraguay",
        "Ecuador",
        "Guatemala",
        "Marruecos",
        "Egipto",
        "Turquía",
        "Rumanía",
        "Bulgaria",
        "Serbia",
        "Portugal",
        "Nicaragua"
      ],
      84,
      1.5
    ),
    faq: buildFaq("Países más baratos para vivir", "accesibilidad de costos de vida"),
    related: [
      "paises-con-menor-costo-de-vida",
      "paises-donde-rinde-mas-el-sueldo",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-mas-seguros-del-mundo",
      "paises-mas-faciles-para-emigrar"
    ]
  },
  {
    slug: "paises-mas-caros-para-vivir",
    title: "Países más caros para vivir",
    description:
      "Ranking editorial sobre países donde los gastos diarios tienden a ser más altos. Ayuda a anticipar presupuestos exigentes.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-04",
    methodology:
      "Índice estimado relativo basado en costos de vivienda, servicios, transporte y consumo habitual.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Noruega",
        "Islandia",
        "Dinamarca",
        "Luxemburgo",
        "Irlanda",
        "Países Bajos",
        "Suecia",
        "Finlandia",
        "Alemania",
        "Francia",
        "Reino Unido",
        "Estados Unidos",
        "Canadá",
        "Australia",
        "Nueva Zelanda",
        "Japón",
        "Corea del Sur",
        "Singapur",
        "Emiratos Árabes Unidos"
      ],
      89,
      1.7
    ),
    faq: buildFaq("Países más caros para vivir", "niveles altos de costo de vida"),
    related: [
      "paises-mas-baratos-para-vivir",
      "paises-con-mejores-sueldos",
      "paises-con-mayor-poder-adquisitivo",
      "paises-con-mas-impuestos",
      "paises-con-mejor-calidad-de-vida"
    ]
  },
  {
    slug: "paises-mas-seguros-del-mundo",
    title: "Países más seguros del mundo",
    description:
      "Lista comparativa sobre percepción de seguridad y estabilidad social. Orienta sobre destinos con entornos más previsibles.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-03",
    methodology:
      "Índices referenciales basados en fuentes públicas y compilación editorial sobre seguridad y entorno institucional.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Islandia",
        "Suiza",
        "Japón",
        "Singapur",
        "Noruega",
        "Dinamarca",
        "Finlandia",
        "Suecia",
        "Austria",
        "Alemania",
        "Nueva Zelanda",
        "Canadá",
        "Portugal",
        "Países Bajos",
        "Irlanda",
        "República Checa",
        "Eslovenia",
        "Australia",
        "España",
        "Corea del Sur"
      ],
      90,
      1.4
    ),
    faq: buildFaq("Países más seguros del mundo", "seguridad percibida y condiciones de estabilidad"),
    related: [
      "paises-mas-peligrosos-del-mundo",
      "paises-con-mejor-calidad-de-vida",
      "paises-mas-felices",
      "paises-con-mejor-sistema-de-salud",
      "paises-con-mejor-educacion"
    ]
  },
  {
    slug: "paises-mas-peligrosos-del-mundo",
    title: "Países más peligrosos del mundo",
    description:
      "Ranking editorial que resume escenarios de mayor riesgo percibido. Sirve para contextualizar destinos con desafíos de seguridad.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-03",
    methodology:
      "Índices referenciales basados en reportes públicos, conflicto y percepción social compilados editorialmente.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Venezuela",
        "Haití",
        "Honduras",
        "Nigeria",
        "Sudáfrica",
        "Ucrania",
        "Colombia",
        "México",
        "Brasil",
        "Guatemala",
        "Jamaica",
        "Perú",
        "Ecuador",
        "Egipto",
        "Argelia",
        "Túnez",
        "India",
        "Indonesia",
        "Filipinas",
        "Kenia"
      ],
      88,
      1.6
    ),
    faq: buildFaq("Países más peligrosos del mundo", "riesgos de seguridad y estabilidad"),
    related: [
      "paises-mas-seguros-del-mundo",
      "paises-mas-faciles-para-emigrar",
      "paises-con-mejor-calidad-de-vida",
      "paises-mas-contaminados-del-mundo",
      "paises-con-mas-desempleo"
    ]
  },
  {
    slug: "paises-con-mejor-calidad-de-vida",
    title: "Países con mejor calidad de vida",
    description:
      "Ranking editorial sobre bienestar general, servicios y entorno social. Enfocado en la experiencia diaria de vivir en cada país.",
    category: "vida",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-02",
    methodology:
      "Índice compuesto que integra bienestar percibido, acceso a servicios y entorno urbano según fuentes públicas.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Noruega",
        "Suecia",
        "Dinamarca",
        "Países Bajos",
        "Finlandia",
        "Austria",
        "Alemania",
        "Canadá",
        "Nueva Zelanda",
        "Australia",
        "Irlanda",
        "Luxemburgo",
        "Francia",
        "Bélgica",
        "España",
        "Portugal",
        "Japón",
        "Corea del Sur",
        "Singapur"
      ],
      89,
      1.3
    ),
    faq: buildFaq("Países con mejor calidad de vida", "condiciones de bienestar y servicios"),
    related: [
      "paises-mas-felices",
      "paises-con-mejor-sistema-de-salud",
      "paises-con-mejor-educacion",
      "paises-con-mejor-equilibrio-vida-trabajo",
      "paises-mas-seguros-del-mundo"
    ]
  },
  {
    slug: "paises-mas-felices",
    title: "Países más felices",
    description:
      "Comparativa editorial sobre bienestar subjetivo y satisfacción de vida. Útil para entender percepciones de felicidad a nivel país.",
    category: "vida",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-02",
    methodology:
      "Índice referencial con señales de bienestar, cohesión social y percepción de vida compiladas editorialmente.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Finlandia",
        "Dinamarca",
        "Islandia",
        "Suecia",
        "Noruega",
        "Países Bajos",
        "Suiza",
        "Irlanda",
        "Luxemburgo",
        "Austria",
        "Alemania",
        "Canadá",
        "Nueva Zelanda",
        "Australia",
        "España",
        "Portugal",
        "Bélgica",
        "Francia",
        "Reino Unido",
        "Italia"
      ],
      88,
      1.4
    ),
    faq: buildFaq("Países más felices", "bienestar subjetivo y satisfacción general"),
    related: [
      "paises-con-mejor-calidad-de-vida",
      "paises-con-mejor-equilibrio-vida-trabajo",
      "paises-mas-seguros-del-mundo",
      "paises-con-mejor-sistema-de-salud",
      "paises-con-mejor-clima-para-vivir"
    ]
  },
  {
    slug: "paises-con-mejor-pasaporte",
    title: "Países con mejor pasaporte",
    description:
      "Ranking editorial sobre facilidad de movilidad internacional. Indica la amplitud de acceso sin visado o con visado simplificado.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-01",
    methodology:
      "Índice referencial que combina cobertura de acceso y restricciones reportadas por fuentes públicas.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Japón",
        "Singapur",
        "Alemania",
        "Italia",
        "España",
        "Francia",
        "Finlandia",
        "Suecia",
        "Países Bajos",
        "Luxemburgo",
        "Corea del Sur",
        "Austria",
        "Dinamarca",
        "Irlanda",
        "Portugal",
        "Bélgica",
        "República Checa",
        "Polonia",
        "Grecia",
        "Suiza"
      ],
      90,
      1.1
    ),
    faq: buildFaq("Países con mejor pasaporte", "acceso internacional y movilidad"),
    related: [
      "paises-mas-visitados-del-mundo",
      "paises-mas-faciles-para-emigrar",
      "paises-con-mejor-calidad-de-vida",
      "paises-con-mejor-educacion",
      "paises-mas-seguros-del-mundo"
    ]
  },
  {
    slug: "paises-con-menos-impuestos",
    title: "Países con menos impuestos",
    description:
      "Ranking editorial sobre carga tributaria percibida como baja. Útil para evaluar competitividad fiscal y atractivo económico.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-31",
    methodology:
      "Índice referencial que combina presión fiscal general y señales de competitividad tributaria.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Emiratos Árabes Unidos",
        "Qatar",
        "Kuwait",
        "Arabia Saudita",
        "Panamá",
        "Paraguay",
        "Bulgaria",
        "Rumanía",
        "Serbia",
        "Turquía",
        "Costa Rica",
        "México",
        "República Dominicana",
        "Guatemala",
        "Ecuador",
        "Chile",
        "Uruguay",
        "Colombia",
        "Indonesia",
        "Singapur"
      ],
      86,
      1.2
    ),
    faq: buildFaq("Países con menos impuestos", "carga fiscal relativa"),
    related: [
      "paises-con-mas-impuestos",
      "paises-con-mejores-sueldos",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-mayor-poder-adquisitivo",
      "paises-mas-convenientes-para-freelancers"
    ]
  },
  {
    slug: "paises-con-mas-impuestos",
    title: "Países con más impuestos",
    description:
      "Comparativa editorial sobre presión fiscal elevada. Útil para entender contextos con mayor recaudación y servicios públicos amplios.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-31",
    methodology:
      "Índice referencial que pondera carga tributaria y peso de contribuciones sobre ingresos y consumo.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suecia",
        "Dinamarca",
        "Finlandia",
        "Bélgica",
        "Francia",
        "Austria",
        "Alemania",
        "Italia",
        "Noruega",
        "Países Bajos",
        "España",
        "Portugal",
        "Reino Unido",
        "Canadá",
        "Islandia",
        "Luxemburgo",
        "Grecia",
        "Eslovenia",
        "Hungría",
        "República Checa"
      ],
      88,
      1.1
    ),
    faq: buildFaq("Países con más impuestos", "presión fiscal y recaudación"),
    related: [
      "paises-con-menos-impuestos",
      "paises-con-mejores-sueldos",
      "paises-donde-rinde-mas-el-sueldo",
      "paises-con-mayor-poder-adquisitivo",
      "paises-con-menor-inflacion"
    ]
  },
  {
    slug: "paises-con-mejores-sueldos",
    title: "Países con mejores sueldos",
    description:
      "Ranking editorial de ingresos promedio más altos. Orienta sobre mercados laborales con mayores niveles salariales.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-30",
    methodology:
      "Índice referencial de salarios con ajustes generales por poder adquisitivo y costo de vida.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Estados Unidos",
        "Noruega",
        "Dinamarca",
        "Luxemburgo",
        "Alemania",
        "Australia",
        "Países Bajos",
        "Canadá",
        "Irlanda",
        "Suecia",
        "Austria",
        "Bélgica",
        "Singapur",
        "Reino Unido",
        "Finlandia",
        "Francia",
        "Japón",
        "Nueva Zelanda",
        "Corea del Sur"
      ],
      90,
      1.3
    ),
    faq: buildFaq("Países con mejores sueldos", "ingresos promedio y salarios"),
    related: [
      "paises-donde-rinde-mas-el-sueldo",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-mayor-poder-adquisitivo",
      "paises-mas-caros-para-vivir",
      "paises-con-menos-impuestos"
    ]
  },
  {
    slug: "paises-donde-rinde-mas-el-sueldo",
    title: "Países donde rinde más el sueldo",
    description:
      "Ranking editorial sobre dónde el ingreso se aprovecha mejor. Combina salarios relativos con costo de vida.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-29",
    methodology:
      "Índice referencial que cruza ingresos promedio con costo de vida estimado y precios esenciales.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Luxemburgo",
        "Suiza",
        "Estados Unidos",
        "Noruega",
        "Países Bajos",
        "Alemania",
        "Canadá",
        "Dinamarca",
        "Suecia",
        "Finlandia",
        "Austria",
        "Bélgica",
        "Irlanda",
        "Singapur",
        "Emiratos Árabes Unidos",
        "Nueva Zelanda",
        "Japón",
        "Corea del Sur",
        "España",
        "Portugal"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Países donde rinde más el sueldo", "relación entre ingresos y precios"),
    related: [
      "paises-con-mejores-sueldos",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-menor-costo-de-vida",
      "paises-con-mayor-poder-adquisitivo",
      "paises-mas-baratos-para-vivir"
    ]
  },
  {
    slug: "paises-mas-faciles-para-emigrar",
    title: "Países más fáciles para emigrar",
    description:
      "Ranking editorial sobre destinos con procesos migratorios percibidos como más accesibles. Útil para explorar opciones viables.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-28",
    methodology:
      "Índice referencial basado en políticas migratorias públicas, programas de atracción y facilidad administrativa.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Canadá",
        "Portugal",
        "España",
        "Australia",
        "Nueva Zelanda",
        "Alemania",
        "Irlanda",
        "Países Bajos",
        "Suecia",
        "Noruega",
        "Uruguay",
        "Argentina",
        "Chile",
        "Costa Rica",
        "Panamá",
        "México",
        "Colombia",
        "Brasil",
        "Francia",
        "Italia"
      ],
      87,
      1.2
    ),
    faq: buildFaq("Países más fáciles para emigrar", "accesibilidad migratoria y procesos"),
    related: [
      "paises-con-mejor-pasaporte",
      "paises-con-mejor-calidad-de-vida",
      "paises-mas-seguros-del-mundo",
      "paises-con-mejores-sueldos",
      "paises-mas-baratos-para-vivir"
    ]
  },
  {
    slug: "paises-mas-visitados-del-mundo",
    title: "Países más visitados del mundo",
    description:
      "Ranking editorial sobre destinos con mayor flujo turístico. Resume popularidad, conectividad y atractivo cultural.",
    category: "paises",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-27",
    methodology:
      "Índice referencial que combina volumen turístico, conectividad aérea y atractivo cultural reportado.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Francia",
        "España",
        "Estados Unidos",
        "China",
        "Italia",
        "Turquía",
        "México",
        "Tailandia",
        "Reino Unido",
        "Alemania",
        "Grecia",
        "Austria",
        "Emiratos Árabes Unidos",
        "Portugal",
        "Países Bajos",
        "Polonia",
        "Japón",
        "Malasia",
        "Vietnam",
        "Canadá"
      ],
      89,
      1.4
    ),
    faq: buildFaq("Países más visitados del mundo", "atractivo turístico y conectividad"),
    related: [
      "ciudades-mas-turisticas",
      "paises-con-mejor-pasaporte",
      "paises-con-mejor-clima-para-vivir",
      "paises-mas-seguros-del-mundo",
      "paises-mas-felices"
    ]
  },
  {
    slug: "paises-mas-calidos-del-mundo",
    title: "Países más cálidos del mundo",
    description:
      "Ranking editorial de destinos con clima predominantemente cálido. Útil para quienes buscan temperaturas altas y constancia térmica.",
    category: "clima",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-26",
    methodology:
      "Se combinan promedios de temperatura y percepción general del calor con fuentes públicas.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Emiratos Árabes Unidos",
        "Qatar",
        "Kuwait",
        "Arabia Saudita",
        "Egipto",
        "Marruecos",
        "Argelia",
        "Túnez",
        "India",
        "Indonesia",
        "Vietnam",
        "Tailandia",
        "Filipinas",
        "Malasia",
        "Australia",
        "México",
        "Brasil",
        "Colombia",
        "Panamá",
        "Nigeria"
      ],
      86,
      1.5
    ),
    faq: buildFaq("Países más cálidos del mundo", "temperaturas altas y clima cálido"),
    related: [
      "paises-con-mejor-clima-para-vivir",
      "paises-mas-frios-del-mundo",
      "ciudades-con-mejor-clima",
      "paises-mas-contaminados-del-mundo",
      "paises-mas-visitados-del-mundo"
    ]
  },
  {
    slug: "paises-mas-frios-del-mundo",
    title: "Países más fríos del mundo",
    description:
      "Ranking editorial sobre destinos con temperaturas bajas durante gran parte del año. Útil para entender climas fríos y extremos.",
    category: "clima",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-26",
    methodology:
      "Se utilizan promedios de temperatura y frecuencia de frío extremo como índices referenciales.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Canadá",
        "Noruega",
        "Suecia",
        "Finlandia",
        "Islandia",
        "Estonia",
        "Letonia",
        "Lituania",
        "Polonia",
        "Ucrania",
        "Bielorrusia",
        "República Checa",
        "Eslovaquia",
        "Austria",
        "Suiza",
        "Alemania",
        "Hungría",
        "Rumanía",
        "Serbia",
        "Nueva Zelanda"
      ],
      87,
      1.3
    ),
    faq: buildFaq("Países más fríos del mundo", "climas fríos y temperaturas bajas"),
    related: [
      "paises-mas-calidos-del-mundo",
      "paises-con-mejor-clima-para-vivir",
      "ciudades-con-mejor-clima",
      "paises-mas-contaminados-del-mundo",
      "paises-con-mejor-calidad-de-vida"
    ]
  },
  {
    slug: "paises-mas-contaminados-del-mundo",
    title: "Países más contaminados del mundo",
    description:
      "Ranking editorial sobre exposición a contaminación ambiental. Ayuda a comparar presión ambiental entre países.",
    category: "clima",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-25",
    methodology:
      "Índices referenciales basados en calidad del aire, emisiones y señales públicas sobre contaminación.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "India",
        "China",
        "Indonesia",
        "Vietnam",
        "Tailandia",
        "Filipinas",
        "Egipto",
        "Nigeria",
        "Sudáfrica",
        "Marruecos",
        "Argelia",
        "Túnez",
        "Turquía",
        "México",
        "Brasil",
        "Colombia",
        "Perú",
        "Chile",
        "Ghana",
        "Etiopía"
      ],
      88,
      1.4
    ),
    faq: buildFaq("Países más contaminados del mundo", "presión ambiental y contaminación"),
    related: [
      "ciudades-mas-contaminadas",
      "ciudades-mas-limpias",
      "paises-con-mejor-clima-para-vivir",
      "paises-mas-calidos-del-mundo",
      "paises-con-mejor-sistema-de-salud"
    ]
  },
  {
    slug: "ciudades-mas-baratas-para-vivir",
    title: "Ciudades más baratas para vivir",
    description:
      "Comparativa editorial de ciudades con costos diarios accesibles. Ideal para estimar gastos urbanos más bajos.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-05",
    methodology:
      "Índice estimado relativo que combina vivienda, transporte y consumo urbano habitual.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Ciudad de México",
        "Bogotá",
        "Lima",
        "Quito",
        "La Paz",
        "Asunción",
        "Medellín",
        "Córdoba",
        "Rosario",
        "Guadalajara",
        "Puebla",
        "San José",
        "Panamá",
        "Santo Domingo",
        "Hanoi",
        "Ho Chi Minh",
        "Bangkok",
        "Manila",
        "Bucarest",
        "Sofía"
      ],
      84,
      1.4
    ),
    faq: buildFaq("Ciudades más baratas para vivir", "costos urbanos bajos"),
    related: [
      "ciudades-mas-caras-para-vivir",
      "mejores-ciudades-para-vivir",
      "ciudades-con-mejor-transporte-publico",
      "ciudades-mas-caminables",
      "paises-mas-baratos-para-vivir"
    ]
  },
  {
    slug: "ciudades-mas-caras-para-vivir",
    title: "Ciudades más caras para vivir",
    description:
      "Ranking editorial de ciudades con mayor presión de costos. Ayuda a anticipar presupuestos urbanos exigentes.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-04",
    methodology:
      "Índice relativo con foco en vivienda, servicios, transporte y consumo urbano premium.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Zúrich",
        "Ginebra",
        "Nueva York",
        "Londres",
        "París",
        "Singapur",
        "Hong Kong",
        "Sídney",
        "Melbourne",
        "Toronto",
        "Vancouver",
        "San Francisco",
        "Los Ángeles",
        "Tokio",
        "Seúl",
        "Oslo",
        "Copenhague",
        "Estocolmo",
        "Dublín",
        "Ámsterdam"
      ],
      90,
      1.6
    ),
    faq: buildFaq("Ciudades más caras para vivir", "alto costo urbano"),
    related: [
      "ciudades-mas-baratas-para-vivir",
      "mejores-ciudades-para-vivir",
      "ciudades-con-mejor-transporte-publico",
      "ciudades-mas-turisticas",
      "paises-mas-caros-para-vivir"
    ]
  },
  {
    slug: "ciudades-mas-seguras-del-mundo",
    title: "Ciudades más seguras del mundo",
    description:
      "Ranking editorial de urbes con alta percepción de seguridad. Útil para comparar entornos urbanos confiables.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-03",
    methodology:
      "Índices referenciales basados en fuentes públicas, percepción ciudadana y estabilidad urbana.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Tokio",
        "Singapur",
        "Zúrich",
        "Copenhague",
        "Helsinki",
        "Oslo",
        "Viena",
        "Múnich",
        "Toronto",
        "Vancouver",
        "Sídney",
        "Melbourne",
        "Seúl",
        "Madrid",
        "Lisboa",
        "Praga",
        "Tallin",
        "Estocolmo",
        "Ámsterdam",
        "Ginebra"
      ],
      90,
      1.3
    ),
    faq: buildFaq("Ciudades más seguras del mundo", "seguridad urbana y estabilidad"),
    related: [
      "ciudades-mas-peligrosas-del-mundo",
      "mejores-ciudades-para-vivir",
      "ciudades-mas-caminables",
      "ciudades-con-mejor-transporte-publico",
      "paises-mas-seguros-del-mundo"
    ]
  },
  {
    slug: "ciudades-mas-peligrosas-del-mundo",
    title: "Ciudades más peligrosas del mundo",
    description:
      "Ranking editorial de ciudades con mayor percepción de riesgo. Útil para contextualizar desafíos de seguridad urbana.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-03",
    methodology:
      "Índices referenciales basados en reportes públicos, conflictividad urbana y percepción social.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Caracas",
        "San Pedro Sula",
        "Tegucigalpa",
        "Ciudad Juárez",
        "Tijuana",
        "Río de Janeiro",
        "Salvador",
        "Fortaleza",
        "Guayaquil",
        "Lima",
        "Bogotá",
        "Medellín",
        "Ciudad de México",
        "Belo Horizonte",
        "Johannesburgo",
        "Durban",
        "Nairobi",
        "Lagos",
        "Kingston",
        "Port-au-Prince"
      ],
      88,
      1.6
    ),
    faq: buildFaq("Ciudades más peligrosas del mundo", "riesgos urbanos y seguridad"),
    related: [
      "ciudades-mas-seguras-del-mundo",
      "ciudades-mas-contaminadas",
      "ciudades-mas-turisticas",
      "paises-mas-peligrosos-del-mundo",
      "mejores-ciudades-para-vivir"
    ]
  },
  {
    slug: "mejores-ciudades-para-vivir",
    title: "Mejores ciudades para vivir",
    description:
      "Ranking editorial de ciudades con alto bienestar urbano. Resume servicios, entorno social y vida cotidiana.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-02",
    methodology:
      "Índice compuesto con acceso a servicios, seguridad, movilidad y entorno urbano percibido.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Viena",
        "Copenhague",
        "Zúrich",
        "Múnich",
        "Ámsterdam",
        "Barcelona",
        "Madrid",
        "Lisboa",
        "Berlín",
        "Toronto",
        "Vancouver",
        "Sídney",
        "Melbourne",
        "Auckland",
        "Helsinki",
        "Estocolmo",
        "Oslo",
        "Singapur",
        "Tokio",
        "Seúl"
      ],
      89,
      1.3
    ),
    faq: buildFaq("Mejores ciudades para vivir", "bienestar urbano y servicios"),
    related: [
      "ciudades-mas-seguras-del-mundo",
      "ciudades-con-mejor-transporte-publico",
      "ciudades-mas-caminables",
      "ciudades-con-mejor-clima",
      "paises-con-mejor-calidad-de-vida"
    ]
  },
  {
    slug: "ciudades-con-mejor-transporte-publico",
    title: "Ciudades con mejor transporte público",
    description:
      "Ranking editorial sobre eficiencia y cobertura del transporte público urbano. Ideal para comparar movilidad diaria.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-01",
    methodology:
      "Índice referencial que pondera cobertura, frecuencia, integración y percepción de servicio.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Tokio",
        "Seúl",
        "Singapur",
        "Londres",
        "París",
        "Madrid",
        "Barcelona",
        "Berlín",
        "Múnich",
        "Zúrich",
        "Ámsterdam",
        "Copenhague",
        "Estocolmo",
        "Viena",
        "Praga",
        "Hong Kong",
        "Shanghái",
        "Pekín",
        "Toronto",
        "Sídney"
      ],
      90,
      1.2
    ),
    faq: buildFaq("Ciudades con mejor transporte público", "movilidad urbana y transporte"),
    related: [
      "ciudades-mas-caminables",
      "mejores-ciudades-para-vivir",
      "ciudades-mas-seguras-del-mundo",
      "ciudades-mas-turisticas",
      "ciudades-mas-caras-para-vivir"
    ]
  },
  {
    slug: "ciudades-mas-caminables",
    title: "Ciudades más caminables",
    description:
      "Ranking editorial de ciudades con alta caminabilidad. Resume accesibilidad peatonal y cercanía de servicios clave.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-01",
    methodology:
      "Índice referencial basado en densidad urbana, conectividad peatonal y servicios a corta distancia.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Barcelona",
        "Madrid",
        "Lisboa",
        "París",
        "Londres",
        "Ámsterdam",
        "Copenhague",
        "Viena",
        "Praga",
        "Florencia",
        "Roma",
        "Berlín",
        "Múnich",
        "Zúrich",
        "Oslo",
        "Estocolmo",
        "Helsinki",
        "Tokio",
        "Kioto",
        "Seúl"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Ciudades más caminables", "caminabilidad y accesibilidad peatonal"),
    related: [
      "ciudades-con-mejor-transporte-publico",
      "mejores-ciudades-para-vivir",
      "ciudades-mas-seguras-del-mundo",
      "ciudades-con-mejor-clima",
      "ciudades-mas-caras-para-vivir"
    ]
  },
  {
    slug: "ciudades-con-mejor-clima",
    title: "Ciudades con mejor clima",
    description:
      "Ranking editorial sobre ciudades con clima percibido como agradable. Útil para evaluar confort térmico anual.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-31",
    methodology:
      "Promedios y percepción general de estabilidad térmica, humedad y extremos climáticos.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Málaga",
        "Valencia",
        "Lisboa",
        "Oporto",
        "Barcelona",
        "San Diego",
        "Los Ángeles",
        "Miami",
        "Honolulu",
        "Auckland",
        "Sídney",
        "Brisbane",
        "Ciudad del Cabo",
        "Las Palmas",
        "Alicante",
        "Lima",
        "Quito",
        "Medellín",
        "San José",
        "Montevideo"
      ],
      87,
      1.3
    ),
    faq: buildFaq("Ciudades con mejor clima", "confort climático urbano"),
    related: [
      "paises-con-mejor-clima-para-vivir",
      "paises-mas-calidos-del-mundo",
      "paises-mas-frios-del-mundo",
      "ciudades-mas-limpias",
      "mejores-ciudades-para-vivir"
    ]
  },
  {
    slug: "ciudades-mas-contaminadas",
    title: "Ciudades más contaminadas",
    description:
      "Ranking editorial sobre ciudades con mayor presión ambiental. Resume niveles de contaminación reportados públicamente.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-30",
    methodology:
      "Índices referenciales basados en calidad del aire y reportes públicos de emisiones.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Delhi",
        "Lahore",
        "Dhaka",
        "Ulán Bator",
        "Pekín",
        "Mumbai",
        "Karachi",
        "Kabul",
        "El Cairo",
        "Lagos",
        "Jakarta",
        "Hanói",
        "Ho Chi Minh",
        "Bangkok",
        "Ciudad de México",
        "Santiago",
        "Bogotá",
        "Medellín",
        "Teherán",
        "Kuwait City"
      ],
      88,
      1.4
    ),
    faq: buildFaq("Ciudades más contaminadas", "contaminación urbana y calidad del aire"),
    related: [
      "ciudades-mas-limpias",
      "paises-mas-contaminados-del-mundo",
      "ciudades-con-mejor-clima",
      "paises-con-mejor-sistema-de-salud",
      "ciudades-mas-peligrosas-del-mundo"
    ]
  },
  {
    slug: "ciudades-mas-limpias",
    title: "Ciudades más limpias",
    description:
      "Ranking editorial de ciudades con menor presión ambiental percibida. Útil para comparar calidad de aire y gestión urbana.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-30",
    methodology:
      "Índice referencial basado en calidad del aire, políticas de sostenibilidad y percepción ciudadana.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Reikiavik",
        "Helsinki",
        "Copenhague",
        "Oslo",
        "Estocolmo",
        "Zúrich",
        "Ginebra",
        "Viena",
        "Vancouver",
        "Calgary",
        "Ottawa",
        "Wellington",
        "Auckland",
        "Sídney",
        "Melbourne",
        "Singapur",
        "Tallin",
        "Lisboa",
        "Brisbane",
        "Friburgo"
      ],
      89,
      1.3
    ),
    faq: buildFaq("Ciudades más limpias", "limpieza urbana y calidad ambiental"),
    related: [
      "ciudades-mas-contaminadas",
      "ciudades-con-mejor-clima",
      "mejores-ciudades-para-vivir",
      "paises-mas-contaminados-del-mundo",
      "ciudades-mas-seguras-del-mundo"
    ]
  },
  {
    slug: "ciudades-mas-turisticas",
    title: "Ciudades más turísticas",
    description:
      "Ranking editorial de ciudades con mayor atractivo turístico. Resume flujo de visitantes, oferta cultural y conectividad.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-29",
    methodology:
      "Índice referencial que combina volumen de visitas, infraestructura turística y relevancia cultural.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "París",
        "Londres",
        "Roma",
        "Barcelona",
        "Madrid",
        "Estambul",
        "Bangkok",
        "Tokio",
        "Nueva York",
        "Los Ángeles",
        "Miami",
        "Las Vegas",
        "Dubái",
        "Singapur",
        "Hong Kong",
        "Ámsterdam",
        "Venecia",
        "Praga",
        "Lisboa",
        "Florencia"
      ],
      90,
      1.2
    ),
    faq: buildFaq("Ciudades más turísticas", "atractivo turístico y visitas"),
    related: [
      "paises-mas-visitados-del-mundo",
      "ciudades-con-mejor-vida-nocturna",
      "ciudades-con-mejor-transporte-publico",
      "ciudades-mas-caras-para-vivir",
      "ciudades-con-mejor-clima"
    ]
  },
  {
    slug: "ciudades-con-mejor-vida-nocturna",
    title: "Ciudades con mejor vida nocturna",
    description:
      "Ranking editorial sobre ciudades con oferta nocturna destacada. Resume diversidad de ocio, cultura y horarios extendidos.",
    category: "ciudades",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-28",
    methodology:
      "Índice referencial basado en densidad de oferta cultural, eventos y percepción de vida nocturna.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Berlín",
        "Barcelona",
        "Madrid",
        "Londres",
        "Nueva York",
        "Miami",
        "París",
        "Ámsterdam",
        "Praga",
        "Budapest",
        "Ciudad de México",
        "Buenos Aires",
        "São Paulo",
        "Río de Janeiro",
        "Bogotá",
        "Medellín",
        "Bangkok",
        "Seúl",
        "Tokio",
        "Los Ángeles"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Ciudades con mejor vida nocturna", "ocio nocturno y cultura"),
    related: [
      "ciudades-mas-turisticas",
      "mejores-ciudades-para-vivir",
      "ciudades-mas-seguras-del-mundo",
      "ciudades-mas-caras-para-vivir",
      "paises-mas-visitados-del-mundo"
    ]
  },
  {
    slug: "paises-con-menor-costo-de-vida",
    title: "Países con menor costo de vida",
    description:
      "Ranking editorial sobre países con menor costo relativo. Ofrece una lectura rápida del nivel de gasto esperado.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-05",
    methodology:
      "Índice estimado relativo con foco en precios básicos y servicios esenciales.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "India",
        "Vietnam",
        "Filipinas",
        "Indonesia",
        "Tailandia",
        "México",
        "Colombia",
        "Perú",
        "Ecuador",
        "Bolivia",
        "Paraguay",
        "Guatemala",
        "Honduras",
        "Nicaragua",
        "Marruecos",
        "Egipto",
        "Túnez",
        "Rumanía",
        "Bulgaria",
        "Serbia"
      ],
      85,
      1.4
    ),
    faq: buildFaq("Países con menor costo de vida", "gastos esenciales y precio relativo"),
    related: [
      "paises-mas-baratos-para-vivir",
      "paises-donde-rinde-mas-el-sueldo",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-mayor-poder-adquisitivo",
      "paises-mas-caros-para-vivir"
    ]
  },
  {
    slug: "paises-con-mayor-poder-adquisitivo",
    title: "Países con mayor poder adquisitivo",
    description:
      "Ranking editorial sobre capacidad de compra relativa. Combina ingresos y precios para estimar el poder de compra.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-04",
    methodology:
      "Índice referencial que cruza ingresos promedio con precios esenciales y paridad de compra.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Luxemburgo",
        "Noruega",
        "Dinamarca",
        "Países Bajos",
        "Alemania",
        "Austria",
        "Suecia",
        "Finlandia",
        "Irlanda",
        "Bélgica",
        "Canadá",
        "Estados Unidos",
        "Australia",
        "Nueva Zelanda",
        "Singapur",
        "Japón",
        "Corea del Sur",
        "Francia",
        "Reino Unido"
      ],
      90,
      1.2
    ),
    faq: buildFaq("Países con mayor poder adquisitivo", "capacidad de compra relativa"),
    related: [
      "paises-con-mejores-sueldos",
      "paises-donde-rinde-mas-el-sueldo",
      "paises-con-menor-inflacion",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-mas-caros-para-vivir"
    ]
  },
  {
    slug: "paises-con-mayor-inflacion",
    title: "Países con mayor inflación",
    description:
      "Ranking editorial sobre países con presiones inflacionarias más altas. Ayuda a evaluar volatilidad de precios.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-03",
    methodology:
      "Índice referencial basado en variaciones de precios reportadas públicamente.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Venezuela",
        "Argentina",
        "Turquía",
        "Nigeria",
        "Egipto",
        "Ghana",
        "Etiopía",
        "Sudáfrica",
        "Ucrania",
        "Bielorrusia",
        "Colombia",
        "Brasil",
        "México",
        "Perú",
        "Chile",
        "India",
        "Indonesia",
        "Filipinas",
        "Kenia",
        "Tanzania"
      ],
      89,
      1.5
    ),
    faq: buildFaq("Países con mayor inflación", "inflación y volatilidad de precios"),
    related: [
      "paises-con-menor-inflacion",
      "paises-con-mas-desempleo",
      "paises-con-menos-desempleo",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-menor-costo-de-vida"
    ]
  },
  {
    slug: "paises-con-menor-inflacion",
    title: "Países con menor inflación",
    description:
      "Ranking editorial sobre países con estabilidad de precios. Útil para contextos económicos más previsibles.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-02",
    methodology:
      "Índice referencial con foco en estabilidad de precios y comportamiento inflacionario anual.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Japón",
        "China",
        "Francia",
        "Alemania",
        "España",
        "Países Bajos",
        "Dinamarca",
        "Noruega",
        "Suecia",
        "Finlandia",
        "Canadá",
        "Estados Unidos",
        "Austria",
        "Bélgica",
        "Portugal",
        "Irlanda",
        "Corea del Sur",
        "Singapur",
        "Nueva Zelanda"
      ],
      88,
      1.1
    ),
    faq: buildFaq("Países con menor inflación", "estabilidad de precios"),
    related: [
      "paises-con-mayor-inflacion",
      "paises-con-mayor-poder-adquisitivo",
      "paises-con-menos-desempleo",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-mejores-sueldos"
    ]
  },
  {
    slug: "paises-con-mas-desempleo",
    title: "Países con más desempleo",
    description:
      "Ranking editorial sobre países con mayores tasas de desempleo. Aporta contexto para evaluar mercado laboral.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-01",
    methodology:
      "Índice referencial basado en reportes públicos de empleo y dinámica laboral.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Sudáfrica",
        "España",
        "Grecia",
        "Bosnia y Herzegovina",
        "Albania",
        "Túnez",
        "Argelia",
        "Nigeria",
        "Kenia",
        "Colombia",
        "Perú",
        "Honduras",
        "Guatemala",
        "Venezuela",
        "Ucrania",
        "Brasil",
        "México",
        "Ecuador",
        "Italia",
        "Francia"
      ],
      87,
      1.4
    ),
    faq: buildFaq("Países con más desempleo", "tensiones en el mercado laboral"),
    related: [
      "paises-con-menos-desempleo",
      "paises-con-mayor-inflacion",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-mas-baratos-para-vivir",
      "paises-con-mejores-sueldos"
    ]
  },
  {
    slug: "paises-con-menos-desempleo",
    title: "Países con menos desempleo",
    description:
      "Ranking editorial de países con mercados laborales más dinámicos. Ayuda a identificar contextos con mayor empleo.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-31",
    methodology:
      "Índice referencial basado en reportes públicos de empleo formal y dinamismo laboral.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "República Checa",
        "Japón",
        "Singapur",
        "Suiza",
        "Países Bajos",
        "Alemania",
        "Noruega",
        "Corea del Sur",
        "Australia",
        "Nueva Zelanda",
        "Polonia",
        "Hungría",
        "Dinamarca",
        "Austria",
        "Islandia",
        "Canadá",
        "Suecia",
        "Finlandia",
        "Irlanda",
        "Portugal"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Países con menos desempleo", "dinámica laboral y empleo"),
    related: [
      "paises-con-mas-desempleo",
      "paises-con-menor-inflacion",
      "paises-con-mayor-poder-adquisitivo",
      "paises-con-mejores-sueldos",
      "paises-donde-es-mas-facil-ahorrar"
    ]
  },
  {
    slug: "paises-donde-es-mas-facil-ahorrar",
    title: "Países donde es más fácil ahorrar",
    description:
      "Ranking editorial sobre destinos donde el ahorro se vuelve más accesible. Cruza ingresos, costos y estabilidad.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-30",
    methodology:
      "Índice referencial que combina ingresos disponibles, costo de vida y estabilidad económica.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Luxemburgo",
        "Suiza",
        "Singapur",
        "Emiratos Árabes Unidos",
        "Noruega",
        "Alemania",
        "Países Bajos",
        "Australia",
        "Canadá",
        "Dinamarca",
        "Suecia",
        "Finlandia",
        "Austria",
        "Bélgica",
        "Irlanda",
        "Nueva Zelanda",
        "Japón",
        "Corea del Sur",
        "España",
        "Portugal"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Países donde es más fácil ahorrar", "capacidad de ahorro y estabilidad"),
    related: [
      "paises-donde-rinde-mas-el-sueldo",
      "paises-con-mejores-sueldos",
      "paises-con-menor-inflacion",
      "paises-con-mayor-poder-adquisitivo",
      "paises-con-menos-impuestos"
    ]
  },
  {
    slug: "paises-mas-convenientes-para-freelancers",
    title: "Países más convenientes para freelancers",
    description:
      "Ranking editorial de países atractivos para trabajo independiente. Considera costos, infraestructura digital y estilo de vida.",
    category: "dinero",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-29",
    methodology:
      "Índice referencial que combina costo de vida, conectividad, visados y ecosistema freelance.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Portugal",
        "España",
        "México",
        "Colombia",
        "Argentina",
        "Chile",
        "Estonia",
        "Rumanía",
        "Polonia",
        "Lituania",
        "Letonia",
        "Turquía",
        "Tailandia",
        "Vietnam",
        "Indonesia",
        "Malasia",
        "Costa Rica",
        "Panamá",
        "Emiratos Árabes Unidos",
        "Singapur"
      ],
      87,
      1.3
    ),
    faq: buildFaq("Países más convenientes para freelancers", "condiciones para trabajo independiente"),
    related: [
      "paises-mas-faciles-para-emigrar",
      "paises-con-menor-costo-de-vida",
      "paises-donde-es-mas-facil-ahorrar",
      "paises-con-menos-impuestos",
      "paises-con-mejor-calidad-de-vida"
    ]
  },
  {
    slug: "paises-con-mejor-sistema-de-salud",
    title: "Países con mejor sistema de salud",
    description:
      "Ranking editorial sobre desempeño sanitario general. Resume acceso, calidad percibida y capacidad de respuesta.",
    category: "vida",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-02-01",
    methodology:
      "Índice referencial basado en acceso sanitario, cobertura y resultados de bienestar.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Suiza",
        "Noruega",
        "Suecia",
        "Finlandia",
        "Dinamarca",
        "Países Bajos",
        "Alemania",
        "Austria",
        "Francia",
        "Bélgica",
        "Canadá",
        "Japón",
        "Corea del Sur",
        "Australia",
        "Nueva Zelanda",
        "Irlanda",
        "Luxemburgo",
        "España",
        "Portugal",
        "Italia"
      ],
      89,
      1.2
    ),
    faq: buildFaq("Países con mejor sistema de salud", "calidad y acceso sanitario"),
    related: [
      "paises-con-mejor-educacion",
      "paises-con-mejor-calidad-de-vida",
      "paises-con-mejor-equilibrio-vida-trabajo",
      "paises-mas-contaminados-del-mundo",
      "paises-mas-felices"
    ]
  },
  {
    slug: "paises-con-mejor-educacion",
    title: "Países con mejor educación",
    description:
      "Ranking editorial sobre desempeño educativo y ecosistemas de aprendizaje. Útil para evaluar calidad y acceso educativo.",
    category: "vida",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-31",
    methodology:
      "Índice referencial que combina cobertura educativa, desempeño académico y calidad de infraestructura.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Finlandia",
        "Suecia",
        "Dinamarca",
        "Noruega",
        "Países Bajos",
        "Alemania",
        "Suiza",
        "Austria",
        "Francia",
        "Bélgica",
        "Reino Unido",
        "Irlanda",
        "Canadá",
        "Japón",
        "Corea del Sur",
        "Singapur",
        "Australia",
        "Nueva Zelanda",
        "España",
        "Portugal"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Países con mejor educación", "calidad educativa y aprendizaje"),
    related: [
      "paises-con-mejor-sistema-de-salud",
      "paises-con-mejor-calidad-de-vida",
      "paises-con-mejores-sueldos",
      "paises-mas-faciles-para-emigrar",
      "paises-mas-felices"
    ]
  },
  {
    slug: "paises-con-mejor-equilibrio-vida-trabajo",
    title: "Países con mejor equilibrio vida-trabajo",
    description:
      "Ranking editorial sobre balance entre trabajo y vida personal. Resume horarios, bienestar y tiempo disponible.",
    category: "vida",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-30",
    methodology:
      "Índice referencial que combina jornadas laborales, beneficios y bienestar percibido.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "Dinamarca",
        "Países Bajos",
        "Suecia",
        "Noruega",
        "Finlandia",
        "Alemania",
        "Austria",
        "Suiza",
        "Francia",
        "Bélgica",
        "Irlanda",
        "Canadá",
        "Australia",
        "Nueva Zelanda",
        "España",
        "Portugal",
        "Reino Unido",
        "Japón",
        "Corea del Sur",
        "Singapur"
      ],
      88,
      1.2
    ),
    faq: buildFaq("Países con mejor equilibrio vida-trabajo", "balance entre empleo y vida personal"),
    related: [
      "paises-con-mejor-calidad-de-vida",
      "paises-mas-felices",
      "paises-con-mejor-sistema-de-salud",
      "paises-con-mejores-sueldos",
      "paises-donde-es-mas-facil-ahorrar"
    ]
  },
  {
    slug: "paises-con-mejor-clima-para-vivir",
    title: "Países con mejor clima para vivir",
    description:
      "Ranking editorial sobre países con clima percibido como favorable. Considera estabilidad térmica y confort anual.",
    category: "clima",
    year: "2026",
    regionScope: "global",
    updatedAt: "2026-01-29",
    methodology:
      "Promedios climáticos y percepción general sobre confort térmico en fuentes públicas.",
    sourceNote: baseSourceNote,
    items: buildRankedItems(
      [
        "España",
        "Portugal",
        "Italia",
        "Grecia",
        "Australia",
        "Nueva Zelanda",
        "Chile",
        "Uruguay",
        "México",
        "Costa Rica",
        "Panamá",
        "Colombia",
        "Perú",
        "Ecuador",
        "Sudáfrica",
        "Marruecos",
        "Turquía",
        "Estados Unidos",
        "Francia",
        "Japón"
      ],
      87,
      1.2
    ),
    faq: buildFaq("Países con mejor clima para vivir", "confort climático y estabilidad"),
    related: [
      "paises-mas-calidos-del-mundo",
      "paises-mas-frios-del-mundo",
      "ciudades-con-mejor-clima",
      "paises-con-mejor-calidad-de-vida",
      "paises-mas-visitados-del-mundo"
    ]
  }
];

if (process.env.NODE_ENV === "development") {
  validateRankings(rankings);
}

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
