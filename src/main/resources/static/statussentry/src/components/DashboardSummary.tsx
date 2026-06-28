import React from 'react'
import { Server, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react'
import { DashboardSummary, PlanType } from '../types'

interface Props {
  summary: DashboardSummary
  onUpgradeClick: () => void
}

function StatCard({
  label, value, sub, icon, accentColor,
}: {
  label: string
  value: React.ReactNode
  sub: React.ReactNode
  icon: React.ReactNode
  accentColor: string
}) {
  return (
    <div style={{
      background: '#111827', border: '1px solid #1E2D3D',
      borderRadius: 12, padding: '18px 20px',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: accentColor }} />
      <div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.6px', textTransform: 'uppercase', color: '#7B8FA6', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
        {icon}{label}
      </div>
      <div style={{ fontSize: 28, fontWeight: 600, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
      <div style={{ fontSize: 12, color: '#7B8FA6', marginTop: 6 }}>{sub}</div>
    </div>
  )
}

export function DashboardSummaryBar({ summary, onUpgradeClick }: Props) {
  const isPremium = summary.plan === PlanType.PREMIUM
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginBottom: 28 }}>
      <StatCard
        label="Total de Monitores" icon={<Server size={13} />}
        value={summary.totalMonitors} sub="Targets configurados" accentColor="#4A9EE0"
      />
      <StatCard
        label="Online" icon={<CheckCircle2 size={13} />}
        value={<span style={{ color: '#00E5A0' }}>{summary.onlineMonitors}</span>}
        sub="Respondendo normalmente" accentColor="#00E5A0"
      />
      <StatCard
        label="Offline" icon={<AlertTriangle size={13} />}
        value={<span style={{ color: '#FF4D6A' }}>{summary.offlineMonitors}</span>}
        sub="Requer atenção" accentColor="#FF4D6A"
      />
      <StatCard
        label="Plano Atual" icon={<Sparkles size={13} />}
        value={<span style={{ fontSize: 20, display: 'block', marginTop: 4, color: isPremium ? '#00E5A0' : '#7B8FA6' }}>{summary.plan}</span>}
        sub={
          !isPremium
            ? <span style={{ color: '#4A9EE0', cursor: 'pointer', textDecoration: 'underline' }} onClick={onUpgradeClick}>Upgrade para Premium →</span>
            : <span style={{ color: '#00E5A0' }}>Plano ativo ✓</span>
        }
        accentColor="#7B8FA6"
      />
    </div>
  )
}
