import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SiteShell } from "@/components/site-shell";
import { analysisGroups } from "@/lib/medialta-data";
import { formatAnalysisPrice } from "@/lib/analysis-prices";
import { toggleAnalysis } from "@/lib/analysis-calculator";
import { AnalysisCalculator } from "@/components/analysis-calculator";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/cenovnik")({
  head: () => ({ meta: [
    { title: "Cenovnik analiza — Medialta laboratorija" },
    { name: "description", content: "Pretražite laboratorijske analize i izračunajte ukupnu cenu svog izbora po redovnom Medialta cenovniku." },
    { property: "og:title", content: "Cenovnik analiza — Medialta" },
    { property: "og:description", content: "Redovne cene laboratorijskih analiza, pretraga i kalkulator izabranih analiza." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: PricePage,
});

function PricePage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (name: string) => setSelected((current) => toggleAnalysis(current, name));
  const groups = useMemo(() => analysisGroups.map((group) => ({ ...group, analyses: group.analyses.filter((item) => item.toLocaleLowerCase("sr").includes(query.toLocaleLowerCase("sr"))) })).filter((group) => group.analyses.length), [query]);
  return <div className="pb-28"><SiteShell><main>
    <section className="border-b border-border px-5 py-16 sm:px-6 lg:py-20"><div className="reveal-up mx-auto max-w-7xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Laboratorijske analize</p><h1 className="max-w-3xl font-serif text-4xl sm:text-6xl">Brzo pronađite analizu koja vam je potrebna.</h1><p className="mt-6 max-w-2xl text-muted-foreground">Cene su izražene u dinarima (RSD), prema redovnom cenovniku od 01.01.2026. Za pripremu pozovite laboratoriju.</p><div className="relative mt-10 max-w-2xl"><Search aria-hidden="true" className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"/><input value={query} onChange={(e) => setQuery(e.target.value)} className="h-14 w-full rounded-lg border border-input bg-card pl-12 pr-4 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/15" placeholder="Pretražite analizu, npr. TSH ili glukoza" aria-label="Pretražite analize"/></div></div></section>
    <section className="px-5 py-16 sm:px-6 lg:py-20"><div className="mx-auto grid max-w-7xl grid-cols-1 gap-6">{groups.map((group, index) => <article key={group.name} className="reveal-up rounded-lg border border-border bg-card p-5 sm:p-7" style={{ animationDelay: `${120 + Math.min(index, 5) * 70}ms` }}><h2 className="font-serif text-2xl">{group.name}</h2><ul className="mt-6 divide-y divide-border">{group.analyses.map((item) => {
      const isSelected = selected.includes(item);
      return <li key={item} className={`grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-x-4 ${isSelected ? "text-primary" : "text-foreground"}`}><span className="min-w-0 break-words">{item}</span><span className="col-start-1 row-start-2 whitespace-nowrap font-medium tabular-nums sm:col-start-2 sm:row-start-1">{formatAnalysisPrice(item)}</span><Button variant={isSelected ? "default" : "outline"} size="icon" className="col-start-2 row-span-2 row-start-1 size-11 shrink-0 sm:col-start-3 sm:row-span-1" onClick={() => toggle(item)} aria-pressed={isSelected} aria-label={`${isSelected ? "Ukloni" : "Dodaj"} ${item}`} title={`${isSelected ? "Ukloni" : "Dodaj"} ${item}`}>{isSelected ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}</Button></li>;
    })}</ul></article>)}{groups.length === 0 && <div className="reveal-up rounded-lg border border-border bg-card p-10 text-center"><h2 className="font-serif text-2xl">Nema rezultata</h2><p className="mt-2 text-muted-foreground">Pokušajte sa drugim nazivom ili nas pozovite za pomoć.</p></div>}</div></section>
  </main></SiteShell><AnalysisCalculator selected={selected} onRemove={toggle} onClear={() => setSelected([])} /></div>;
}