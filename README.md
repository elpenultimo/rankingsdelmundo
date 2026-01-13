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

## Rutas principales

- `/` — Home.
- `/rankings` — Listado con filtros por categoría, región, año, orden y búsqueda.
- `/ranking/[slug]` — Ranking base.
- `/ranking/[slug]/region/[region]` — Ranking filtrado por región.
- `/ranking/[slug]/anio/[year]` — Ranking filtrado por año.
- `/ranking/[slug]/region/[region]/anio/[year]` — Ranking filtrado por región y año.
- `/paises` — Directorio de países.
- `/ciudades` — Directorio de ciudades.
- `/pais/[slug]` — Ficha de país.
- `/ciudad/[slug]` — Ficha de ciudad.

## Despliegue en Vercel

1. Conecta el repositorio a Vercel.
2. Configura el framework como **Next.js** (auto-detectado).
3. Usa los comandos por defecto:
   - Build: `npm run build`
   - Output: `.next`
4. Despliega.

## Estructura de datos

Los rankings viven en `data/rankings.ts`. Por ahora no hay base de datos y los datos son estáticos.
