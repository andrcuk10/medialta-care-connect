import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { analysisGroups } from "./medialta-data";
import { formatAnalysisPrice, regularAnalysisPrices } from "./analysis-prices";

describe("Regular prices from the January 2026 price list, column D", () => {
  const expected = [
    ["Glukoza", 170], ["Urea", 170], ["Kreatinin", 170],
    ["Bilirubin ukupan", 170], ["AST", 170], ["ALT", 170], ["Gvožđe", 190],
    ["Krvna slika + LF 5dif", 400], ["Leukocitarna formula (mikroskopski)", 700],
    ["Sedimentacija", 150], ["Fibrinogen", 300], ["D-dimer", 2150],
    ["Ukupni holesterol", 170], ["HDL holesterol", 170], ["LDL holesterol", 170], ["Trigliceridi", 170],
    ["Ultrasenzitivan TSH", 690], ["FT3", 720], ["FT4", 720], ["Anti-TPO", 1420],
    ["PSA", 1210], ["CEA", 1210], ["CA 19-9", 1680], ["Vitamin D3 (OH-25)", 2420],
    ["Vitamin B12", 1380], ["Folna kiselina", 1380], ["Kalcijum", 190], ["Magnezijum", 190],
    ["Opšti pregled urina", 400], ["Urinokultura", 640], ["Bris grla", 650], ["Bris nosa", 650],
  ] as const;

  for (const [name, price] of expected) {
    test(`${name}: ${price} RSD, without discounts`, () => {
      assert.equal(regularAnalysisPrices[name], price);
    });
  }

  test("every displayed analysis has a regular price", () => {
    const names = analysisGroups.flatMap((group) => group.analyses);
    assert.equal(names.length, 32);
    for (const name of names) assert.ok((regularAnalysisPrices[name] ?? 0) > 0);
  });

  test("an unpriced TSH variant does not inherit the ultrasensitive price", () => {
    assert.equal(regularAnalysisPrices["TSH"], undefined);
    assert.equal(formatAnalysisPrice("TSH"), "Cena na upit");
  });
});