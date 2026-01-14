export type CompareMode = "pais" | "ciudad";

export type CuratedCompare = {
  mode: CompareMode;
  a: string;
  b: string;
  title: string;
  reason: string;
  topics: string[];
  regionHint?: string;
};

export const curatedCompares: CuratedCompare[] = [
  {
    mode: "pais",
    a: "chile",
    b: "argentina",
    title: "Chile vs Argentina",
    reason: "Duelo vecino con contrastes claros en costo de vida y sueldos.",
    topics: ["costo-de-vida", "sueldos", "calidad-de-vida"],
    regionHint: "sudamerica"
  },
  {
    mode: "pais",
    a: "chile",
    b: "peru",
    title: "Chile vs Perú",
    reason: "Opciones clásicas para mudanzas regionales en crecimiento.",
    topics: ["costo-de-vida", "seguridad"],
    regionHint: "sudamerica"
  },
  {
    mode: "pais",
    a: "chile",
    b: "mexico",
    title: "Chile vs México",
    reason: "Comparación clave para evaluar mercado y calidad de vida.",
    topics: ["costo-de-vida", "sueldos"],
    regionHint: "latam"
  },
  {
    mode: "pais",
    a: "chile",
    b: "espana",
    title: "Chile vs España",
    reason: "Puente migratorio con foco en calidad de vida europea.",
    topics: ["calidad-de-vida", "sueldos", "impuestos"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "chile",
    b: "portugal",
    title: "Chile vs Portugal",
    reason: "Dos opciones atractivas por clima y ritmo de vida.",
    topics: ["costo-de-vida", "clima", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "mexico",
    b: "colombia",
    title: "México vs Colombia",
    reason: "Clásico latino para comparar costos y seguridad urbana.",
    topics: ["costo-de-vida", "seguridad", "sueldos"],
    regionHint: "latam"
  },
  {
    mode: "pais",
    a: "mexico",
    b: "espana",
    title: "México vs España",
    reason: "Comparativa directa entre América y Europa hispana.",
    topics: ["costo-de-vida", "calidad-de-vida", "impuestos"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "argentina",
    b: "espana",
    title: "Argentina vs España",
    reason: "Decisión recurrente para profesionales y familias migrantes.",
    topics: ["costo-de-vida", "sueldos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "colombia",
    b: "espana",
    title: "Colombia vs España",
    reason: "Comparación relevante para evaluar seguridad y salarios.",
    topics: ["seguridad", "sueldos", "costo-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "peru",
    b: "espana",
    title: "Perú vs España",
    reason: "Dos realidades con contrastes fuertes en costo de vida.",
    topics: ["costo-de-vida", "sueldos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "brasil",
    b: "portugal",
    title: "Brasil vs Portugal",
    reason: "Conexión histórica para evaluar impuestos y costo de vida.",
    topics: ["costo-de-vida", "clima", "impuestos"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "brasil",
    b: "espana",
    title: "Brasil vs España",
    reason: "Comparación útil para entender sueldos y calidad europea.",
    topics: ["costo-de-vida", "calidad-de-vida", "sueldos"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "estados-unidos",
    b: "canada",
    title: "Estados Unidos vs Canadá",
    reason: "Norteamérica en contraste por sueldos e impuestos.",
    topics: ["sueldos", "impuestos", "calidad-de-vida"],
    regionHint: "norteamerica"
  },
  {
    mode: "pais",
    a: "estados-unidos",
    b: "mexico",
    title: "Estados Unidos vs México",
    reason: "Comparativa clave de salarios y costo de vida.",
    topics: ["sueldos", "costo-de-vida", "impuestos"],
    regionHint: "norteamerica"
  },
  {
    mode: "pais",
    a: "reino-unido",
    b: "irlanda",
    title: "Reino Unido vs Irlanda",
    reason: "Dos hubs europeos para trabajo y calidad de vida.",
    topics: ["impuestos", "calidad-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "francia",
    b: "alemania",
    title: "Francia vs Alemania",
    reason: "Comparación clásica de sueldos e infraestructura europea.",
    topics: ["sueldos", "impuestos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "francia",
    b: "espana",
    title: "Francia vs España",
    reason: "Dos potencias turísticas con ritmos de vida distintos.",
    topics: ["costo-de-vida", "clima", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "italia",
    b: "espana",
    title: "Italia vs España",
    reason: "Mediterráneo en foco por clima y costo de vida.",
    topics: ["costo-de-vida", "clima", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "italia",
    b: "portugal",
    title: "Italia vs Portugal",
    reason: "Comparativa atractiva por cultura, clima y gastos.",
    topics: ["costo-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "alemania",
    b: "paises-bajos",
    title: "Alemania vs Países Bajos",
    reason: "Dos economías fuertes para comparar impuestos y sueldos.",
    topics: ["impuestos", "sueldos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "suecia",
    b: "noruega",
    title: "Suecia vs Noruega",
    reason: "Nórdicos con alto bienestar y climas exigentes.",
    topics: ["calidad-de-vida", "impuestos", "clima"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "suiza",
    b: "austria",
    title: "Suiza vs Austria",
    reason: "Comparación alpina por sueldos y calidad de vida.",
    topics: ["sueldos", "calidad-de-vida", "impuestos"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "japon",
    b: "corea-del-sur",
    title: "Japón vs Corea del Sur",
    reason: "Dos potencias tecnológicas con estilos de vida distintos.",
    topics: ["sueldos", "calidad-de-vida", "impuestos"],
    regionHint: "asia"
  },
  {
    mode: "pais",
    a: "japon",
    b: "singapur",
    title: "Japón vs Singapur",
    reason: "Comparativa clave entre seguridad y salarios asiáticos.",
    topics: ["seguridad", "sueldos", "impuestos"],
    regionHint: "asia"
  },
  {
    mode: "pais",
    a: "australia",
    b: "nueva-zelanda",
    title: "Australia vs Nueva Zelanda",
    reason: "Clásico oceánico por calidad de vida y clima.",
    topics: ["calidad-de-vida", "clima", "seguridad"],
    regionHint: "oceania"
  },
  {
    mode: "pais",
    a: "emiratos-arabes-unidos",
    b: "singapur",
    title: "Emiratos Árabes Unidos vs Singapur",
    reason: "Dos hubs globales para contrastar impuestos y salarios.",
    topics: ["impuestos", "sueldos", "seguridad"],
    regionHint: "asia"
  },
  {
    mode: "pais",
    a: "tailandia",
    b: "vietnam",
    title: "Tailandia vs Vietnam",
    reason: "Sudeste asiático para comparar clima y costos diarios.",
    topics: ["costo-de-vida", "clima"],
    regionHint: "asia"
  },
  {
    mode: "pais",
    a: "indonesia",
    b: "malasia",
    title: "Indonesia vs Malasia",
    reason: "Dos economías emergentes con diferencias en seguridad.",
    topics: ["costo-de-vida", "clima", "seguridad"],
    regionHint: "asia"
  },
  {
    mode: "pais",
    a: "turquia",
    b: "grecia",
    title: "Turquía vs Grecia",
    reason: "Vecinos mediterráneos con contrastes en costo y clima.",
    topics: ["costo-de-vida", "clima", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "pais",
    a: "polonia",
    b: "republica-checa",
    title: "Polonia vs República Checa",
    reason: "Europa Central para comparar sueldos y costo de vida.",
    topics: ["costo-de-vida", "sueldos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "madrid",
    b: "barcelona",
    title: "Madrid vs Barcelona",
    reason: "Doble clásico español para comparar ritmo urbano.",
    topics: ["costo-de-vida", "calidad-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "madrid",
    b: "lisboa",
    title: "Madrid vs Lisboa",
    reason: "Capitales ibéricas con estilos de vida distintos.",
    topics: ["costo-de-vida", "calidad-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "madrid",
    b: "roma",
    title: "Madrid vs Roma",
    reason: "Comparativa mediterránea por clima y costos.",
    topics: ["costo-de-vida", "calidad-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "paris",
    b: "londres",
    title: "París vs Londres",
    reason: "Dos mega hubs para evaluar sueldos y precios.",
    topics: ["sueldos", "impuestos", "costo-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "paris",
    b: "berlin",
    title: "París vs Berlín",
    reason: "Capitales europeas con perfiles laborales distintos.",
    topics: ["sueldos", "calidad-de-vida", "costo-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "amsterdam",
    b: "berlin",
    title: "Ámsterdam vs Berlín",
    reason: "Capitales europeas con estilos urbanos muy distintos.",
    topics: ["impuestos", "calidad-de-vida", "costo-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "viena",
    b: "praga",
    title: "Viena vs Praga",
    reason: "Europa Central con contrastes de seguridad y costos.",
    topics: ["costo-de-vida", "calidad-de-vida", "seguridad"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "budapest",
    b: "praga",
    title: "Budapest vs Praga",
    reason: "Doble destino cultural con precios distintos.",
    topics: ["costo-de-vida", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "berlin",
    b: "munich",
    title: "Berlín vs Múnich",
    reason: "Alemania urbana para comparar sueldos y costos.",
    topics: ["sueldos", "costo-de-vida", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "roma",
    b: "paris",
    title: "Roma vs París",
    reason: "Clásico europeo para comparar costos y calidad urbana.",
    topics: ["costo-de-vida", "sueldos", "calidad-de-vida"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "lisboa",
    b: "oporto",
    title: "Lisboa vs Oporto",
    reason: "Portugal urbano para comparar clima y costos.",
    topics: ["costo-de-vida", "calidad-de-vida", "clima"],
    regionHint: "europa"
  },
  {
    mode: "ciudad",
    a: "nueva-york",
    b: "los-angeles",
    title: "Nueva York vs Los Ángeles",
    reason: "Dos gigantes de EE. UU. con estilos opuestos.",
    topics: ["sueldos", "costo-de-vida", "clima"],
    regionHint: "norteamerica"
  },
  {
    mode: "ciudad",
    a: "miami",
    b: "nueva-york",
    title: "Miami vs Nueva York",
    reason: "Dos estilos de vida opuestos en EE. UU.",
    topics: ["costo-de-vida", "clima", "calidad-de-vida"],
    regionHint: "norteamerica"
  },
  {
    mode: "ciudad",
    a: "toronto",
    b: "vancouver",
    title: "Toronto vs Vancouver",
    reason: "Canadá urbano para comparar calidad de vida.",
    topics: ["calidad-de-vida", "costo-de-vida", "clima"],
    regionHint: "norteamerica"
  },
  {
    mode: "ciudad",
    a: "tokio",
    b: "singapur",
    title: "Tokio vs Singapur",
    reason: "Comparativa asiática entre hubs tecnológicos.",
    topics: ["costo-de-vida", "calidad-de-vida", "sueldos"],
    regionHint: "asia"
  },
  {
    mode: "ciudad",
    a: "seul",
    b: "tokio",
    title: "Seúl vs Tokio",
    reason: "Dos capitales tecnológicas para comparar seguridad.",
    topics: ["sueldos", "seguridad", "calidad-de-vida"],
    regionHint: "asia"
  },
  {
    mode: "ciudad",
    a: "singapur",
    b: "hong-kong",
    title: "Singapur vs Hong Kong",
    reason: "Hubs financieros con alta exigencia urbana.",
    topics: ["impuestos", "sueldos", "seguridad"],
    regionHint: "asia"
  },
  {
    mode: "ciudad",
    a: "sidney",
    b: "melbourne",
    title: "Sídney vs Melbourne",
    reason: "Australia urbana para comparar clima y calidad.",
    topics: ["calidad-de-vida", "clima", "costo-de-vida"],
    regionHint: "oceania"
  },
  {
    mode: "ciudad",
    a: "dubai",
    b: "singapur",
    title: "Dubái vs Singapur",
    reason: "Doble hub global para comparar impuestos y sueldos.",
    topics: ["impuestos", "sueldos", "costo-de-vida"],
    regionHint: "asia"
  },
  {
    mode: "ciudad",
    a: "bangkok",
    b: "ho-chi-minh",
    title: "Bangkok vs Ho Chi Minh",
    reason: "Sudeste asiático para evaluar clima y costo diario.",
    topics: ["costo-de-vida", "clima"],
    regionHint: "asia"
  }
];
