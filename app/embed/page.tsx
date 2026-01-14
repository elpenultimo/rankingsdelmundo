import type { Metadata } from "next";
import { EmbedGenerator } from "../../components/EmbedGenerator";
import { siteConfig } from "../../lib/seo";

export const metadata: Metadata = {
  title: "Embed de comparaciones",
  description: "Genera un widget para incrustar comparaciones de países y ciudades.",
  robots: {
    index: false,
    follow: false
  },
  alternates: {
    canonical: `${siteConfig.url}/comparar`
  }
};

export default function EmbedPage() {
  return <EmbedGenerator />;
}
