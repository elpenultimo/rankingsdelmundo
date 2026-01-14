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
