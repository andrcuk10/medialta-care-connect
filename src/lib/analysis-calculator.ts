import { regularAnalysisPrices } from "./analysis-prices";

// The same analysis can appear in multiple sections; select it only once.
export function toggleAnalysis(selected: readonly string[], name: string): string[] {
  return selected.includes(name) ? selected.filter((item) => item !== name) : [...selected, name];
}

export function calculateAnalysisTotal(selected: readonly string[]) {
  const names = [...new Set(selected)];
  let total = 0;
  const unpriced: string[] = [];
  for (const name of names) {
    const price = regularAnalysisPrices[name];
    if (price === undefined) unpriced.push(name);
    else total += price;
  }
  return { total, unpriced, count: names.length };
}

export function formatCalculatorTotal(total: number) {
  return `${new Intl.NumberFormat("sr-RS").format(total)} RSD`;
}