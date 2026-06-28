import React, { useState } from 'react'
import { Link, Pencil, Trash2 } from 'lucide-react'
import { MonitorTarget, formatRelative, formatInterval, truncateUrl } from '../types'

interface Props {
  monitors: MonitorTarget[]
  onEdit: (m: MonitorTarget) => void
  onRemove: (id: number) => void
}

function PulseDot({ isUp }: { isUp: boolean }) {
  return (
    <span style={{
      width: 6, height: 6, borderRadius: '50%', background: 'currentColor', display: 'inline-block',
      animation: isUp ? 'ss-pulse 2s infinite' : undefined,
    }} />
  )
}

function StatusBadge({ isUp }: { isUp: boolean }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '5px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
      background: isUp ? 'rgba(0,229,160,0.1)' : 'rgba(255,77,106,0.1)',
      color: isUp ? '#00E5A0' : '#FF4D6A',
      border: `1px solid ${isUp ? 'rgba(0,229,160,0.25)' : 'rgba(255,77,106,0.25)'}`,
    }}>
      <PulseDot isUp={isUp} />
      {isUp ? 'Online' : 'Offline'}
    </span>
  )
}

function IconBtn({ onClick, danger, title, children }: { onClick: () => void; danger?: boolean; title: string; children: React.ReactNode }) {
  const [hov, setHov] = useState(false)
  return (
    <button onClick={onClick} title={title} aria-label={title}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 6, background: 'transparent', cursor: 'pointer', transition: 'all 0.15s',
        border: hov
          ? danger ? '1px solid rgba(255,77,106,0.4)' : '1px solid #253447'
          : '1px solid #1E2D3D',
        color: hov
          ? danger ? '#FF4D6A' : '#E8EDF5'
          : '#7B8FA6',
        ...(hov && danger ? { background: 'rgba(255,77,106,0.08)' } : {}),
        ...(hov && !danger ? { background: '#1A2332' } : {}),
      }}>
      {children}
    </button>
  )
}

const th: React.CSSProperties = { padding: '11px 16px', textAlign: 'left', fontSize: 11, fontWeight: 500, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#7B8FA6', borderBottom: '1px solid #1E2D3D' }
const td: React.CSSProperties = { padding: '14px 16px', borderBottom: '1px solid #1E2D3D', verticalAlign: 'middle' }

export function MonitorTable({ monitors, onEdit, onRemove }: Props) {
  return (
    <>
      <style>{`@keyframes ss-pulse { 0%{box-shadow:0 0 0 0 rgba(0,229,160,0.5)} 70%{box-shadow:0 0 0 5px rgba(0,229,160,0)} 100%{box-shadow:0 0 0 0 rgba(0,229,160,0)} }`}</style>
      <div style={{ background: '#111827', border: '1px solid #1E2D3D', borderRadius: 12, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead style={{ background: '#1A2332' }}>
            <tr>
              <th style={th}>Site / URL</th>
              <th style={th}>Intervalo</th>
              <th style={th}>Última Checagem</th>
              <th style={th}>Status</th>
              <th style={{ ...th, width: 80 }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {monitors.length === 0 ? (
              <tr><td colSpan={5}>
                <div style={{ textAlign: 'center', padding: '60px 24px', color: '#7B8FA6' }}>
                  <div style={{ fontSize: 40, marginBottom: 16, opacity: 0.4 }}>📡</div>
                  <p style={{ fontSize: 15, marginBottom: 8, color: '#E8EDF5' }}>Nenhum monitor configurado</p>
                  <p style={{ fontSize: 13 }}>Clique em "Novo Monitor" para começar.</p>
                </div>
              </td></tr>
            ) : monitors.map((m, i) => {
              const last = i === monitors.length - 1
              return (
                <tr key={m.id}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ ...td, ...(last ? { borderBottom: 'none' } : {}) }}>
                    <div style={{ fontWeight: 500, color: '#E8EDF5' }}>{m.name}</div>
                    <a href={m.url} target="_blank" rel="noopener noreferrer"
                      style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#4A9EE0', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                      <Link size={10} />{truncateUrl(m.url)}
                    </a>
                  </td>
                  <td style={{ ...td, ...(last ? { borderBottom: 'none' } : {}) }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: '#7B8FA6' }}>⟳ {formatInterval(m.checkInterval)}</span>
                  </td>
                  <td style={{ ...td, ...(last ? { borderBottom: 'none' } : {}) }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: '#7B8FA6' }}>{formatRelative(m.lastCheck)}</span>
                  </td>
                  <td style={{ ...td, ...(last ? { borderBottom: 'none' } : {}) }}>
                    <StatusBadge isUp={m.isUp} />
                  </td>
                  <td style={{ ...td, ...(last ? { borderBottom: 'none' } : {}) }}>
                    <div style={{ display: 'flex', gap: 6 }}>
                      <IconBtn onClick={() => onEdit(m)} title="Editar monitor"><Pencil size={13} /></IconBtn>
                      <IconBtn onClick={() => onRemove(m.id)} title="Remover monitor" danger><Trash2 size={13} /></IconBtn>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
