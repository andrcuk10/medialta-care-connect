import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Clock3, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapEmbed, SiteShell } from "@/components/site-shell";
import { OpenStatusBadge } from "@/components/open-status";
import { contact } from "@/lib/medialta-data";
import { workingHours, closedDayLabel, closedDayNote } from "@/lib/schedule";

export const Route = createFileRoute("/kontakt")({
  head: () => ({ meta: [
    { title: "Kontakt i lokacija — Medialta laboratorija" },
    { name: "description", content: "Kontaktirajte Medialta laboratoriju i pronađite nas na adresi Dobanovački put 2, Zemun–Altina." },
    { property: "og:title", content: "Kontakt i lokacija — Medialta" },
    { property: "og:description", content: "Telefoni, radno vreme i mapa laboratorije Medialta u Altini." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ContactPage,
});

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=Dobanova%C4%8Dki+put+2+Zemun";

function ContactPage() {
  return <SiteShell><main>
    <section className="px-5 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-stretch gap-12 lg:grid-cols-12">
        <div className="flex flex-col justify-center lg:col-span-5">
          <header className="reveal-up relative">
            <span aria-hidden="true" className="absolute -left-6 top-2 hidden h-24 w-1 bg-primary/25 lg:block" />
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-primary">Kontakt</p>
            <h1 className="font-serif text-5xl leading-[1.06] sm:text-6xl">Tu smo kada su vam potrebne <em className="text-primary">jasne</em> informacije.</h1>
            <span aria-hidden="true" className="reveal-line mt-7 block h-px w-28 bg-primary/45 [animation-delay:260ms]" />
            <p className="mt-7 max-w-sm text-lg leading-relaxed text-muted-foreground">Pozovite nas pre dolaska ili svratite — odgovaramo tokom celog radnog vremena.</p>
          </header>

          <div className="mt-12 flex flex-col gap-5">
            <article className="reveal-up group border border-border bg-card p-7 shadow-card-soft transition-[transform,box-shadow] duration-500 hover:-translate-x-1.5 hover:shadow-card-lift [animation-delay:120ms]" style={{ borderRadius: "var(--radius-xl)" }}>
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center bg-foreground text-background transition-colors duration-500 group-hover:bg-primary" style={{ borderRadius: "var(--radius-xl)" }}><Phone className="size-5" /></span>
                <div className="min-w-0">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Telefoni</h2>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <a className="font-serif text-xl transition-colors hover:text-primary" href="tel:+381117703180">{contact.phone}</a>
                    <a className="font-serif text-xl transition-colors hover:text-primary" href="tel:+381649023902">{contact.mobile}</a>
                  </div>
                </div>
              </div>
            </article>

            <article className="reveal-up group border border-foreground bg-foreground p-7 text-background shadow-card-lift transition-transform duration-500 hover:-translate-x-1.5 lg:ml-8 [animation-delay:220ms]" style={{ borderRadius: "var(--radius-xl)" }}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center bg-background/10" style={{ borderRadius: "var(--radius-xl)" }}><Clock3 className="size-5" /></span>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-background/50">Radno vreme</h2>
                </div>
                <OpenStatusBadge tone="onDark" />
              </div>
              <div className="mt-6 grid gap-3">
                {workingHours.map((hours) => <div key={hours.label} className="flex items-baseline justify-between border-b border-background/10 pb-3">
                  <span className="text-sm text-background/60">{hours.label}</span>
                  <span className="font-serif text-base italic">{hours.open}–{hours.close}</span>
                </div>)}
                <div className="flex items-baseline justify-between pt-1">
                  <span className="text-sm text-background/40">{closedDayLabel}</span>
                  <span className="font-serif text-base italic text-background/40">{closedDayNote.toLowerCase()}</span>
                </div>
              </div>
            </article>

            <article className="reveal-up group border border-border bg-card p-7 shadow-card-soft transition-[transform,box-shadow] duration-500 hover:-translate-x-1.5 hover:shadow-card-lift lg:ml-16 [animation-delay:320ms]" style={{ borderRadius: "var(--radius-xl)" }}>
              <div className="flex items-start gap-5">
                <span className="flex size-12 shrink-0 items-center justify-center bg-primary/10 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground" style={{ borderRadius: "var(--radius-xl)" }}><MapPin className="size-5" /></span>
                <div className="min-w-0">
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Adresa</h2>
                  <p className="mt-3 font-serif text-xl leading-snug">{contact.address}</p>
                  <a href={directionsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
                    Putanja <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        <div className="reveal-up relative min-h-[520px] overflow-hidden border border-border bg-muted shadow-card-lift lg:col-span-7 [animation-delay:380ms]" style={{ borderRadius: "var(--radius-2xl)" }}>
          <MapEmbed className="min-h-[520px]" />
          <div className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap items-center justify-between gap-4 border border-border bg-background/90 px-5 py-4 shadow-card-soft backdrop-blur-md sm:inset-x-6 sm:bottom-6" style={{ borderRadius: "var(--radius-xl)" }}>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-primary">Medialta Laboratorija</p>
              <p className="mt-1 text-sm text-muted-foreground">{contact.address}</p>
            </div>
            <Button asChild variant="editorial" className="pointer-events-auto">
              <a href={directionsUrl} target="_blank" rel="noreferrer"><MapPin /> Otvori mapu</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  </main></SiteShell>;
}
