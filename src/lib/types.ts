export type Role = "farmer" | "participant" | "admin" | "visitor";
export type Stage = "Planning" | "Sowing" | "Vegetative" | "Flowering" | "Harvest" | "Sold";
export type Verification = "Pending" | "Verified" | "Rejected";
export type RecordType = "Activity" | "Expense" | "Harvest" | "Sale";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
  region?: string;
  createdAt: string;
}

export interface Farm {
  id: string;
  name: string;
  location: string;
  state: string;
  lat: number;
  lng: number;
  ownerId: string;
  farmerName: string;
  areaAcres: number;
  crop: string;
  stage: Stage;
  method: string;
  startDate: string;
  harvestDate: string;
  opCost: number;
  projectedRevenue: number;
  health: number;
  ndvi: number;
  image: string;
  description: string;
  verification: Verification;
  participationCap: number;
  createdAt: string;
}

export interface FarmRecord {
  id: string;
  farmId: string;
  date: string;
  type: RecordType;
  title: string;
  amount?: number;
  quantity?: number;
  note?: string;
}

export interface Participation {
  id: string;
  userId: string;
  farmId: string;
  amount: number;
  date: string;
}

export interface AuditLog {
  id: string;
  date: string;
  actor: string;
  action: string;
}
