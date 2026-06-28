import React, { useState, useEffect, useRef, useCallback } from 'react'
import { X, CirclePlus, Zap } from 'lucide-react'
import { PlanType, CreateTargetRequest, INTERVALS_BY_PLAN, ALL_INTERVALS, formatInterval } from '../types'

interface Props {
  isOpen: boolean
  plan: PlanType
  onClose: () => void
  onSubmit: (data: CreateTargetRequest) => Promise<void>
}

const inputBase: React.CSSProperties = {
  width: '100%', background: '#0A0E1A', border: '1px solid #253447',
  borderRadius: 8, color: '#E8EDF5', fontFamily: "'Inter',sans-serif",
  fontSize: 14, padding: '10px 14px', outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#7B8FA6', marginBottom: 7, letterSpacing: '0.3px', textTransform: 'uppercase' as const }}>
        {label}
      </label>
      {children}
    </div>
  )
}

export function AddMonitorModal({ isOpen, plan, onClose, onSubmit }: Props) {
  const [name, setName]         = useState('')
  const [url, setUrl]           = useState('')
  const [interval, setInterval] = useState(plan === PlanType.FREE ? 15 : 1)
  const [errors, setErrors]     = useState<{ name?: string; url?: string }>({})
  const [loading, setLoading]   = useState(false)
  const [nameFocused, setNameFocused] = useState(false)
  const [urlFocused,  setUrlFocused]  = useState(false)
  const nameRef = useRef<HTMLInputElement>(null)

  const allowed = INTERVALS_BY_PLAN[plan]
  const isFree  = plan === PlanType.FREE

  useEffect(() => {
    if (isOpen) {
      setName(''); setUrl(''); setErrors({})
      setInterval(isFree ? 15 : 1)
      setTimeout(() => nameRef.current?.focus(), 80)
    }
  }, [isOpen])

  useEffect(() => {
    if (!allowed.includes(interval)) setInterval(allowed[0])
  }, [plan])

  function validate() {
    const e: { name?: string; url?: string } = {}
    if (!name.trim()) e.name = 'Nome obrigatório'
    if (!url.trim())  e.url  = 'URL obrigatória'
    else if (!/^https?:\/\/.+/.test(url.trim())) e.url = 'URL deve começar com https:// ou http://'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = useCallback(async () => {
    if (!validate()) return
    setLoading(true)
    try {
      await onSubmit({ name: name.trim(), url: url.trim(), checkInterval: interval })
      onClose()
    } finally {
      setLoading(false)
    }
  }, [name, url, interval, onSubmit, onClose])

  if (!isOpen) return null

  return (
    <div
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)', padding: 24 }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') handleSubmit() }}
    >
      <div style={{ background: '#111827', border: '1px solid #253447', borderRadius: 16, padding: 28, width: '100%', maxWidth: 480 }}
        role="dialog" aria-modal="true" aria-labelledby="modal-title">

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h2 id="modal-title" style={{ fontSize: 17, fontWeight: 600, color: '#E8EDF5' }}>Novo Monitor</h2>
            <p style={{ fontSize: 13, color: '#7B8FA6', marginTop: 4 }}>Configure um target para monitoramento contínuo</p>
          </div>
          <button onClick={onClose} aria-label="Fechar"
            style={{ width: 32, height: 32, borderRadius: 8, background: '#1A2332', border: '1px solid #1E2D3D', color: '#7B8FA6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {/* Nome */}
        <Field label="Nome do Site">
          <input ref={nameRef} id="monitor-name" type="text" placeholder="Ex: API de Produção"
            value={name} onChange={(e) => setName(e.target.value)}
            onFocus={() => setNameFocused(true)} onBlur={() => setNameFocused(false)}
            style={{ ...inputBase, ...(nameFocused ? { borderColor: '#00E5A0', boxShadow: '0 0 0 3px rgba(0,229,160,0.1)' } : {}), ...(errors.name ? { borderColor: '#FF4D6A' } : {}) }} />
          {errors.name && <p style={{ fontSize: 12, color: '#FF4D6A', marginTop: 5 }}>{errors.name}</p>}
        </Field>

        {/* URL */}
        <Field label="URL do Site">
          <input id="monitor-url" type="url" placeholder="https://api.seusite.com/health"
            value={url} onChange={(e) => setUrl(e.target.value)}
            onFocus={() => setUrlFocused(true)} onBlur={() => setUrlFocused(false)}
            style={{ ...inputBase, fontFamily: "'JetBrains Mono',monospace", ...(urlFocused ? { borderColor: '#00E5A0', boxShadow: '0 0 0 3px rgba(0,229,160,0.1)' } : {}), ...(errors.url ? { borderColor: '#FF4D6A' } : {}) }} />
          {errors.url
            ? <p style={{ fontSize: 12, color: '#FF4D6A', marginTop: 5 }}>{errors.url}</p>
            : <p style={{ fontSize: 12, color: '#7B8FA6', marginTop: 5 }}>Inclua o protocolo (https://)</p>}
        </Field>

        {/* Intervalo */}
        <Field label="Intervalo de Checagem">
          <select id="monitor-interval" value={interval} onChange={(e) => setInterval(Number(e.target.value))}
            style={{ ...inputBase, appearance: 'none', cursor: 'pointer' }}>
            {ALL_INTERVALS.map((m) => (
              <option key={m} value={m} disabled={!allowed.includes(m)}>
                {`A cada ${formatInterval(m)}`}{!allowed.includes(m) ? ' — Premium' : ''}
              </option>
            ))}
          </select>
          {isFree && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, background: 'rgba(255,193,7,0.06)', border: '1px solid rgba(255,193,7,0.2)', borderRadius: 8, padding: '10px 12px', marginTop: 8 }}>
              <Zap size={14} style={{ color: '#FFC107', flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: 12, color: '#FFC107', lineHeight: 1.5 }}>
                Quer checagens a cada 1 minuto?{' '}
                <strong style={{ fontWeight: 600, textDecoration: 'underline', cursor: 'pointer' }}>
                  Faça upgrade para o Premium
                </strong>{' '}
                e destrave intervalos menores.
              </span>
            </div>
          )}
        </Field>

        {/* Footer */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 28, paddingTop: 20, borderTop: '1px solid #1E2D3D' }}>
          <button onClick={onClose}
            style={{ padding: '9px 16px', borderRadius: 8, background: 'transparent', border: '1px solid #253447', color: '#7B8FA6', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer' }}>
            Cancelar
          </button>
          <button onClick={handleSubmit} disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 16px', borderRadius: 8, background: loading ? 'rgba(0,229,160,0.5)' : '#00E5A0', border: 'none', color: '#0A0E1A', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
            <CirclePlus size={15} />{loading ? 'Criando…' : 'Criar Monitor'}
          </button>
        </div>
      </div>
    </div>
  )
}
