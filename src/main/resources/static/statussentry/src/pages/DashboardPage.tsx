import React, { useState } from 'react'
import { Plus, Radar } from 'lucide-react'
import { DashboardSummaryBar } from '../components/DashboardSummary'
import { MonitorTable }        from '../components/MonitorTable'
import { AddMonitorModal }     from '../components/AddMonitorModal'
import { useMonitors }         from '../hooks/useMonitors'
import { PlanType, User, MonitorTarget } from '../types'

interface Props {
  user: User
}

function Topbar({ username, plan, onPlanToggle }: { username: string; plan: PlanType; onPlanToggle: () => void }) {
  const isPremium = plan === PlanType.PREMIUM
  return (
    <header style={{ background: '#111827', borderBottom: '1px solid #1E2D3D', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
      <style>{`@keyframes ss-logo-pulse { 0%,100%{box-shadow:0 0 0 3px rgba(0,229,160,0.2)} 50%{box-shadow:0 0 0 6px rgba(0,229,160,0.06)} }`}</style>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 16, fontWeight: 600, color: '#E8EDF5' }}>
        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#00E5A0', boxShadow: '0 0 0 3px rgba(0,229,160,0.2)', animation: 'ss-logo-pulse 2s infinite', display: 'inline-block' }} />
        StatusSentry
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button onClick={onPlanToggle} title="Demo: alternar plano"
          style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.5px', padding: '4px 10px', borderRadius: 20, textTransform: 'uppercase', cursor: 'pointer', ...(isPremium ? { background: 'rgba(0,229,160,0.12)', color: '#00E5A0', border: '1px solid rgba(0,229,160,0.3)' } : { background: 'rgba(123,143,166,0.15)', color: '#7B8FA6', border: '1px solid rgba(123,143,166,0.3)' }) }}>
          {plan}
        </button>
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1A2332', border: '1px solid #253447', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, color: '#00E5A0', userSelect: 'none', cursor: 'pointer' }}
          title={username}>
          {username.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  )
}

export function DashboardPage({ user }: Props) {
  const [plan, setPlan]       = useState<PlanType>(user.plan)
  const [modalOpen, setModal] = useState(false)
  const [_editTarget, setEdit] = useState<MonitorTarget | null>(null)

  const { monitors, summary, addMonitor, removeMonitor } = useMonitors(plan)
  const fullSummary = { ...summary, plan }

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', fontFamily: "'Inter',sans-serif", color: '#E8EDF5' }}>
      <Topbar username={user.username} plan={plan} onPlanToggle={() => setPlan((p) => p === PlanType.FREE ? PlanType.PREMIUM : PlanType.FREE)} />
      <main style={{ padding: 24 }}>
        <DashboardSummaryBar summary={fullSummary} onUpgradeClick={() => setPlan(PlanType.PREMIUM)} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, fontWeight: 500, color: '#E8EDF5' }}>
            <Radar size={16} />
            Monitores
            <span style={{ fontSize: 11, background: '#1A2332', color: '#7B8FA6', padding: '2px 8px', borderRadius: 20, border: '1px solid #1E2D3D' }}>
              {monitors.length}
            </span>
          </div>
          <button onClick={() => setModal(true)}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 8, background: '#00E5A0', border: 'none', color: '#0A0E1A', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            <Plus size={15} />Novo Monitor
          </button>
        </div>
        <MonitorTable monitors={monitors} onEdit={(m) => { setEdit(m); setModal(true) }} onRemove={(id) => removeMonitor(id)} />
      </main>
      <AddMonitorModal isOpen={modalOpen} plan={plan} onClose={() => { setModal(false); setEdit(null) }} onSubmit={async (data) => { await addMonitor(data) }} />
    </div>
  )
}
