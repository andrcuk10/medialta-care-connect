import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MapEmbed, SiteShell } from "@/components/site-shell";
import { OpenStatusBadge } from "@/components/open-status";
import { contact } from "@/lib/medialta-data";
import { workingHours, closedDayLabel, closedDayNote } from "@/lib/schedule";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Medialta laboratorija — Altina, Zemun" },
    { name: "description", content: "Medicinska laboratorija Medialta u Altini. Radno vreme, telefoni, lokacija i priprema za laboratorijske analize." },
    { property: "og:title", content: "Medialta laboratorija — Altina, Zemun" },
    { property: "og:description", content: "Pouzdane laboratorijske analize uz brzu uslugu i human pristup pacijentu." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: HomePage,
});

const prep = [
  ["01", "Vreme uzorkovanja", "Za većinu analiza krv je najbolje vaditi ujutru. Za tačna uputstva u vezi sa vašom analizom pozovite laboratoriju."],
  ["02", "Hrana i tečnost", "Preporuka je da se pre vađenja krvi pije voda, dok hranu ne treba da konzumirate 10 do 12 sati pre vađenja krvi."],
  ["03", "Terapija i napor", "Ne prekidajte terapiju na svoju ruku. Obavestite osoblje o lekovima i izbegnite veći fizički napor pre uzorkovanja."],
];

function HomePage() {
  return <SiteShell><main>
    <section className="mx-auto max-w-7xl px-5 pb-20 pt-14 sm:px-6 lg:pb-24 lg:pt-20">
      <div className="grid items-start gap-12 lg:grid-cols-12">
        <div className="reveal-up lg:col-span-7">
          <h1 className="max-w-3xl text-balance font-serif text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">Laboratorija za medicinsku biohemiju <span className="italic text-primary">na{"\u00a0"}Altini.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">Kvalitetna i brza laboratorijska usluga, uz prijatan boravak i posvećen pristup svakom pacijentu.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="editorial" size="editorial"><a href="tel:+381117703180"><Phone /> Pozovite nas</a></Button>
            <Button asChild variant="editorialOutline" size="editorial"><Link to="/cenovnik">Pogledajte cenovnik</Link></Button>
          </div>
        </div>
        <aside className="reveal-up rounded-lg border border-border bg-muted p-7 shadow-xl shadow-foreground/5 sm:p-8 lg:col-span-5 [animation-delay:120ms]">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
            <div><div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary"><Clock3 className="size-4" /> Radno vreme</div><OpenStatusBadge className="mb-5" /><div className="grid grid-cols-2 gap-4 text-sm">{workingHours.map((hours) => <p key={hours.label}><b>{hours.label}</b><br /><span className="text-muted-foreground">{hours.open}–{hours.close}</span></p>)}<p><b className="text-primary">{closedDayLabel}</b><br /><span className="text-muted-foreground">{closedDayNote}</span></p></div></div>
            <div className="border-t border-foreground/10 pt-7"><div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary"><MapPin className="size-4" /> Kontakt i lokacija</div><p className="mb-4 text-sm">Dobanovački put 2<br/><b className="text-base">Zemun–Altina</b></p><div className="flex flex-col gap-2 font-medium"><a href="tel:+381117703180">{contact.phone}</a><a href="tel:+381649023902">{contact.mobile}</a></div></div>
          </div>
        </aside>
      </div>
    </section>

    <section className="border-y border-border bg-card px-5 py-20 sm:px-6 lg:py-24"><div className="mx-auto max-w-7xl"><div className="mb-12 max-w-2xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Pre dolaska</p><h2 className="font-serif text-3xl sm:text-4xl">Priprema za vađenje krvi</h2><p className="mt-4 text-muted-foreground">Osnovne smernice za pouzdane rezultate. Za posebne analize proverite uputstva sa našim osobljem.</p></div><div className="grid gap-6 md:grid-cols-3">{prep.map(([n,t,d]) => <article key={n} className="rounded-lg border border-border bg-background p-7 transition-colors hover:border-primary"><span className="font-serif text-3xl italic text-primary/40">{n}</span><h3 className="mt-5 text-lg font-semibold">{t}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d}</p></article>)}</div></div></section>

    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-6 lg:py-24"><p className="mb-3 text-center text-xs font-semibold uppercase tracking-widest text-primary">Korisne informacije</p><h2 className="mb-10 text-center font-serif text-3xl">Često postavljana pitanja</h2><Accordion type="single" collapsible className="w-full"><AccordionItem value="1"><AccordionTrigger className="text-left text-base">Kada stižu rezultati?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Većina analiza se izdaje istog dana popodne, do 17 časova. Krvna slika i CRP se izdaju ranije.{"\u00a0"}</AccordionContent></AccordionItem><AccordionItem value="2"><AccordionTrigger className="text-left text-base">Da li je potrebno zakazivanje?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Zakazivanje nije potrebno. Za posebne testove preporučujemo da nas prethodno pozovete.</AccordionContent></AccordionItem><AccordionItem value="3"><AccordionTrigger className="text-left text-base">Kako mogu da preuzmem rezultate?</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">Način i vreme preuzimanja proverite sa osobljem prilikom predaje uzorka.</AccordionContent></AccordionItem></Accordion></section>

    <section className="px-5 pb-20 sm:px-6 lg:pb-24"><div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-foreground text-background lg:grid-cols-5"><div className="p-8 sm:p-12 lg:col-span-2"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Lokacija</p><h2 className="font-serif text-3xl">Pronađite nas</h2><div className="mt-8 space-y-6 text-background/75"><p><b className="text-background">Adresa</b><br/>{contact.address}</p><p><b className="text-background">Telefoni</b><br/>{contact.phone}<br/>{contact.mobile}</p></div><Button asChild variant="editorial" size="editorial" className="mt-9"><a href="https://www.google.com/maps/search/?api=1&query=Dobanova%C4%8Dki+put+2+Zemun" target="_blank" rel="noreferrer"><MapPin /> Otvori mapu</a></Button></div><div className="min-h-[390px] lg:col-span-3"><MapEmbed /></div></div></section>
  </main></SiteShell>;
}