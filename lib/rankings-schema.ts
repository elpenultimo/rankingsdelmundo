import type { Ranking } from "../data/rankings";

const validCategories = new Set(["paises", "ciudades", "dinero", "clima", "vida"]);

export const validateRankings = (rankings: Ranking[]): boolean => {
  const warnings: string[] = [];
  const slugSet = new Set<string>();
  const knownSlugs = new Set(rankings.map((ranking) => ranking.slug));

  rankings.forEach((ranking) => {
    if (!ranking.slug) {
      warnings.push("Ranking sin slug.");
    } else if (slugSet.has(ranking.slug)) {
      warnings.push(`Slug duplicado: ${ranking.slug}`);
    } else {
      slugSet.add(ranking.slug);
    }

    if (!validCategories.has(ranking.category)) {
      warnings.push(`Categoría inválida en ${ranking.slug}: ${ranking.category}`);
    }

    if (ranking.year !== "2026") {
      warnings.push(`Año inválido en ${ranking.slug}: ${ranking.year}`);
    }

    if (!ranking.updatedAt || Number.isNaN(Date.parse(ranking.updatedAt))) {
      warnings.push(`updatedAt inválido en ${ranking.slug}: ${ranking.updatedAt}`);
    }

    if (!ranking.items || ranking.items.length !== 20) {
      warnings.push(`Items inválidos en ${ranking.slug}: ${ranking.items?.length ?? 0}`);
    }

    ranking.items.forEach((item, index) => {
      if (!item.name) {
        warnings.push(`Item sin nombre en ${ranking.slug} (posición ${index + 1}).`);
      }
      if (typeof item.value !== "number" || !Number.isFinite(item.value) || item.value <= 0) {
        warnings.push(`Valor inválido en ${ranking.slug} para ${item.name}.`);
      }
      if (item.rank !== index + 1) {
        warnings.push(`Orden inválido en ${ranking.slug}: ${item.name} debería ser ${index + 1}.`);
      }
    });

    if (!ranking.faq || ranking.faq.length !== 5) {
      warnings.push(`FAQ inválido en ${ranking.slug}: ${ranking.faq?.length ?? 0}`);
    }

    ranking.related.forEach((relatedSlug) => {
      if (!knownSlugs.has(relatedSlug)) {
        warnings.push(`Relacionado inexistente en ${ranking.slug}: ${relatedSlug}`);
      }
    });
  });

  if (warnings.length) {
    console.warn("[rankings] Se detectaron advertencias de validación:");
    warnings.forEach((warning) => console.warn(`- ${warning}`));
    return false;
  }

  return true;
};
