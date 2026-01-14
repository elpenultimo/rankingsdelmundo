# Rankings del Mundo

MVP de rankings globales en español, construido con Next.js 14 (App Router), TypeScript y TailwindCSS.

## Requisitos

- Node.js 18+
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000` en el navegador.

## Build de producción

```bash
npm run build
npm run start
```

## Analítica interna (Vercel KV opcional)

El sitio usa métricas internas anónimas para contar vistas y acciones agregadas por slug
(sin IPs, sin cookies de tracking, sin user agents). En producción se recomienda habilitar
Vercel KV para persistencia; si no está configurado, el sistema usa un storage in-memory
solo para desarrollo y no rompe el build.

### Configurar Vercel KV

1. Instala la dependencia:
   ```bash
   npm install @vercel/kv
   ```
2. Crea una base KV en el dashboard de Vercel.
3. Agrega las variables de entorno:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

Sin estas variables, el conteo funciona en memoria local sin persistencia.

## OG images (QA)

Prueba las rutas de Open Graph en local con `npm run dev`:

- `/opengraph-image`
- `/ranking/[slug]/opengraph-image`
- `/ranking/[slug]/anio/[year]/opengraph-image`
- `/ranking/[slug]/region/[region]/opengraph-image`
- `/ranking/[slug]/region/[region]/anio/[year]/opengraph-image`
- `/comparar/pais/[a]-vs-[b]/opengraph-image`
- `/comparar/ciudad/[a]-vs-[b]/opengraph-image`

## Despliegue en Vercel

1. Conecta el repositorio a Vercel.
2. Configura el framework como **Next.js** (auto-detectado).
3. Usa los comandos por defecto:
   - Build: `npm run build`
   - Output: `.next`
4. Despliega.

## Estructura de datos

Los rankings viven en `data/rankings.ts`. Por ahora no hay base de datos y los datos son estáticos.

## Rutas principales

- `/` Home.
- `/rankings` Listado con filtros y búsqueda.
- `/categorias` Índice de categorías de rankings.
- `/categoria/[cat]` Hubs temáticos por categoría (paises, ciudades, dinero, clima, vida).
- `/temas` Índice de hubs temáticos.
- `/tema/[topic]` Hub temático con rankings, comparaciones y entidades destacadas.
- `/ranking/[slug]` Detalle del ranking.
- `/ranking/[slug]/region/[region]` Segmentación por región.
- `/ranking/[slug]/anio/[year]` Segmentación por año.
- `/ranking/[slug]/region/[region]/anio/[year]` Segmentación por región y año.
- `/paises` Listado de países.
- `/ciudades` Listado de ciudades.
- `/pais/[slug]` Perfil de país.
- `/ciudad/[slug]` Perfil de ciudad.
- `/comparar` Home de comparaciones.
- `/comparar/pais/[a]-vs-[b]` Comparativa entre países.
- `/comparar/ciudad/[a]-vs-[b]` Comparativa entre ciudades.
- `/comparar?mode=pais&a=chile&b=espana` Comparador con parámetros precargados.
- `/comparar?mode=ciudad&a=madrid&b=barcelona` Comparador de ciudades precargado.
- `/metodologia` Metodología editorial y uso de índices referenciales.
