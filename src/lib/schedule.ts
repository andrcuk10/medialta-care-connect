export type WorkingHours = {
  /** JS day numbers: 0 = nedelja … 6 = subota */
  days: number[];
  label: string;
  open: string;
  close: string;
};

export const workingHours: WorkingHours[] = [
  { days: [1, 2, 3, 4, 5], label: "Pon–Pet", open: "07:00", close: "19:00" },
  { days: [6], label: "Subota", open: "07:00", close: "15:00" },
];

export const closedDayLabel = "Nedelja";
export const closedDayNote = "Ne radimo";

const dayNames = ["nedelja", "ponedeljak", "utorak", "sreda", "četvrtak", "petak", "subota"];

const toMinutes = (time: string) => {
  const [h = 0, m = 0] = time.split(":").map(Number);
  return h * 60 + m;
};

export type LabStatus = { isOpen: boolean; detail: string };

export function getLabStatus(now: Date): LabStatus {
  const dow = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = workingHours.find((hours) => hours.days.includes(dow));

  if (today && mins >= toMinutes(today.open) && mins < toMinutes(today.close)) {
    return { isOpen: true, detail: `danas do ${today.close}` };
  }

  for (let offset = 0; offset < 8; offset += 1) {
    const day = (dow + offset) % 7;
    const hours = workingHours.find((entry) => entry.days.includes(day));
    if (!hours) continue;
    if (offset === 0) {
      if (mins < toMinutes(hours.open)) return { isOpen: false, detail: `danas u ${hours.open}` };
      continue;
    }
    const when = offset === 1 ? "sutra" : dayNames[day];
    return { isOpen: false, detail: `${when} u ${hours.open}` };
  }

  return { isOpen: false, detail: "" };
}
