export type RegionKey =
  | "global"
  | "america"
  | "sudamerica"
  | "norteamerica"
  | "europa"
  | "asia"
  | "africa"
  | "oceania"
  | "unknown";

export const regions: { key: Exclude<RegionKey, "unknown">; label: string }[] = [
  { key: "global", label: "Global" },
  { key: "america", label: "América" },
  { key: "sudamerica", label: "Sudamérica" },
  { key: "norteamerica", label: "Norteamérica" },
  { key: "europa", label: "Europa" },
  { key: "asia", label: "Asia" },
  { key: "africa", label: "África" },
  { key: "oceania", label: "Oceanía" }
];

export const countryToRegion: Record<string, RegionKey> = {
  Argentina: "sudamerica",
  Bolivia: "sudamerica",
  Brasil: "sudamerica",
  Chile: "sudamerica",
  Colombia: "sudamerica",
  Ecuador: "sudamerica",
  Paraguay: "sudamerica",
  Perú: "sudamerica",
  Uruguay: "sudamerica",
  Venezuela: "sudamerica",
  "Estados Unidos": "norteamerica",
  Canadá: "norteamerica",
  México: "norteamerica",
  Guatemala: "america",
  Honduras: "america",
  "El Salvador": "america",
  Nicaragua: "america",
  "Costa Rica": "america",
  Panamá: "america",
  Cuba: "america",
  "República Dominicana": "america",
  Haití: "america",
  Jamaica: "america",
  España: "europa",
  Portugal: "europa",
  Francia: "europa",
  Alemania: "europa",
  Italia: "europa",
  "Reino Unido": "europa",
  Irlanda: "europa",
  "Países Bajos": "europa",
  Bélgica: "europa",
  Suiza: "europa",
  Suecia: "europa",
  Noruega: "europa",
  Dinamarca: "europa",
  Finlandia: "europa",
  Polonia: "europa",
  Grecia: "europa",
  Ucrania: "europa",
  Rusia: "europa",
  Turquía: "asia",
  China: "asia",
  Japón: "asia",
  "Corea del Sur": "asia",
  India: "asia",
  Indonesia: "asia",
  Tailandia: "asia",
  Vietnam: "asia",
  Filipinas: "asia",
  Israel: "asia",
  "Emiratos Árabes Unidos": "asia",
  "Arabia Saudita": "asia",
  "Sudáfrica": "africa",
  Nigeria: "africa",
  Egipto: "africa",
  Marruecos: "africa",
  Kenia: "africa",
  Ghana: "africa",
  Australia: "oceania",
  "Nueva Zelanda": "oceania"
};

export const getRegionForCountry = (name: string): RegionKey =>
  countryToRegion[name] ?? "unknown";

export const isRegionKey = (value: string): value is RegionKey =>
  ["global", "america", "sudamerica", "norteamerica", "europa", "asia", "africa", "oceania"].includes(
    value
  );
