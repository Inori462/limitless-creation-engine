import wheat from "@/assets/farm-wheat.jpg";
import rice from "@/assets/farm-rice.jpg";
import cotton from "@/assets/farm-cotton.jpg";
import hero from "@/assets/hero.jpg";
import type { AuditLog, Farm, FarmRecord, Participation, User } from "./types";

export const IMAGES = { wheat, rice, cotton, hero };

// Demo password for all seeded accounts: "demo1234" (SHA-256 hash below)
export const DEMO_HASH = "0ead2060b65992dca4769af601a1b3a35ef38cfad2c2c465bb160ea764157c5d";

export const seedUsers: User[] = [
  { id: "u-farmer", name: "Ramesh Patil", email: "farmer@bhumija.demo", role: "farmer", passwordHash: DEMO_HASH, region: "Maharashtra", createdAt: "2026-01-04" },
  { id: "u-part", name: "Ananya Sharma", email: "participant@bhumija.demo", role: "participant", passwordHash: DEMO_HASH, region: "Pune", createdAt: "2026-02-10" },
  { id: "u-admin", name: "Admin Desk", email: "admin@bhumija.demo", role: "admin", passwordHash: DEMO_HASH, createdAt: "2025-12-01" },
  { id: "u-visitor", name: "Demo Visitor", email: "visitor@bhumija.demo", role: "visitor", passwordHash: DEMO_HASH, createdAt: "2026-03-01" },
  { id: "u-f2", name: "Gurpreet Singh", email: "gurpreet@bhumija.demo", role: "farmer", passwordHash: DEMO_HASH, region: "Punjab", createdAt: "2026-01-18" },
  { id: "u-f3", name: "Lakshmi Reddy", email: "lakshmi@bhumija.demo", role: "farmer", passwordHash: DEMO_HASH, region: "Telangana", createdAt: "2026-02-02" },
  { id: "u-p2", name: "Vikram Joshi", email: "vikram@bhumija.demo", role: "participant", passwordHash: DEMO_HASH, region: "Mumbai", createdAt: "2026-03-12" },
];

export const seedFarms: Farm[] = [
  { id: "f-1", name: "Sahyadri Paddy Collective", location: "Maval, Pune", state: "Maharashtra", lat: 18.75, lng: 73.55, ownerId: "u-farmer", farmerName: "Ramesh Patil", areaAcres: 6, crop: "Rice", stage: "Flowering", method: "Natural Farming", startDate: "2026-06-15", harvestDate: "2026-10-30", opCost: 210000, projectedRevenue: 315000, health: 82, ndvi: 0.71, image: rice, description: "Terraced monsoon paddy on the Sahyadri slopes using SRI method and natural inputs.", verification: "Verified", participationCap: 105000, createdAt: "2026-05-20" },
  { id: "f-2", name: "Ludhiana Golden Wheat", location: "Khanna, Ludhiana", state: "Punjab", lat: 30.7, lng: 76.22, ownerId: "u-f2", farmerName: "Gurpreet Singh", areaAcres: 12, crop: "Wheat", stage: "Sowing", method: "Precision / Drip", startDate: "2026-11-05", harvestDate: "2027-04-10", opCost: 340000, projectedRevenue: 520000, health: 90, ndvi: 0.42, image: wheat, description: "High-yield rabi wheat with laser levelling and drip-fertigation.", verification: "Verified", participationCap: 170000, createdAt: "2026-09-02" },
  { id: "f-3", name: "Warangal Cotton & Cane", location: "Hanamkonda, Warangal", state: "Telangana", lat: 18.0, lng: 79.58, ownerId: "u-f3", farmerName: "Lakshmi Reddy", areaAcres: 8, crop: "Cotton", stage: "Vegetative", method: "Conventional", startDate: "2026-06-25", harvestDate: "2026-12-20", opCost: 260000, projectedRevenue: 380000, health: 64, ndvi: 0.58, image: cotton, description: "Women-led cotton enterprise with intercropped pulses for soil health.", verification: "Pending", participationCap: 130000, createdAt: "2026-06-01" },
  { id: "f-4", name: "Nashik Onion Growers", location: "Lasalgaon, Nashik", state: "Maharashtra", lat: 20.15, lng: 74.23, ownerId: "u-farmer", farmerName: "Ramesh Patil", areaAcres: 4, crop: "Onion", stage: "Harvest", method: "Precision / Drip", startDate: "2026-02-01", harvestDate: "2026-06-05", opCost: 180000, projectedRevenue: 260000, health: 76, ndvi: 0.6, image: hero, description: "Rabi onion on drip with solar pump; storage in ventilated chawl.", verification: "Verified", participationCap: 90000, createdAt: "2026-01-15" },
  { id: "f-5", name: "Indore Soy Enterprise", location: "Sanwer, Indore", state: "Madhya Pradesh", lat: 22.97, lng: 75.83, ownerId: "u-f2", farmerName: "Gurpreet Singh", areaAcres: 10, crop: "Soybean", stage: "Sold", method: "Conventional", startDate: "2026-06-20", harvestDate: "2026-10-01", opCost: 220000, projectedRevenue: 300000, health: 70, ndvi: 0.35, image: wheat, description: "Kharif soybean cycle completed and sold at the local mandi.", verification: "Verified", participationCap: 110000, createdAt: "2026-05-30" },
  { id: "f-6", name: "Kolar Tomato Farm", location: "Kolar", state: "Karnataka", lat: 13.14, lng: 78.13, ownerId: "u-f3", farmerName: "Lakshmi Reddy", areaAcres: 3, crop: "Tomato", stage: "Planning", method: "Organic", startDate: "2026-12-01", harvestDate: "2027-03-20", opCost: 150000, projectedRevenue: 230000, health: 0, ndvi: 0, image: cotton, description: "Organic tomato under shade-net, planned for the winter cycle.", verification: "Rejected", participationCap: 75000, createdAt: "2026-10-01" },
];

let rid = 0;
const r = (farmId: string, date: string, type: FarmRecord["type"], title: string, amount?: number, quantity?: number): FarmRecord => ({ id: `r-${++rid}`, farmId, date, type, title, amount, quantity });

export const seedRecords: FarmRecord[] = [
  r("f-1", "2026-06-10", "Expense", "Seeds & nursery", 18000),
  r("f-1", "2026-06-15", "Activity", "Transplanting (SRI)"),
  r("f-1", "2026-06-20", "Expense", "Labour – transplanting", 42000),
  r("f-1", "2026-07-15", "Expense", "Jeevamrut & bio-inputs", 15000),
  r("f-1", "2026-08-10", "Activity", "Weeding & water management"),
  r("f-1", "2026-09-05", "Expense", "Pest management", 9000),
  r("f-4", "2026-02-01", "Expense", "Onion seedlings", 30000),
  r("f-4", "2026-02-05", "Activity", "Drip installation check"),
  r("f-4", "2026-03-10", "Expense", "Fertigation", 38000),
  r("f-4", "2026-04-20", "Expense", "Labour", 52000),
  r("f-4", "2026-06-05", "Harvest", "Onion harvest", undefined, 380),
  r("f-4", "2026-06-20", "Sale", "Sale – Lasalgaon APMC (200 q)", 150000),
  r("f-5", "2026-06-20", "Expense", "Seeds & sowing", 40000),
  r("f-5", "2026-08-01", "Expense", "Spraying & labour", 85000),
  r("f-5", "2026-10-01", "Harvest", "Soybean harvest", undefined, 98),
  r("f-5", "2026-10-08", "Sale", "Sale – Indore mandi", 290000),
  r("f-2", "2026-11-01", "Expense", "Laser levelling", 36000),
  r("f-2", "2026-11-05", "Activity", "Sowing with seed drill"),
  r("f-3", "2026-06-25", "Expense", "Cotton seed", 28000),
  r("f-3", "2026-08-15", "Activity", "Intercropping pigeon pea"),
  r("f-3", "2026-09-10", "Expense", "Labour & weeding", 46000),
];

export const seedParticipations: Participation[] = [
  { id: "p-1", userId: "u-part", farmId: "f-1", amount: 21000, date: "2026-06-01" },
  { id: "p-2", userId: "u-part", farmId: "f-5", amount: 22000, date: "2026-06-12" },
  { id: "p-3", userId: "u-part", farmId: "f-4", amount: 18000, date: "2026-01-25" },
  { id: "p-4", userId: "u-p2", farmId: "f-2", amount: 34000, date: "2026-09-20" },
];

export const seedAudit: AuditLog[] = [
  { id: "a-1", date: "2026-10-01", actor: "Admin Desk", action: "Rejected Kolar Tomato Farm — area mismatch in documents (simulated)" },
  { id: "a-2", date: "2026-09-03", actor: "Admin Desk", action: "Verified Ludhiana Golden Wheat (simulated)" },
  { id: "a-3", date: "2026-06-02", actor: "System", action: "Flagged Warangal Cotton & Cane: expense spike vs. area" },
];

export const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** mock climate series keyed by state */
export function climateSeries(state: string) {
  const seed = state.length;
  const monsoon = state === "Punjab" ? 0.6 : state === "Maharashtra" ? 1.4 : 1;
  return MONTHS.map((m, i) => {
    const wet = i >= 5 && i <= 8 ? 1 : i === 4 || i === 9 ? 0.35 : 0.06;
    return {
      month: m,
      rainfall: Math.round((wet * 260 * monsoon + ((i * 37 + seed * 11) % 25))),
      normal: Math.round(wet * 230 * monsoon + 10),
      temp: Math.round(22 + 10 * Math.sin(((i - 1) / 12) * Math.PI * 2 - 0.4) + (seed % 3)),
    };
  });
}
export const LIFECYCLE = ["Business Creation", "Digital Ownership", "Cultivation", "Monitoring", "Harvest", "Sale", "Revenue", "Profit/Loss"];
