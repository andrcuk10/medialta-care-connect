import { Link } from "@tanstack/react-router";
import { Menu, Phone } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import logoAsset from "@/assets/medialta-logo.png.asset.json";
import { contact } from "@/lib/medialta-data";

const nav = [
  { to: "/" as const, label: "Početna" },
  { to: "/cenovnik" as const, label: "Cenovnik" },
  { to: "/kontakt" as const, label: "Kontakt" },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 sm:px-6">
          <div className="flex min-w-0 items-center gap-8">
            <Link to="/" aria-label="Medialta početna" className="shrink-0">
              <img src={logoAsset.url} alt="Medialta laboratorija" className="h-16 w-auto max-w-[230px] object-contain sm:h-[70px] sm:max-w-[260px]" />
            </Link>
            <nav className="hidden items-center gap-8 md:flex" aria-label="Glavna navigacija">
              {nav.map((item) => (
                <Link key={item.to} to={item.to} activeProps={{ className: "text-primary" }} className="text-xs font-semibold uppercase tracking-widest text-foreground/65 transition-colors hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <a href="tel:+381117703180" className="hidden text-sm font-medium transition-colors hover:text-primary lg:block">{contact.phone}</a>
            <Button asChild variant="editorial" className="hidden sm:inline-flex">
              <a href="tel:+381117703180"><Phone /> Pozovite nas</a>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Otvori meni" onClick={() => setOpen((value) => !value)}>
              <Menu />
            </Button>
          </div>
        </div>
        <nav className={`absolute left-0 right-0 top-full border-t border-border bg-background px-5 py-4 shadow-lg md:hidden ${open ? "visible opacity-100" : "invisible opacity-0"} transition-[opacity,visibility] duration-200`} aria-label="Mobilna navigacija" aria-hidden={!open}>
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="py-3 text-sm font-semibold uppercase tracking-widest">{item.label}</Link>
            ))}
          </div>
        </nav>
      </header>
      {children}
      <footer className="border-t border-border px-5 py-10 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 Medialta Laboratorija</span>
          <span>{contact.address}</span>
          <a href="tel:+381649023902" className="font-medium text-foreground hover:text-primary">{contact.mobile}</a>
        </div>
      </footer>
    </div>
  );
}

export function MapEmbed({ className = "" }: { className?: string }) {
  return <iframe className={`h-full min-h-[360px] w-full border-0 ${className}`} title="Medialta laboratorija na mapi" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Dobanova%C4%8Dki+put+2,+Zemun,+Srbija&output=embed" />;
}