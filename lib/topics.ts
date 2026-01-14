export type TopicKey =
  | "seguridad"
  | "costo-de-vida"
  | "calidad-de-vida"
  | "impuestos"
  | "sueldos"
  | "clima"
  | "contaminacion"
  | "transporte"
  | "salud"
  | "educacion";

export type TopicConfig = {
  key: TopicKey;
  label: string;
  seoTitle: string;
  seoDescription: string;
  intro: string;
  icon?: string;
  relatedTopics: TopicKey[];
  metricKeys: string[];
  rankingSlugs: string[];
  faq: { q: string; a: string }[];
};

export const topicKeys: TopicKey[] = [
  "seguridad",
  "costo-de-vida",
  "calidad-de-vida",
  "impuestos",
  "sueldos",
  "clima",
  "contaminacion",
  "transporte",
  "salud",
  "educacion"
];

export const topics: Record<TopicKey, TopicConfig> = {
  seguridad: {
    key: "seguridad",
    label: "Seguridad",
    seoTitle: "Rankings de seguridad en países y ciudades | Rankings del Mundo",
    seoDescription:
      "Explora rankings de seguridad con índices referenciales y comparativas editoriales entre países y ciudades.",
    intro:
      "La seguridad combina percepción ciudadana, respuesta institucional y condiciones de entorno. En este hub reunimos rankings y comparaciones editoriales para entender qué destinos se perciben como más seguros y por qué.",
    icon: "🛡️",
    relatedTopics: ["calidad-de-vida", "salud", "transporte", "costo-de-vida"],
    metricKeys: ["seguridad"],
    rankingSlugs: ["ciudades-mas-seguras", "calidad-de-vida-global"],
    faq: [
      {
        q: "¿Qué considera este tema cuando hablamos de seguridad?",
        a: "Integra percepción ciudadana, reportes públicos y consistencia institucional para generar un índice referencial."
      },
      {
        q: "¿La seguridad es igual en todas las zonas de un país?",
        a: "No, existen variaciones internas; por eso los rankings son orientativos y sirven para comparar tendencias generales."
      },
      {
        q: "¿Cómo leer un índice de seguridad?",
        a: "Valores más altos suelen indicar mejor desempeño relativo, pero siempre deben interpretarse con contexto local."
      },
      {
        q: "¿Qué otras variables influyen en la seguridad?",
        a: "Movilidad, inversión social, densidad urbana y acceso a servicios básicos pueden alterar los resultados."
      },
      {
        q: "¿Se actualizan estos rankings?",
        a: "Sí, se revisan con nuevas fuentes y se actualizan de forma editorial periódica."
      }
    ]
  },
  "costo-de-vida": {
    key: "costo-de-vida",
    label: "Costo de vida",
    seoTitle: "Rankings de costo de vida en países y ciudades | Rankings del Mundo",
    seoDescription:
      "Consulta rankings de costo de vida con foco en vivienda, transporte y servicios clave para países y ciudades.",
    intro:
      "El costo de vida reúne gastos cotidianos como vivienda, alimentación, transporte y servicios. Este hub ofrece rankings y comparaciones para entender qué tan accesible es un destino y cómo cambia entre países y ciudades.",
    icon: "💸",
    relatedTopics: ["sueldos", "impuestos", "calidad-de-vida", "transporte"],
    metricKeys: ["costo-de-vida", "salarios"],
    rankingSlugs: ["coste-de-vida-ciudades", "salarios-promedio-globales", "economias-mas-estables"],
    faq: [
      {
        q: "¿Qué incluye el índice de costo de vida?",
        a: "Incluye vivienda, transporte, servicios y una canasta de bienes esenciales para comparar destinos."
      },
      {
        q: "¿Un costo de vida menor siempre es mejor?",
        a: "Depende de los ingresos locales; es útil comparar junto con salarios y calidad de vida."
      },
      {
        q: "¿Por qué varía tanto entre ciudades?",
        a: "La oferta de vivienda, el mercado laboral y los impuestos locales influyen directamente."
      },
      {
        q: "¿Cómo se usan las comparaciones por país?",
        a: "Sirven para analizar tendencias generales, no para estimar gastos exactos."
      },
      {
        q: "¿Puedo usar estos datos para planificar una mudanza?",
        a: "Sí, como referencia inicial que luego debe contrastarse con fuentes locales."
      }
    ]
  },
  "calidad-de-vida": {
    key: "calidad-de-vida",
    label: "Calidad de vida",
    seoTitle: "Rankings de calidad de vida global | Rankings del Mundo",
    seoDescription:
      "Descubre rankings de calidad de vida basados en bienestar, servicios, entorno y cohesión social.",
    intro:
      "La calidad de vida resume bienestar, acceso a servicios, entorno urbano y equilibrio cotidiano. Aquí agrupamos rankings y comparaciones para entender cómo se posicionan ciudades y países en términos de vida diaria.",
    icon: "✨",
    relatedTopics: ["seguridad", "salud", "costo-de-vida", "clima"],
    metricKeys: ["calidad-de-vida", "salud"],
    rankingSlugs: ["calidad-de-vida-global", "paises-con-mejor-salud"],
    faq: [
      {
        q: "¿Qué mide la calidad de vida en estos rankings?",
        a: "Servicios, entorno urbano, seguridad percibida y acceso a salud se combinan en un índice referencial."
      },
      {
        q: "¿Se comparan ciudades y países juntos?",
        a: "Se muestran rankings separados; el hub integra ambos para análisis transversal."
      },
      {
        q: "¿Cómo interpretar un valor alto?",
        a: "Indica una posición favorable en el índice, pero no reemplaza experiencias locales."
      },
      {
        q: "¿La calidad de vida incluye clima?",
        a: "El clima puede influir, pero suele representarse en rankings específicos."
      },
      {
        q: "¿Cada cuánto se actualizan estos rankings?",
        a: "Se revisan cuando hay nuevas fuentes y se actualizan de forma editorial."
      }
    ]
  },
  impuestos: {
    key: "impuestos",
    label: "Impuestos",
    seoTitle: "Rankings de impuestos y carga fiscal | Rankings del Mundo",
    seoDescription:
      "Explora rankings sobre carga fiscal, competitividad y estabilidad económica con índices referenciales.",
    intro:
      "Los impuestos afectan el costo de operar, vivir y hacer negocios. En este hub encontrarás rankings y comparaciones editoriales que ayudan a contextualizar la carga fiscal junto con estabilidad y competitividad.",
    icon: "🏛️",
    relatedTopics: ["sueldos", "costo-de-vida", "educacion", "calidad-de-vida"],
    metricKeys: ["estabilidad-economica", "competitividad"],
    rankingSlugs: ["economias-mas-estables", "paises-mas-competitivos"],
    faq: [
      {
        q: "¿Qué significa carga fiscal en este contexto?",
        a: "Es una aproximación referencial a la presión tributaria y su impacto en la economía."
      },
      {
        q: "¿Incluyen impuestos corporativos y personales?",
        a: "Sí, se consideran de forma general en la construcción del índice editorial."
      },
      {
        q: "¿Por qué se asocia con competitividad?",
        a: "Una estructura fiscal influye en inversión, empleo y clima de negocios."
      },
      {
        q: "¿Estos rankings reemplazan datos oficiales?",
        a: "No, son compilaciones editoriales y deben contrastarse con fuentes fiscales oficiales."
      },
      {
        q: "¿Cómo usar esta información para planificar?",
        a: "Úsala como referencia para comparar y luego consulta normativa local."
      }
    ]
  },
  sueldos: {
    key: "sueldos",
    label: "Sueldos",
    seoTitle: "Rankings de sueldos y salarios promedio | Rankings del Mundo",
    seoDescription:
      "Revisa rankings de sueldos promedio y poder adquisitivo con comparativas editoriales.",
    intro:
      "Los sueldos permiten comparar poder adquisitivo y mercado laboral. Este hub reúne rankings y comparaciones sobre ingresos promedio, ajustados a un índice referencial para facilitar el análisis.",
    icon: "💼",
    relatedTopics: ["costo-de-vida", "impuestos", "calidad-de-vida", "educacion"],
    metricKeys: ["salarios", "costo-de-vida"],
    rankingSlugs: ["salarios-promedio-globales", "economias-mas-estables"],
    faq: [
      {
        q: "¿Qué significa sueldo promedio en estos rankings?",
        a: "Es un índice referencial estimado que compara ingresos medios entre regiones."
      },
      {
        q: "¿El índice está ajustado por costo de vida?",
        a: "Se incluye un ajuste editorial básico, pero recomendamos revisar ambos indicadores."
      },
      {
        q: "¿Qué sectores se consideran?",
        a: "Se usan promedios amplios para comparar el mercado laboral general."
      },
      {
        q: "¿Cómo comparar sueldos entre países?",
        a: "Observa la tendencia relativa y contrástala con impuestos y precios locales."
      },
      {
        q: "¿Se actualizan con frecuencia?",
        a: "Se revisan trimestralmente o cuando se publican nuevas fuentes."
      }
    ]
  },
  clima: {
    key: "clima",
    label: "Clima",
    seoTitle: "Rankings de clima y confort ambiental | Rankings del Mundo",
    seoDescription:
      "Explora rankings de clima agradable, sostenibilidad y confort ambiental en destinos globales.",
    intro:
      "El clima influye en bienestar, turismo y calidad de vida. Aquí agrupamos rankings sobre confort térmico, sostenibilidad y calidad ambiental para entender qué destinos destacan.",
    icon: "🌤️",
    relatedTopics: ["contaminacion", "calidad-de-vida", "salud", "transporte"],
    metricKeys: ["clima", "calidad-aire", "sostenibilidad"],
    rankingSlugs: ["climas-mas-agradables", "ciudades-mas-verdes", "destinos-con-buena-calidad-aire"],
    faq: [
      {
        q: "¿Qué es un clima agradable según el ranking?",
        a: "Se basa en estabilidad térmica, humedad y extremos climáticos con un índice referencial."
      },
      {
        q: "¿Se consideran estaciones del año?",
        a: "Sí, el índice pondera variaciones estacionales para un promedio anual."
      },
      {
        q: "¿Por qué aparece sostenibilidad en este tema?",
        a: "La cobertura verde y políticas ambientales impactan el confort climático."
      },
      {
        q: "¿El clima es igual en todo el país?",
        a: "No, por eso los rankings son generales y deben contextualizarse."
      },
      {
        q: "¿Cómo interpretar la calidad del aire?",
        a: "Valores más altos indican mejor desempeño relativo en contaminación atmosférica."
      }
    ]
  },
  contaminacion: {
    key: "contaminacion",
    label: "Contaminación",
    seoTitle: "Rankings de contaminación y calidad del aire | Rankings del Mundo",
    seoDescription:
      "Consulta rankings sobre calidad del aire, sostenibilidad y exposición a contaminantes.",
    intro:
      "La contaminación impacta la salud y el entorno urbano. Este hub integra rankings editoriales sobre calidad del aire, sostenibilidad y control de emisiones para comparar destinos.",
    icon: "🌫️",
    relatedTopics: ["clima", "salud", "calidad-de-vida", "transporte"],
    metricKeys: ["calidad-aire", "sostenibilidad"],
    rankingSlugs: ["destinos-con-buena-calidad-aire", "ciudades-mas-verdes"],
    faq: [
      {
        q: "¿Qué mide la calidad del aire en este sitio?",
        a: "Se considera la concentración promedio de contaminantes clave en un índice comparativo."
      },
      {
        q: "¿Cómo se relaciona con salud?",
        a: "Mayor exposición a contaminantes suele asociarse con riesgos respiratorios."
      },
      {
        q: "¿Incluye emisiones industriales?",
        a: "Sí, se incluyen como parte de indicadores ambientales agregados."
      },
      {
        q: "¿Por qué también se muestra sostenibilidad?",
        a: "La infraestructura verde ayuda a mitigar la contaminación urbana."
      },
      {
        q: "¿Los datos son oficiales?",
        a: "No, son compilaciones editoriales basadas en fuentes públicas."
      }
    ]
  },
  transporte: {
    key: "transporte",
    label: "Transporte",
    seoTitle: "Rankings de transporte y movilidad urbana | Rankings del Mundo",
    seoDescription:
      "Explora rankings de movilidad, transporte público y conectividad urbana para ciudades destacadas.",
    intro:
      "El transporte define tiempos de traslado, costos y calidad urbana. Este hub reúne rankings y comparaciones sobre movilidad para ayudarte a entender qué ciudades son más eficientes.",
    icon: "🚇",
    relatedTopics: ["costo-de-vida", "seguridad", "contaminacion", "calidad-de-vida"],
    metricKeys: ["movilidad"],
    rankingSlugs: ["ciudades-con-mejor-movilidad", "ciudades-mas-seguras"],
    faq: [
      {
        q: "¿Qué mide el índice de movilidad?",
        a: "Cobertura de transporte público, tiempos promedio y conectividad multimodal."
      },
      {
        q: "¿Incluye bicicletas o transporte alternativo?",
        a: "Sí, se consideran opciones complementarias cuando existen datos disponibles."
      },
      {
        q: "¿Por qué se relaciona con costo de vida?",
        a: "El transporte impacta el gasto mensual y el tiempo de desplazamiento."
      },
      {
        q: "¿El ranking es solo para grandes ciudades?",
        a: "Principalmente, porque concentran la mayor disponibilidad de datos comparables."
      },
      {
        q: "¿Se actualizan estos datos?",
        a: "Sí, con revisiones periódicas según nuevas fuentes públicas."
      }
    ]
  },
  salud: {
    key: "salud",
    label: "Salud",
    seoTitle: "Rankings de salud y bienestar en países | Rankings del Mundo",
    seoDescription:
      "Consulta rankings sobre acceso sanitario, bienestar y calidad de vida con enfoque editorial.",
    intro:
      "La salud integra acceso sanitario, resultados de bienestar y prevención. Este hub reúne rankings que permiten comparar desempeño sanitario entre países y su impacto en la vida cotidiana.",
    icon: "🩺",
    relatedTopics: ["calidad-de-vida", "seguridad", "educacion", "contaminacion"],
    metricKeys: ["salud", "calidad-de-vida"],
    rankingSlugs: ["paises-con-mejor-salud", "calidad-de-vida-global"],
    faq: [
      {
        q: "¿Qué indicadores de salud se consideran?",
        a: "Acceso, calidad de servicios y resultados de salud general en un índice referencial."
      },
      {
        q: "¿Se comparan sistemas públicos y privados?",
        a: "Se usa una lectura global del acceso y la cobertura disponible."
      },
      {
        q: "¿Cómo interpretar un ranking alto?",
        a: "Sugiere un mejor desempeño relativo, pero no reemplaza datos oficiales."
      },
      {
        q: "¿Influyen factores ambientales?",
        a: "Sí, la calidad del aire y entorno urbano impactan la salud poblacional."
      },
      {
        q: "¿Qué tan frecuentes son las actualizaciones?",
        a: "Se revisan cuando hay nuevos datos y se actualizan editorialmente."
      }
    ]
  },
  educacion: {
    key: "educacion",
    label: "Educación",
    seoTitle: "Rankings de educación e inversión educativa | Rankings del Mundo",
    seoDescription:
      "Explora rankings sobre inversión educativa, talento e innovación con índices referenciales.",
    intro:
      "La educación impulsa talento, productividad e innovación. Este hub combina rankings editoriales para comparar inversión educativa y ecosistemas de aprendizaje entre países.",
    icon: "🎓",
    relatedTopics: ["sueldos", "impuestos", "calidad-de-vida", "salud"],
    metricKeys: ["innovacion", "competitividad"],
    rankingSlugs: ["paises-mayor-inversion-educacion", "paises-mas-innovadores"],
    faq: [
      {
        q: "¿Qué mide la inversión educativa?",
        a: "Gasto público, cobertura y calidad de infraestructura educativa."
      },
      {
        q: "¿Por qué se asocia con innovación?",
        a: "La educación fortalece talento, investigación y desarrollo tecnológico."
      },
      {
        q: "¿Incluye educación superior y técnica?",
        a: "Sí, se considera el ecosistema completo en un índice agregado."
      },
      {
        q: "¿Cómo usar estos rankings?",
        a: "Como referencia comparativa para estudios, inversión o análisis de talento."
      },
      {
        q: "¿Son datos oficiales?",
        a: "No, son compilaciones editoriales con fuentes públicas."
      }
    ]
  }
};
