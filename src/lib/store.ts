import { useSyncExternalStore } from "react";
import { seedAudit, seedFarms, seedParticipations, seedRecords, seedUsers } from "./seed";
import type { AuditLog, Farm, FarmRecord, Participation, Role, User } from "./types";

export interface AppState {
  users: User[];
  farms: Farm[];
  records: FarmRecord[];
  participations: Participation[];
  audit: AuditLog[];
  sessionUserId: string | null;
}

const KEY = "bhumija-demo-v1";
const initial: AppState = {
  users: seedUsers,
  farms: seedFarms,
  records: seedRecords,
  participations: seedParticipations,
  audit: seedAudit,
  sessionUserId: null,
};

let state: AppState = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) state = { ...initial, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
}

function emit() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export function setState(fn: (s: AppState) => AppState) {
  load();
  state = fn(state);
  emit();
}

function subscribe(l: () => void) {
  load();
  listeners.add(l);
  queueMicrotask(l);
  return () => listeners.delete(l);
}

export function useStore<T>(sel: (s: AppState) => T): T {
  return useSyncExternalStore(
    subscribe,
    () => sel(state),
    () => sel(initial),
  );
}

export const uid = (p: string) => `${p}-${Math.random().toString(36).slice(2, 9)}`;
export const today = () => new Date().toISOString().slice(0, 10);

export async function hashPassword(pw: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(pw));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function useSession() {
  const id = useStore((s) => s.sessionUserId);
  const users = useStore((s) => s.users);
  return users.find((u) => u.id === id) ?? null;
}

export async function login(email: string, password: string): Promise<User> {
  load();
  const hash = await hashPassword(password);
  const u = state.users.find((x) => x.email.toLowerCase() === email.toLowerCase().trim());
  if (!u || u.passwordHash !== hash) throw new Error("Email or password is incorrect.");
  setState((s) => ({ ...s, sessionUserId: u.id }));
  return u;
}

export async function register(data: { name: string; email: string; password: string; role: Role; region?: string }) {
  load();
  if (state.users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) throw new Error("An account with this email already exists.");
  const user: User = { id: uid("u"), name: data.name, email: data.email.trim(), role: data.role, region: data.region, passwordHash: await hashPassword(data.password), createdAt: today() };
  setState((s) => ({ ...s, users: [...s.users, user], sessionUserId: user.id }));
  return user;
}

export function logout() {
  setState((s) => ({ ...s, sessionUserId: null }));
}

export function resetDemo() {
  state = { ...initial, sessionUserId: state.sessionUserId };
  emit();
}

export function addAudit(actor: string, action: string) {
  setState((s) => ({ ...s, audit: [{ id: uid("a"), date: today(), actor, action }, ...s.audit] }));
}

export const homeFor = (role: Role) =>
  role === "farmer" ? "/farmer" : role === "participant" ? "/participant" : role === "admin" ? "/admin" : "/explore";
