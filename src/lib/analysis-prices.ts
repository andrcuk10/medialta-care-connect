// Source: Cenovnik_za_štampu_NOVI_od_01.01.2026.xlsx, Sheet1, column D (Cena).
// Sheet2 is the obsolete 2016 price list. Discount columns J/K are not used.
export const regularAnalysisPrices: Record<string, number> = {
  "Glukoza": 170,
  "Urea": 170,
  "Kreatinin": 170,
  "Bilirubin ukupan": 170,
  "AST": 170,
  "ALT": 170,
  "Gvožđe": 190,
  "Krvna slika + LF 5dif": 400,
  "Leukocitarna formula (mikroskopski)": 700,
  "Sedimentacija": 150,
  "Fibrinogen": 300,
  "D-dimer": 2150,
  "Ukupni holesterol": 170,
  "HDL holesterol": 170,
  "LDL holesterol": 170,
  "Trigliceridi": 170,
  "Ultrasenzitivan TSH": 690,
  "FT3": 720,
  "FT4": 720,
  "Anti-TPO": 1420,
  "PSA": 1210,
  "CEA": 1210,
  "CA 19-9": 1680,
  "Vitamin D3 (OH-25)": 2420,
  "Vitamin B12": 1380,
  "Folna kiselina": 1380,
  "Kalcijum": 190,
  "Magnezijum": 190,
  "Opšti pregled urina": 400,
  "Urinokultura": 640,
  "Bris grla": 650,
  "Bris nosa": 650,
};

export function formatAnalysisPrice(name: string) {
  const price = regularAnalysisPrices[name];
  return price === undefined ? "Cena na upit" : `${new Intl.NumberFormat("sr-RS").format(price)} RSD`;
}