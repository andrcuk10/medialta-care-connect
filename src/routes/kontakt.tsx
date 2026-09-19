import { createFileRoute } from "@tanstack/react-router";
import { Clock3, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MapEmbed, SiteShell } from "@/components/site-shell";
import { contact } from "@/lib/medialta-data";

export const Route = createFileRoute("/kontakt")({
  head: () => ({ meta: [
    { title: "Kontakt i lokacija — Medialta laboratorija" },
    { name: "description", content: "Kontaktirajte Medialta laboratoriju i pronađite nas na adresi Dobanovački put 2, Zemun–Altina." },
    { property: "og:title", content: "Kontakt i lokacija — Medialta" },
    { property: "og:description", content: "Telefoni, radno vreme i mapa laboratorije Medialta u Altini." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: ContactPage,
});

function ContactPage() { return <SiteShell><main><section className="px-5 py-16 sm:px-6 lg:py-20"><div className="mx-auto max-w-7xl"><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">Kontakt</p><h1 className="max-w-3xl font-serif text-4xl sm:text-6xl">Tu smo kada su vam potrebne jasne informacije.</h1><div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-3"><article className="bg-card p-7"><Phone className="size-5 text-primary"/><h2 className="mt-5 text-xs font-semibold uppercase tracking-widest">Telefoni</h2><a className="mt-4 block text-lg font-semibold hover:text-primary" href="tel:+381117703180">{contact.phone}</a><a className="mt-1 block text-lg font-semibold hover:text-primary" href="tel:+381649023902">{contact.mobile}</a></article><article className="bg-card p-7"><Clock3 className="size-5 text-primary"/><h2 className="mt-5 text-xs font-semibold uppercase tracking-widest">Radno vreme</h2><p className="mt-4 leading-7">Pon–Pet: 07:00–19:00<br/>Subota: 07:00–15:00<br/><span className="text-primary">Nedelja: ne radimo</span></p></article><article className="bg-card p-7"><MapPin className="size-5 text-primary"/><h2 className="mt-5 text-xs font-semibold uppercase tracking-widest">Adresa</h2><p className="mt-4 text-lg font-semibold">{contact.address}</p><Button asChild variant="editorialOutline" className="mt-5"><a href="https://www.google.com/maps/search/?api=1&query=Dobanova%C4%8Dki+put+2+Zemun" target="_blank" rel="noreferrer">Putanja</a></Button></article></div></div></section><section className="px-5 pb-20 sm:px-6 lg:pb-24"><div className="mx-auto min-h-[520px] max-w-7xl overflow-hidden border border-border"><MapEmbed className="min-h-[520px]"/></div></section></main></SiteShell>; }