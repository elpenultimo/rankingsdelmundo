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
