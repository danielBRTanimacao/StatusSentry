import { useState, useCallback } from 'react'
import {
  MonitorTarget,
  CreateTargetRequest,
  UpdateTargetRequest,
  DashboardSummary,
  PlanType,
} from '../types'

const MOCK_MONITORS: MonitorTarget[] = [
  {
    id: 1,
    name: 'API de Produção',
    url: 'https://api.minhaempresa.com/health',
    checkInterval: 1,
    isUp: true,
    lastCheck: new Date(Date.now() - 45_000).toISOString(),
  },
  {
    id: 2,
    name: 'Painel Administrativo',
    url: 'https://admin.minhaempresa.com',
    checkInterval: 5,
    isUp: true,
    lastCheck: new Date(Date.now() - 120_000).toISOString(),
  },
  {
    id: 3,
    name: 'Loja Virtual',
    url: 'https://loja.minhaempresa.com',
    checkInterval: 5,
    isUp: false,
    lastCheck: new Date(Date.now() - 600_000).toISOString(),
  },
  {
    id: 4,
    name: 'Blog Corporativo',
    url: 'https://blog.minhaempresa.com',
    checkInterval: 15,
    isUp: true,
    lastCheck: new Date(Date.now() - 900_000).toISOString(),
  },
  {
    id: 5,
    name: 'CDN de Assets',
    url: 'https://cdn.minhaempresa.com',
    checkInterval: 30,
    isUp: true,
    lastCheck: new Date(Date.now() - 1_800_000).toISOString(),
  },
]

export function useMonitors(plan: PlanType = PlanType.FREE) {
  const [monitors, setMonitors] = useState<MonitorTarget[]>(MOCK_MONITORS)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState<string | null>(null)

  const summary: DashboardSummary = {
    totalMonitors:   monitors.length,
    onlineMonitors:  monitors.filter((m) => m.isUp).length,
    offlineMonitors: monitors.filter((m) => !m.isUp).length,
    plan,
  }

  /** POST /targets */
  const addMonitor = useCallback(async (data: CreateTargetRequest) => {
    setLoading(true)
    try {
      // TODO: const res = await api.post<MonitorTarget>('/targets', data)
      // setMonitors((prev) => [...prev, res.data])
      const fake: MonitorTarget = {
        id: Date.now(),
        ...data,
        isUp: true,
        lastCheck: new Date().toISOString(),
      }
      setMonitors((prev) => [...prev, fake])
    } catch {
      setError('Falha ao criar monitor.')
      throw new Error('Falha ao criar monitor.')
    } finally {
      setLoading(false)
    }
  }, [])

  /** PATCH /targets/:id */
  const updateMonitor = useCallback(async (id: number, data: UpdateTargetRequest) => {
    setLoading(true)
    try {
      // TODO: await api.patch(`/targets/${id}`, data)
      setMonitors((prev) => prev.map((m) => (m.id === id ? { ...m, ...data } : m)))
    } catch {
      setError('Falha ao atualizar monitor.')
      throw new Error('Falha ao atualizar monitor.')
    } finally {
      setLoading(false)
    }
  }, [])

  /** DELETE /targets/:id */
  const removeMonitor = useCallback(async (id: number) => {
    setLoading(true)
    try {
      // TODO: await api.delete(`/targets/${id}`)
      setMonitors((prev) => prev.filter((m) => m.id !== id))
    } catch {
      setError('Falha ao remover monitor.')
      throw new Error('Falha ao remover monitor.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { monitors, summary, loading, error, addMonitor, updateMonitor, removeMonitor }
}
