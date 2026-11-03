import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Calculator, ChevronRight, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { calculateAnalysisTotal, formatCalculatorTotal } from "@/lib/analysis-calculator";
import { formatAnalysisPrice } from "@/lib/analysis-prices";

type Props = {
  selected: string[];
  onRemove: (name: string) => void;
  onClear: () => void;
};

export function AnalysisCalculator({ selected, onRemove, onClear }: Props) {
  const { total, unpriced, count } = calculateAnalysisTotal(selected);
  const totalLabel = unpriced.length ? "Zbir poznatih cena" : "Ukupno";
  return (
    <Dialog>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card px-5 py-4 shadow-card-lift sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-4">
            <span className="hidden size-11 shrink-0 items-center justify-center rounded-lg bg-muted text-primary sm:flex"><Calculator aria-hidden="true" className="size-5" /></span>
            <div className="min-w-0" role="status" aria-live="polite" aria-atomic="true">
              <p className="text-xs text-muted-foreground">{count ? `Izabrane stavke: ${count}` : "Kalkulator analiza"}</p>
              <p className="mt-1 text-lg font-semibold tabular-nums sm:text-xl">{formatCalculatorTotal(total)}{unpriced.length > 0 && <span className="ml-1 text-primary"> + na upit</span>}</p>
            </div>
          </div>
          <DialogTrigger asChild><Button variant="default" className="h-11 shrink-0 px-3 sm:px-5"><span>Pregled<span className="hidden sm:inline"> izbora</span></span><ChevronRight aria-hidden="true" /></Button></DialogTrigger>
        </div>
      </div>
      <DialogPortal>
        <DialogOverlay className="bg-foreground/40" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 flex max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border border-border bg-card shadow-card-lift">
          <header className="border-b border-border p-5 pr-16 sm:p-6 sm:pr-16">
            <div className="mb-3 flex items-center gap-2 text-primary"><Calculator aria-hidden="true" className="size-5" /><span className="text-xs font-semibold uppercase">Kalkulator analiza</span></div>
            <DialogTitle className="font-serif text-2xl font-normal">Vaš izbor</DialogTitle>
            <DialogDescription className="mt-2">Izabrane stavke: {count}</DialogDescription>
            <DialogClose asChild><Button size="icon" variant="ghost" className="absolute right-4 top-4 size-10" aria-label="Zatvori pregled" title="Zatvori pregled"><X /></Button></DialogClose>
          </header>
          <div className="min-h-0 overflow-y-auto px-5 sm:px-6">
            {count === 0 ? <p className="py-12 text-center text-muted-foreground">Nema izabranih analiza.</p> : <ul className="divide-y divide-border">{selected.map((name) => <li key={name} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4"><div className="min-w-0"><p className="break-words text-sm">{name}</p><p className="mt-1 text-sm font-medium tabular-nums text-muted-foreground">{formatAnalysisPrice(name)}</p></div><Button variant="ghost" size="icon" className="size-10" onClick={() => onRemove(name)} aria-label={`Ukloni ${name}`} title={`Ukloni ${name}`}><X /></Button></li>)}</ul>}
          </div>
          <footer className="border-t border-border p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2"><span className="text-sm text-muted-foreground">{totalLabel}</span><strong className="text-2xl tabular-nums">{formatCalculatorTotal(total)}</strong></div>
            {unpriced.length > 0 && <p className="mt-3 text-sm text-primary">Stavke bez navedene cene ({unpriced.length}) nisu uračunate. Konačan iznos proverite sa laboratorijom.</p>}
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Obračun je po redovnim cenama, bez popusta. Vađenje krvi i druge usluge ulaze u zbir samo ako su izabrane.</p>
            <div className="mt-5 flex flex-wrap justify-between gap-2"><Button variant="ghost" disabled={!count} onClick={onClear}><Trash2 />Obriši izbor</Button><DialogClose asChild><Button variant="outline">Nastavi izbor</Button></DialogClose></div>
          </footer>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}