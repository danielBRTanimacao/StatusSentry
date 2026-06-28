// ============================================================
//  StatusSentry — TypeScript Interfaces & Types
//  Espelha as entidades JPA do back-end Spring Boot
// ============================================================

export enum PlanType {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
}

// ─── Entidades ───────────────────────────────────────────────

export interface User {
  id: string
  username: string
  email: string
  verified: boolean
  plan: PlanType
}

export interface MonitorTarget {
  id: number
  name: string
  url: string
  checkInterval: number   // em minutos
  isUp: boolean
  lastCheck: string       // ISO-8601 (LocalDateTime do Spring)
}

// ─── DTOs de Request ─────────────────────────────────────────

export interface CreateTargetRequest {
  name: string
  url: string
  checkInterval: number
}

export interface UpdateTargetRequest {
  name?: string
  url?: string
  checkInterval?: number
}

export interface VerifyAccountRequest {
  verificationCode: string
}

// ─── DTOs de Response ────────────────────────────────────────

export interface AuthResponse {
  token: string
  user: User
}

// ─── Tipos de UI ─────────────────────────────────────────────

export interface DashboardSummary {
  totalMonitors: number
  onlineMonitors: number
  offlineMonitors: number
  plan: PlanType
}

export interface NewMonitorFormState {
  name: string
  url: string
  checkInterval: number
}

// ─── Constantes de negócio ───────────────────────────────────

export const INTERVALS_BY_PLAN: Record<PlanType, number[]> = {
  [PlanType.FREE]:    [15, 30, 60],
  [PlanType.PREMIUM]: [1, 5, 10, 15, 30, 60],
}

export const ALL_INTERVALS = [1, 5, 10, 15, 30, 60]

export const MIN_INTERVAL: Record<PlanType, number> = {
  [PlanType.FREE]:    15,
  [PlanType.PREMIUM]: 1,
}

// ─── Helpers ─────────────────────────────────────────────────

export function formatInterval(minutes: number): string {
  if (minutes === 1) return '1 min'
  if (minutes < 60)  return `${minutes} min`
  return `${minutes / 60}h`
}

export function formatRelative(isoString: string): string {
  const seconds = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000)
  if (seconds < 60)    return `${seconds}s atrás`
  if (seconds < 3600)  return `${Math.floor(seconds / 60)}min atrás`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h atrás`
  return new Date(isoString).toLocaleDateString('pt-BR', {
    day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit',
  })
}

export function truncateUrl(url: string, max = 40): string {
  const clean = url.replace(/^https?:\/\//, '')
  return clean.length > max ? clean.slice(0, max) + '…' : clean
}
