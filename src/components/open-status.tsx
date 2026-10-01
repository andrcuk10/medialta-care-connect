import { useEffect, useState } from "react";
import { getLabStatus, type LabStatus } from "@/lib/schedule";

export function OpenStatusBadge({ className = "" }: { className?: string }) {
  const [status, setStatus] = useState<LabStatus | null>(null);

  useEffect(() => {
    const update = () => setStatus(getLabStatus(new Date()));
    update();
    const id = window.setInterval(update, 30_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  if (!status) {
    return <span aria-hidden="true" className={`inline-flex h-8 min-w-[186px] items-center rounded-full bg-muted/70 ${className}`} />;
  }

  const tone = status.isOpen
    ? "border-success/35 bg-success/10 text-success"
    : "border-destructive/35 bg-destructive/10 text-destructive";

  return (
    <span role="status" className={`inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider ${tone} ${className}`}>
      <span className="relative flex size-2.5 shrink-0 items-center justify-center">
        {status.isOpen && <span className="absolute inline-flex size-2.5 animate-ping rounded-full bg-current opacity-60" />}
        <span className="relative inline-flex size-2.5 rounded-full bg-current" />
      </span>
      <span>{status.isOpen ? "Trenutno otvoreno" : "Trenutno zatvoreno"}</span>
      {status.detail && <span className="font-medium normal-case tracking-normal opacity-75">· {status.detail}</span>}
    </span>
  );
}
