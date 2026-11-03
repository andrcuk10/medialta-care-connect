import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { calculateAnalysisTotal, toggleAnalysis } from "./analysis-calculator";

describe("analysis calculator", () => {
  test("adds regular prices without discounts or automatic fees", () => {
    assert.equal(calculateAnalysisTotal(["Glukoza", "CRP"]).total, 870);
    assert.equal(calculateAnalysisTotal(["Glukoza", "CRP", "Vađenje krvi"]).total, 1020);
  });
  test("does not count repeated catalog entries twice", () => {
    assert.deepEqual(calculateAnalysisTotal(["Feritin", "Feritin"]), { total: 1320, unpriced: [], count: 1 });
  });
  test("keeps zero-price entries distinct from missing prices", () => {
    assert.deepEqual(calculateAnalysisTotal(["Faktor rizika", "TSH", "Glukoza"]), { total: 170, unpriced: ["TSH"], count: 3 });
  });
  test("adds and removes a selection", () => {
    assert.deepEqual(toggleAnalysis([], "CRP"), ["CRP"]);
    assert.deepEqual(toggleAnalysis(["CRP", "Glukoza"], "CRP"), ["Glukoza"]);
  });
  test("an empty selection has no charges", () => {
    assert.deepEqual(calculateAnalysisTotal([]), { total: 0, unpriced: [], count: 0 });
  });
});