import Link from "next/link";
import { notFound } from "next/navigation";
import { RankingCard } from "../../../components/RankingCard";
import { rankings } from "../../../data/rankings";
import {
  buildComparePairs,
  getComparableMetricsForCity,
  getComparableMetricsForCountry,
  getTopCities,
  getTopCountries
} from "../../../lib/compare";
import { getRankingsForTopic } from "../../../lib/topic-discovery";
import { topics, topicKeys, type TopicKey } from "../../../lib/topics";
import { buildBreadcrumbs, buildFAQPage, buildMetadata, siteConfig } from "../../../lib/seo";

const topicMeaning: Record<TopicKey, string> = {
  seguridad:
    "Hablar de seguridad implica analizar percepción ciudadana, incidencia de delitos, capacidades institucionales y resiliencia comunitaria. En la práctica, un destino seguro no solo reduce riesgos, también mejora la vida diaria: moverse con tranquilidad, usar espacios públicos y planificar actividades sin fricciones. Nuestros rankings combinan fuentes públicas con una lectura editorial para mostrar tendencias comparativas, no para declarar verdades absolutas. Observa si el ranking destaca coherencia entre entornos urbanos, políticas públicas y señales de confianza social. Un índice alto puede indicar condiciones favorables, pero siempre conviene contrastarlo con el contexto local, ya que los microterritorios cambian rápidamente. Revisa además la evolución en el tiempo, porque una mejora sostenida suele ser más valiosa que un pico aislado, y considera si el destino cuenta con infraestructura de prevención y programas sociales que refuercen la percepción de seguridad.",
  "costo-de-vida":
    "El costo de vida resume cuánto cuesta sostener un estilo de vida en un destino: vivienda, transporte, servicios y consumo cotidiano. En la práctica, este tema es clave para quienes evalúan mudanzas, viajes largos o inversiones. Los rankings que ves aquí son índices referenciales; no pretenden reflejar un presupuesto exacto, sino orientar comparaciones entre ciudades o países. Para interpretar bien, cruza el costo con sueldos promedio y calidad de vida. Un destino barato puede ser atractivo, pero también puede traer desafíos en infraestructura o servicios. Esta sección busca ayudarte a ver el panorama completo y priorizar lo que realmente importa para tu contexto. Considera también la volatilidad de precios, las diferencias entre zonas y la disponibilidad de vivienda, factores que pueden cambiar la lectura final.",
  "calidad-de-vida":
    "La calidad de vida integra bienestar, acceso a servicios, entorno urbano, cohesión social y posibilidades cotidianas. En la práctica, se trata de cómo se vive realmente: tiempos de traslado, acceso a salud, oferta cultural y percepción de seguridad. Los índices de este hub combinan múltiples dimensiones y se actualizan con una compilación editorial de fuentes públicas. Un buen resultado no es sinónimo de perfección, sino de un balance favorable frente a otros destinos. Para sacar el máximo provecho, revisa también clima, costo de vida y salud. Así podrás entender si la calidad de vida responde a tus prioridades personales o profesionales. Presta atención a la consistencia entre indicadores, porque algunas ciudades destacan en servicios pero pueden quedar rezagadas en vivienda o contaminación.",
  impuestos:
    "Los impuestos influyen en el costo de vivir, emprender o invertir. En la práctica, este tema se traduce en cuánto se retiene de los ingresos, qué tan competitivo es un país y qué servicios se financian con esa carga fiscal. Nuestros rankings no se basan en un único indicador, sino en una lectura editorial que combina estabilidad económica, presión tributaria y contexto de negocios. Un país con impuestos altos puede ofrecer servicios robustos; uno con impuestos bajos puede ser atractivo para inversiones, pero exigir más gasto privado. Usa estos datos para comparar tendencias generales y luego consulta las normativas locales antes de tomar decisiones. También es útil revisar la estructura del sistema, porque la progresividad o los incentivos sectoriales cambian el impacto real.",
  sueldos:
    "Los sueldos muestran el poder adquisitivo relativo y el dinamismo del mercado laboral. En la práctica, este tema ayuda a comparar oportunidades entre países o ciudades: qué ingresos se pueden esperar y cómo se relacionan con el costo de vida. Nuestros rankings de sueldos son índices referenciales, útiles para detectar tendencias macro y no para calcular salarios específicos por industria. Una posición alta sugiere mejores ingresos promedio, pero el impacto real depende de impuestos, inflación y precios locales. Por eso, en este hub combinamos comparativas y rankings relacionados, para que puedas evaluar si los sueldos se traducen en una vida más cómoda o en mayores gastos. Considera también la estabilidad del empleo y el acceso a beneficios, que influyen en la calidad del ingreso.",
  clima:
    "El clima afecta bienestar, productividad y estilo de vida. En la práctica, un clima agradable puede reducir gastos de energía, favorecer actividades al aire libre y mejorar la percepción general del destino. Este hub reúne rankings sobre confort térmico, sostenibilidad y calidad ambiental. Los índices son referenciales y se basan en compilaciones editoriales de fuentes públicas, por lo que deben interpretarse como tendencias, no como promesas. Un buen puntaje puede venir de estabilidad anual, baja humedad o menor exposición a extremos climáticos. Revisa también contaminación y calidad de vida para entender cómo el clima se integra con la experiencia diaria. Si planeas mudarte, considera la estacionalidad, los riesgos climáticos y la infraestructura de adaptación. Evalúa la resiliencia ante olas de calor y la disponibilidad de espacios verdes.",
  contaminacion:
    "La contaminación impacta la salud, la movilidad y la experiencia urbana. En la práctica, este tema ayuda a identificar destinos donde la calidad del aire y la sostenibilidad ambiental son mejores. Los rankings que ves aquí combinan indicadores públicos sobre emisiones, partículas y políticas ambientales, con una lectura editorial que busca comparabilidad. Un destino con menor contaminación suele ofrecer mejores condiciones para actividades al aire libre y bienestar general, pero los resultados también dependen de la temporada y de cambios locales. Por eso, recomendamos usar estos índices como referencia y contrastarlos con fuentes específicas del territorio que te interese. Observa la tendencia a largo plazo y la capacidad de mitigación, ya que eso refleja compromiso ambiental. El tráfico, la industria y la planificación urbana marcan diferencias clave.",
  transporte:
    "El transporte define cuánto tiempo pasamos moviéndonos y cuánto pagamos por hacerlo. En la práctica, una movilidad eficiente mejora la productividad y reduce estrés diario. Este hub reúne rankings sobre transporte público, conectividad multimodal y accesibilidad urbana. Los índices son referenciales y se basan en compilación editorial de fuentes públicas. Un buen puntaje puede indicar redes integradas, tiempos de viaje más cortos y opciones sostenibles. Aun así, cada ciudad tiene particularidades y zonas con diferencias marcadas. Complementa esta lectura con costo de vida y seguridad para entender el impacto real de la movilidad en tu día a día. También considera la calidad del servicio y la cobertura en horarios clave. La integración tarifaria y la accesibilidad universal son señales valiosas.",
  salud:
    "La salud se traduce en acceso, calidad de servicios y resultados generales de bienestar. En la práctica, un buen sistema sanitario ofrece prevención, atención oportuna y cobertura adecuada. Este hub reúne rankings de salud que combinan indicadores públicos con una lectura editorial para facilitar comparaciones. Un índice alto sugiere mejores condiciones relativas, pero no reemplaza la experiencia individual ni las políticas locales. Es recomendable cruzar estos datos con calidad de vida y contaminación para tener una visión integral. Así podrás evaluar si un destino ofrece un entorno saludable para vivir, estudiar o trabajar. Observa también la capacidad de respuesta ante emergencias y la equidad en la cobertura, factores clave en la experiencia real. La disponibilidad de personal médico y los tiempos de espera también influyen.",
  educacion:
    "La educación impulsa talento, innovación y movilidad social. En la práctica, este tema ayuda a comparar destinos por su inversión educativa, cobertura y ecosistemas de aprendizaje. Los rankings aquí reunidos son índices referenciales construidos con una compilación editorial de fuentes públicas. Una posición alta puede señalar mayor infraestructura educativa y condiciones para la formación, pero la experiencia real depende de programas específicos y del acceso local. Cruza estos datos con sueldos y calidad de vida para entender cómo la educación se transforma en oportunidades concretas. Usa este hub como punto de partida para explorar estudios o estrategias de talento. Considera además la calidad docente y la conexión con el mercado laboral, ya que determinan el impacto en el largo plazo."
};

const topicInterpretationTips: Record<TopicKey, string[]> = {
  seguridad: [
    "Un índice más alto suele indicar mejor desempeño relativo en seguridad.",
    "Compara países y ciudades para entender diferencias de escala.",
    "Complementa con contexto local antes de tomar decisiones."
  ],
  "costo-de-vida": [
    "Valores más bajos suelen ser más convenientes para el presupuesto.",
    "Revisa sueldos para entender el poder adquisitivo real.",
    "Considera vivienda y transporte como los rubros más sensibles."
  ],
  "calidad-de-vida": [
    "Un puntaje alto refleja un balance favorable de servicios y entorno.",
    "No todos los indicadores pesan igual; revisa detalles del ranking.",
    "Contrasta con clima y costo de vida para una lectura integral."
  ],
  impuestos: [
    "Observa la carga fiscal junto a la estabilidad económica.",
    "Los impuestos altos no siempre significan menor competitividad.",
    "Consulta normativas locales antes de tomar decisiones financieras."
  ],
  sueldos: [
    "Sueldos altos deben analizarse con precios e impuestos.",
    "Los promedios no reflejan diferencias sectoriales.",
    "Usa comparaciones para ver tendencias, no cifras exactas."
  ],
  clima: [
    "Climas más estables suelen aportar mayor confort anual.",
    "Revisa también calidad del aire para evaluar bienestar.",
    "Los rankings muestran tendencias, no microclimas locales."
  ],
  contaminacion: [
    "Valores altos indican mejor calidad del aire relativa.",
    "Revisa políticas ambientales para entender la tendencia.",
    "Contrasta con salud para una mirada más completa."
  ],
  transporte: [
    "Movilidad eficiente reduce tiempos y costos diarios.",
    "Evalúa conectividad y cobertura, no solo infraestructura.",
    "Compara con costo de vida para medir impacto real."
  ],
  salud: [
    "Un índice alto indica mejor desempeño sanitario general.",
    "Considera acceso y cobertura además de resultados.",
    "Complementa con contaminación y calidad de vida."
  ],
  educacion: [
    "La inversión educativa suele correlacionarse con innovación.",
    "Revisa cobertura y calidad, no solo gasto público.",
    "Usa comparaciones para identificar ecosistemas sólidos."
  ]
};

const buildItemListSchema = (items: typeof rankings) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Rankings recomendados por tema",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    url: `${siteConfig.url}/ranking/${item.slug}`
  }))
});

const buildEntityHighlights = (
  type: "pais" | "ciudad",
  metricKeys: string[],
  limit: number
) => {
  const baseList = type === "pais" ? getTopCountries(20) : getTopCities(20);
  if (!metricKeys.length) {
    return baseList.slice(0, limit).map((entity) => ({
      ...entity,
      href: `/${type}/${entity.slug}`
    }));
  }

  const scored = baseList
    .map((entity) => {
      const metrics =
        type === "pais"
          ? getComparableMetricsForCountry(entity.name)
          : getComparableMetricsForCity(entity.name);
      const score = metrics.filter((metric) => metricKeys.includes(metric.key)).length;
      return { ...entity, score };
    })
    .filter((entity) => entity.score > 0)
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  const selection = scored.length ? scored.slice(0, limit) : baseList.slice(0, limit);
  return selection.map((entity) => ({ ...entity, href: `/${type}/${entity.slug}` }));
};

const buildTopicComparisons = (metricKeys: string[], limit: number) => {
  const buildForType = (type: "pais" | "ciudad") => {
    const list = type === "pais" ? getTopCountries(16) : getTopCities(16);
    const nameBySlug = new Map(list.map((entity) => [entity.slug, entity.name]));
    const scoreBySlug = new Map(
      list.map((entity) => {
        const metrics =
          type === "pais"
            ? getComparableMetricsForCountry(entity.name)
            : getComparableMetricsForCity(entity.name);
        const score = metrics.filter((metric) => metricKeys.includes(metric.key)).length;
        return [entity.slug, score] as const;
      })
    );

    const pairs = buildComparePairs(list, 40);
    const scoredPairs = pairs
      .map((pair) => {
        const [aSlug, bSlug] = pair.split("-vs-");
        const aName = nameBySlug.get(aSlug);
        const bName = nameBySlug.get(bSlug);
        if (!aName || !bName) return null;
        const score = (scoreBySlug.get(aSlug) ?? 0) + (scoreBySlug.get(bSlug) ?? 0);
        return {
          type,
          slug: pair,
          label: `${aName} vs ${bName}`,
          score
        };
      })
      .filter(Boolean) as Array<{ type: "pais" | "ciudad"; slug: string; label: string; score: number }>;

    const sorted = scoredPairs.sort((a, b) => b.score - a.score);
    const fallback = scoredPairs.slice(0, limit);
    return sorted.some((item) => item.score > 0) ? sorted.slice(0, limit) : fallback;
  };

  return [...buildForType("pais"), ...buildForType("ciudad")]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const generateStaticParams = async () => topicKeys.map((topic) => ({ topic }));

export const generateMetadata = async ({ params }: { params: { topic: string } }) => {
  if (!topicKeys.includes(params.topic as TopicKey)) return {};
  const config = topics[params.topic as TopicKey];
  return buildMetadata({
    title: config.seoTitle,
    description: config.seoDescription,
    path: `/tema/${config.key}`
  });
};

export default function TopicHubPage({ params }: { params: { topic: string } }) {
  if (!topicKeys.includes(params.topic as TopicKey)) {
    notFound();
  }

  const topicKey = params.topic as TopicKey;
  const config = topics[topicKey];
  const searchQuery = config.label.toLowerCase();

  const recommendedRankings = getRankingsForTopic(topicKey, 20);
  const comparisons = buildTopicComparisons(config.metricKeys, 6);
  const featuredCountries = buildEntityHighlights("pais", config.metricKeys, 12);
  const featuredCities = buildEntityHighlights("ciudad", config.metricKeys, 12);

  const breadcrumbs = buildBreadcrumbs([
    { name: "Inicio", url: siteConfig.url },
    { name: "Temas", url: `${siteConfig.url}/temas` },
    { name: config.label, url: `${siteConfig.url}/tema/${config.key}` }
  ]);

  const faqSchema = buildFAQPage(config.faq);
  const itemListSchema = buildItemListSchema(recommendedRankings);

  return (
    <div className="container-page space-y-12 py-12">
      <header className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">Tema</p>
        <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
          Rankings de {config.label}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300">{config.intro}</p>
        <div className="flex flex-wrap gap-2">
          <Link
            href={`/rankings?cat=paises&q=${encodeURIComponent(searchQuery)}`}
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            Ver rankings de países
          </Link>
          <Link
            href={`/rankings?cat=ciudades&q=${encodeURIComponent(searchQuery)}`}
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            Ver rankings de ciudades
          </Link>
          <Link
            href="/comparar?mode=pais"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            Comparar países
          </Link>
          <Link
            href="/comparar?mode=ciudad"
            className="rounded-full border border-slate-200 px-4 py-1.5 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
          >
            Comparar ciudades
          </Link>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Rankings recomendados</h2>
          <Link href={`/rankings?q=${encodeURIComponent(searchQuery)}`} className="link-muted">
            Ver más rankings
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recommendedRankings.map((ranking) => (
            <RankingCard key={ranking.slug} ranking={ranking} />
          ))}
        </div>
      </section>

      {comparisons.length ? (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Comparaciones populares sobre {config.label}</h2>
            <Link href="/comparar" className="link-muted">
              Ver comparador
            </Link>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((comparison) => (
              <Link
                key={`${comparison.type}-${comparison.slug}`}
                href={`/comparar/${comparison.type}/${comparison.slug}`}
                className="card p-4"
              >
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {comparison.label}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
                  Comparación referencial basada en métricas asociadas al tema.
                </p>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Entidades destacadas</h2>
          <Link href="/rankings" className="link-muted">
            Explorar rankings
          </Link>
        </div>
        <div className="space-y-6">
          {featuredCountries.length ? (
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Países destacados
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {featuredCountries.map((entity) => (
                  <Link
                    key={entity.slug}
                    href={`/pais/${entity.slug}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    {entity.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
          {featuredCities.length ? (
            <div className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Ciudades destacadas
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {featuredCities.map((entity) => (
                  <Link
                    key={entity.slug}
                    href={`/ciudad/${entity.slug}`}
                    className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
                  >
                    {entity.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Qué significa este tema en la práctica</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300">{topicMeaning[topicKey]}</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {topicInterpretationTips[topicKey].map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
        <Link href="/metodologia" className="text-sm font-semibold text-brand-600">
          Conocer la metodología editorial →
        </Link>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Preguntas frecuentes</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {config.faq.map((item) => (
            <div key={item.q} className="card p-5">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{item.q}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="section-title">Temas relacionados</h2>
        <div className="flex flex-wrap gap-2">
          {config.relatedTopics.map((related) => (
            <Link
              key={related}
              href={`/tema/${related}`}
              className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:border-brand-300 hover:text-brand-600 dark:border-slate-700 dark:text-slate-300"
            >
              {topics[related].label}
            </Link>
          ))}
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
    </div>
  );
}
