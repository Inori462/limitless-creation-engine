import type { Farm, FarmRecord } from "./types";

export const inr = (n: number) =>
  "₹" + Math.round(n).toLocaleString("en-IN");

/** Net Profit/Loss = Total Revenue − Total Expenses */
export function netProfit(revenue: number, expenses: number) {
  return revenue - expenses;
}

export function farmTotals(records: FarmRecord[]) {
  const expenses = records.filter((r) => r.type === "Expense").reduce((s, r) => s + (r.amount ?? 0), 0);
  const revenue = records.filter((r) => r.type === "Sale").reduce((s, r) => s + (r.amount ?? 0), 0);
  const harvestQty = records.filter((r) => r.type === "Harvest").reduce((s, r) => s + (r.quantity ?? 0), 0);
  return { expenses, revenue, harvestQty, net: netProfit(revenue, expenses) };
}

/** Illustrative share: participation amount as a % of the farm's operating cost. */
export function sharePercent(amount: number, opCost: number) {
  if (opCost <= 0 || amount <= 0) return 0;
  return Math.min(100, (amount / opCost) * 100);
}

export const SCENARIOS = [
  { key: "pessimistic", label: "Poor season", factor: 0.7 },
  { key: "expected", label: "Expected", factor: 1 },
  { key: "optimistic", label: "Good season", factor: 1.2 },
] as const;

export function participationScenarios(amount: number, farm: Pick<Farm, "opCost" | "projectedRevenue">) {
  const pct = sharePercent(amount, farm.opCost) / 100;
  return SCENARIOS.map((s) => {
    const revenue = farm.projectedRevenue * s.factor;
    const net = netProfit(revenue, farm.opCost);
    const share = net * pct;
    return { ...s, revenue, net, share, payout: amount + share };
  });
}

/* ---------- illustrative yield model ---------- */
export const CROP_BASE: Record<string, { yieldQ: number; price: number; rainOpt: [number, number]; days: number }> = {
  Wheat: { yieldQ: 18, price: 2275, rainOpt: [400, 650], days: 130 },
  Rice: { yieldQ: 22, price: 2183, rainOpt: [1000, 1800], days: 120 },
  Cotton: { yieldQ: 8, price: 6620, rainOpt: [600, 1100], days: 170 },
  Sugarcane: { yieldQ: 320, price: 340, rainOpt: [1200, 2000], days: 330 },
  Soybean: { yieldQ: 10, price: 4600, rainOpt: [600, 1000], days: 100 },
  Tomato: { yieldQ: 90, price: 1200, rainOpt: [500, 800], days: 110 },
  Onion: { yieldQ: 100, price: 1400, rainOpt: [650, 900], days: 120 },
};

export const METHOD_FACTOR: Record<string, number> = {
  Organic: 0.85,
  Conventional: 1,
  "Precision / Drip": 1.15,
  "Natural Farming": 0.9,
};

export function estimateYield(input: { crop: string; area: number; rainfall: number; method: string; duration: number; cost: number }) {
  const base = CROP_BASE[input.crop] ?? CROP_BASE.Wheat;
  const [lo, hi] = base.rainOpt;
  let rainFactor = 1;
  if (input.rainfall < lo) rainFactor = Math.max(0.4, input.rainfall / lo);
  else if (input.rainfall > hi) rainFactor = Math.max(0.5, 1 - (input.rainfall - hi) / (hi * 1.5));
  const durFactor = Math.min(1.1, Math.max(0.6, input.duration / base.days));
  const mf = METHOD_FACTOR[input.method] ?? 1;
  const yieldQ = base.yieldQ * input.area * rainFactor * durFactor * mf;
  const revenue = yieldQ * base.price;
  const net = netProfit(revenue, input.cost);
  const risk = Math.round(Math.min(100, (1 - rainFactor) * 120 + (durFactor < 0.85 ? 20 : 0) + (net < 0 ? 25 : 0)));
  return { yieldQ, revenue, net, risk, rainFactor, durFactor, methodFactor: mf, price: base.price };
}

export function riskLabel(score: number) {
  if (score < 25) return "Low";
  if (score < 55) return "Moderate";
  return "High";
}
