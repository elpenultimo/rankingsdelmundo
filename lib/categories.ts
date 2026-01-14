export type CategoryKey = "paises" | "ciudades" | "dinero" | "clima" | "vida";

type CategoryFaqItem = {
  q: string;
  a: string;
};

type CategoryConfig = {
  label: string;
  description: string;
  icon?: string;
  colorToken?: string;
  seoTitle: string;
  seoDescription: string;
  faq: CategoryFaqItem[];
};

export const categories: Record<CategoryKey, CategoryConfig> = {
  paises: {
    label: "Países",
    description: "Rankings comparativos entre países con foco en economía, bienestar y competitividad.",
    icon: "🌍",
    colorToken: "blue",
    seoTitle: "Rankings de países | Comparativas globales en español",
    seoDescription:
      "Explora rankings de países basados en índices referenciales y compilación editorial. Descubre tendencias globales con metodología clara.",
    faq: [
      {
        q: "¿Qué tipo de rankings de países publican?",
        a: "Reunimos rankings comparativos sobre innovación, salud, educación y competitividad con base en índices referenciales."
      },
      {
        q: "¿Estos rankings son oficiales?",
        a: "No. Son compilaciones editoriales que resumen indicadores públicos para facilitar la comparación."
      },
      {
        q: "¿Cómo se actualizan las posiciones?",
        a: "Se revisan periódicamente cuando hay nuevas publicaciones y se ajustan con criterios consistentes."
      },
      {
        q: "¿Puedo usar estos datos en informes?",
        a: "Sí, como referencia. Siempre recomendamos citar las fuentes originales de cada indicador."
      },
      {
        q: "¿Cómo interpretar un índice referencial?",
        a: "Es una escala comparativa que ayuda a identificar tendencias, no un dato absoluto ni oficial."
      }
    ]
  },
  ciudades: {
    label: "Ciudades",
    description: "Rankings urbanos para entender seguridad, movilidad, costo de vida y calidad de vida.",
    icon: "🏙️",
    colorToken: "emerald",
    seoTitle: "Rankings de ciudades | Seguridad, costo y calidad de vida",
    seoDescription:
      "Consulta rankings de ciudades con enfoque editorial y métricas referenciales. Ideal para comparar seguridad, movilidad y estilo de vida.",
    faq: [
      {
        q: "¿Qué criterios usan para comparar ciudades?",
        a: "Combinamos indicadores públicos sobre seguridad, movilidad, costos y bienestar en un índice referencial."
      },
      {
        q: "¿Las posiciones son definitivas?",
        a: "No. Son comparativas editoriales que ayudan a ver tendencias y no sustituyen datos oficiales."
      },
      {
        q: "¿Incluyen ciudades de todo el mundo?",
        a: "Sí, priorizamos ciudades con suficiente información pública para comparaciones globales."
      },
      {
        q: "¿Cómo puedo filtrar por región?",
        a: "Usa los filtros rápidos por región o año para ajustar el listado a tu contexto."
      },
      {
        q: "¿Estos rankings sirven para decisiones de viaje o mudanza?",
        a: "Son una referencia inicial. Te recomendamos complementarlos con fuentes oficiales y locales."
      }
    ]
  },
  dinero: {
    label: "Dinero",
    description: "Rankings sobre salarios, estabilidad económica, costos y poder adquisitivo comparado.",
    icon: "💰",
    colorToken: "amber",
    seoTitle: "Rankings de dinero | Economía, salarios y poder adquisitivo",
    seoDescription:
      "Explora rankings de economía y dinero con indicadores referenciales sobre salarios, estabilidad y costos para comparar países y ciudades.",
    faq: [
      {
        q: "¿Qué significa un ranking de dinero?",
        a: "Es una comparación editorial basada en índices de salarios, estabilidad y costo de vida."
      },
      {
        q: "¿Los valores son oficiales?",
        a: "No. Son referencias construidas a partir de fuentes públicas y ajuste editorial."
      },
      {
        q: "¿Cómo interpretar el poder adquisitivo?",
        a: "Es una medida comparativa que ayuda a ver tendencias de ingresos frente a costos."
      },
      {
        q: "¿Con qué frecuencia se actualiza?",
        a: "Revisamos las métricas cuando hay nuevas publicaciones y cambios relevantes."
      },
      {
        q: "¿Puedo comparar regiones específicas?",
        a: "Sí, puedes filtrar por región y año para ajustar la lectura a tu contexto."
      }
    ]
  },
  clima: {
    label: "Clima",
    description: "Rankings sobre clima agradable, sostenibilidad, calidad del aire y entorno natural.",
    icon: "🌤️",
    colorToken: "sky",
    seoTitle: "Rankings de clima | Confort, aire limpio y sostenibilidad",
    seoDescription:
      "Accede a rankings de clima con indicadores referenciales sobre aire limpio, confort térmico y sostenibilidad ambiental.",
    faq: [
      {
        q: "¿Qué incluye un ranking de clima?",
        a: "Incluye indicadores referenciales sobre confort térmico, calidad del aire y sostenibilidad."
      },
      {
        q: "¿Estos datos son meteorológicos oficiales?",
        a: "No. Son compilaciones editoriales basadas en fuentes públicas y comparación relativa."
      },
      {
        q: "¿Puedo comparar destinos específicos?",
        a: "Sí, el ranking sirve como guía para comparar tendencias entre regiones y ciudades."
      },
      {
        q: "¿Cómo se actualizan estas métricas?",
        a: "Se revisan cuando hay nuevas publicaciones y se recalculan con el mismo criterio."
      },
      {
        q: "¿Qué significa “clima agradable” en este contexto?",
        a: "Es una síntesis referencial de estabilidad térmica, humedad y confort percibido."
      }
    ]
  },
  vida: {
    label: "Vida",
    description: "Rankings de bienestar, salud, entorno social y calidad de vida comparada.",
    icon: "✨",
    colorToken: "rose",
    seoTitle: "Rankings de calidad de vida | Bienestar y salud",
    seoDescription:
      "Descubre rankings de vida y bienestar con índices referenciales sobre salud, servicios y calidad de vida en ciudades y países.",
    faq: [
      {
        q: "¿Qué mide un ranking de calidad de vida?",
        a: "Integra indicadores referenciales de salud, servicios, entorno social y bienestar general."
      },
      {
        q: "¿Se pueden comparar ciudades y países?",
        a: "Sí, usamos métricas comparables para observar tendencias en distintos niveles."
      },
      {
        q: "¿Cómo se seleccionan las fuentes?",
        a: "Se priorizan fuentes públicas confiables con revisión editorial para mantener consistencia."
      },
      {
        q: "¿Los resultados son definitivos?",
        a: "No. Son comparaciones editoriales que sirven como referencia y guía exploratoria."
      },
      {
        q: "¿Puedo filtrar por año?",
        a: "Sí, los filtros por año ayudan a analizar cambios recientes en los indicadores."
      }
    ]
  }
};

export const categoryIntro: Record<CategoryKey, string> = {
  paises:
    "Explora rankings editoriales de países basados en índices referenciales sobre competitividad, salud y educación. Estos listados ayudan a comparar tendencias globales sin asumir datos oficiales.",
  ciudades:
    "Descubre rankings de ciudades con foco en seguridad, movilidad y costo de vida. Son compilaciones editoriales que permiten comparar entornos urbanos con métricas consistentes.",
  dinero:
    "Analiza rankings sobre economía, salarios y estabilidad con métricas referenciales. La idea es ofrecer una lectura clara y comparable sobre poder adquisitivo y costos.",
  clima:
    "Consulta rankings de clima y sostenibilidad para identificar destinos con aire limpio y confort térmico. Usamos índices referenciales y revisión editorial.",
  vida:
    "Revisa rankings de bienestar y calidad de vida que combinan salud, servicios y entorno social. Son comparativas editoriales pensadas para orientar decisiones."
};

type CategoryCluster = {
  title: string;
  description: string;
  rankings: string[];
};

export const categoryClusters: Record<CategoryKey, CategoryCluster[]> = {
  paises: [
    {
      title: "Competitividad e innovación",
      description: "Rankings que comparan productividad, innovación y desempeño económico.",
      rankings: [
        "paises-mas-innovadores",
        "paises-mas-competitivos",
        "economias-mas-estables",
        "salarios-promedio-globales"
      ]
    },
    {
      title: "Bienestar y servicios",
      description: "Indicadores referenciales sobre salud y desarrollo social.",
      rankings: [
        "paises-con-mejor-salud",
        "paises-mayor-inversion-educacion",
        "calidad-de-vida-global",
        "ciudades-mas-seguras"
      ]
    },
    {
      title: "Costo y estabilidad",
      description: "Comparativas de costos y resiliencia económica por país.",
      rankings: [
        "economias-mas-estables",
        "salarios-promedio-globales",
        "coste-de-vida-ciudades",
        "paises-mas-competitivos"
      ]
    }
  ],
  ciudades: [
    {
      title: "Seguridad y entorno urbano",
      description: "Rankings que destacan ciudades seguras y con buen entorno social.",
      rankings: [
        "ciudades-mas-seguras",
        "calidad-de-vida-global",
        "ciudades-mas-verdes",
        "destinos-con-buena-calidad-aire"
      ]
    },
    {
      title: "Movilidad y accesibilidad",
      description: "Comparativas sobre transporte, conectividad y vida diaria.",
      rankings: [
        "ciudades-con-mejor-movilidad",
        "coste-de-vida-ciudades",
        "ciudades-mas-seguras",
        "calidad-de-vida-global"
      ]
    },
    {
      title: "Costo y bienestar",
      description: "Rankings que combinan costo de vida y bienestar urbano.",
      rankings: [
        "coste-de-vida-ciudades",
        "calidad-de-vida-global",
        "ciudades-mas-verdes",
        "ciudades-con-mejor-movilidad"
      ]
    }
  ],
  dinero: [
    {
      title: "Ingresos y poder adquisitivo",
      description: "Indicadores referenciales de salarios y capacidad de compra.",
      rankings: [
        "salarios-promedio-globales",
        "coste-de-vida-ciudades",
        "economias-mas-estables",
        "paises-mas-competitivos"
      ]
    },
    {
      title: "Estabilidad económica",
      description: "Comparativas sobre resiliencia y desempeño macroeconómico.",
      rankings: [
        "economias-mas-estables",
        "paises-mas-competitivos",
        "paises-mas-innovadores",
        "salarios-promedio-globales"
      ]
    },
    {
      title: "Costo y salario",
      description: "Ranking de costos urbanos y remuneraciones de referencia.",
      rankings: [
        "coste-de-vida-ciudades",
        "salarios-promedio-globales",
        "paises-mayor-inversion-educacion",
        "paises-mas-competitivos"
      ]
    }
  ],
  clima: [
    {
      title: "Confort y clima agradable",
      description: "Rankings de temperaturas estables y confort percibido.",
      rankings: [
        "climas-mas-agradables",
        "destinos-con-buena-calidad-aire",
        "ciudades-mas-verdes",
        "calidad-de-vida-global"
      ]
    },
    {
      title: "Aire limpio y sostenibilidad",
      description: "Comparativas sobre contaminación y políticas ambientales.",
      rankings: [
        "destinos-con-buena-calidad-aire",
        "ciudades-mas-verdes",
        "climas-mas-agradables",
        "ciudades-mas-seguras"
      ]
    },
    {
      title: "Entornos urbanos verdes",
      description: "Rankings de sostenibilidad urbana y espacios verdes.",
      rankings: [
        "ciudades-mas-verdes",
        "ciudades-con-mejor-movilidad",
        "climas-mas-agradables",
        "destinos-con-buena-calidad-aire"
      ]
    }
  ],
  vida: [
    {
      title: "Salud y bienestar",
      description: "Rankings que priorizan salud, servicios y calidad de vida.",
      rankings: [
        "paises-con-mejor-salud",
        "calidad-de-vida-global",
        "paises-mayor-inversion-educacion",
        "ciudades-mas-seguras"
      ]
    },
    {
      title: "Entorno social",
      description: "Comparativas sobre seguridad, movilidad y entorno cotidiano.",
      rankings: [
        "ciudades-mas-seguras",
        "ciudades-con-mejor-movilidad",
        "calidad-de-vida-global",
        "climas-mas-agradables"
      ]
    },
    {
      title: "Servicios y desarrollo",
      description: "Indicadores referenciales sobre infraestructura y bienestar.",
      rankings: [
        "paises-mayor-inversion-educacion",
        "paises-mas-competitivos",
        "paises-con-mejor-salud",
        "economias-mas-estables"
      ]
    }
  ]
};

export const categoryKeys = Object.keys(categories) as CategoryKey[];

export const getCategoryLabel = (cat: CategoryKey) => categories[cat]?.label ?? cat;

export const getCategoryIntro = (cat: CategoryKey) =>
  categoryIntro[cat] ?? categories[cat]?.description ?? "";

export const getCategoryFaq = (cat: CategoryKey) => categories[cat]?.faq ?? [];
