import { describe, expect, it } from "vitest";
import { farmTotals, netProfit, participationScenarios, sharePercent } from "./finance";

describe("finance rules", () => {
  it("net profit = revenue − expenses", () => {
    expect(netProfit(150000, 90000)).toBe(60000);
    expect(netProfit(50000, 80000)).toBe(-30000);
  });
  it("totals only count expenses and sales", () => {
    const t = farmTotals([
      { id: "1", farmId: "f", date: "", type: "Expense", title: "Seeds", amount: 10000 },
      { id: "2", farmId: "f", date: "", type: "Sale", title: "Sale", amount: 25000 },
      { id: "3", farmId: "f", date: "", type: "Activity", title: "Weeding", amount: 999 },
    ]);
    expect(t.net).toBe(15000);
  });
  it("share percent is amount over operating cost", () => {
    expect(sharePercent(20000, 200000)).toBe(10);
  });
  it("expected scenario share follows the share percent", () => {
    const s = participationScenarios(20000, { opCost: 200000, projectedRevenue: 300000 });
    expect(s[1].share).toBe(10000);
  });
});
