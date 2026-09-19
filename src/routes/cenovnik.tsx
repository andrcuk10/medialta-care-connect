import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { analysisGroups } from "@/lib/medialta-data";

export const Route = createFileRoute("/cenovnik")({
  head: () => ({ meta: [
    { title: "Cenovnik analiza — Medialta laboratorija" },
    { name: "description", content: "Pretražite laboratorijske analize po nazivu i pregledajte ih po grupama." },
    { property: "og:title", content: "Cenovnik analiza — Medialta" },
    { property: "og:description", content: "Pregled grupisanih laboratorijskih analiza i brza pretraga." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PricePage,
});

function PricePage() {
  const [query, setQuery] = useState("");
  const groups = useMemo(() => analysisGroups.map((group) => ({ ...group, analyses: group.analyses.filter((item) => item.toLocaleLowerCase("sr").includes(query.toLocaleLowerCase("sr"))) })).filter((group) => group.analyses.length), [query]);
  return <SiteShell><main><section className="border-b border-border px-5 py-16 sm:px-6 lg:py-20"><div className="mx-auto max-w-7xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Laboratorijske analize</p><h1 className="max-w-3xl font-serif text-4xl sm:text-6xl">Brzo pronađite analizu koja vam je potrebna.</h1><p className="mt-6 max-w-2xl text-muted-foreground">Pretražite spisak ili pregledajte analize po oblastima. Za važeću cenu i pripremu pozovite laboratoriju.</p><div className="relative mt-10 max-w-2xl"><Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-14 w-full border border-input bg-card pl-12 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Pretražite analizu, npr. TSH ili glukoza" aria-label="Pretražite analize"/></div></div></section><section className="px-5 py-16 sm:px-6 lg:py-20"><div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">{groups.map((group) => <article key={group.name} className="border border-border bg-card p-7"><h2 className="font-serif text-2xl">{group.name}</h2><p className="mt-2 text-sm text-muted-foreground">{group.description}</p><ul className="mt-6 divide-y divide-border">{group.analyses.map((item) => <li key={item} className="flex items-center justify-between py-3 text-sm"><span>{item}</span><span className="text-xs text-muted-foreground">Cena na upit</span></li>)}</ul></article>)}{groups.length === 0 && <div className="md:col-span-2 border border-border bg-card p-10 text-center"><h2 className="font-serif text-2xl">Nema rezultata</h2><p className="mt-2 text-muted-foreground">Pokušajte sa drugim nazivom ili nas pozovite za pomoć.</p></div>}</div></section></main></SiteShell>;
}