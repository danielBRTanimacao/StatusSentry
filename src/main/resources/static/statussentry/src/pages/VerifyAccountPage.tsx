import React, { useRef, useState, useEffect, useCallback } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { VerifyAccountRequest } from '../types'

interface Props {
  email: string
  onVerify: (payload: VerifyAccountRequest) => Promise<void>
  onResend: () => Promise<void>
}

const RESEND_COOLDOWN = 60

export function VerifyAccountPage({ email, onVerify, onResend }: Props) {
  const [digits, setDigits]   = useState<string[]>(Array(6).fill(''))
  const [error, setError]     = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => { inputRefs.current[0]?.focus() }, [])

  useEffect(() => {
    if (cooldown <= 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const handleChange = useCallback((i: number, value: string) => {
    const digit = value.replace(/[^0-9]/g, '').slice(-1)
    setError(null)
    setDigits((prev) => { const n = [...prev]; n[i] = digit; return n })
    if (digit && i < 5) inputRefs.current[i + 1]?.focus()
  }, [])

  const handleKeyDown = useCallback((i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      setDigits((prev) => { const n = [...prev]; n[i - 1] = ''; return n })
      inputRefs.current[i - 1]?.focus()
    }
    if (e.key === 'Enter') handleSubmit()
  }, [digits])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/[^0-9]/g, '').slice(0, 6)
    const next = Array(6).fill('')
    pasted.split('').forEach((c, i) => { next[i] = c })
    setDigits(next)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }, [])

  async function handleSubmit() {
    const code = digits.join('')
    if (code.length < 6) { setError('Digite todos os 6 dígitos do código.'); return }
    setLoading(true); setError(null)
    try {
      await onVerify({ verificationCode: code })
      setSuccess(true)
    } catch {
      setError('Código inválido ou expirado. Tente novamente.')
      setDigits(Array(6).fill(''))
      inputRefs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  async function handleResend() {
    if (cooldown > 0) return
    setCooldown(RESEND_COOLDOWN)
    try { await onResend() } catch { setError('Falha ao reenviar. Tente novamente.') }
  }

  const digitStyle = (i: number): React.CSSProperties => ({
    width: 52, height: 64, background: '#0A0E1A', borderRadius: 10,
    color: '#E8EDF5', fontFamily: "'JetBrains Mono',monospace", fontSize: 24, fontWeight: 500,
    textAlign: 'center', outline: 'none', caretColor: '#00E5A0', transition: 'border-color 0.15s, box-shadow 0.15s',
    border: error ? '1px solid rgba(255,77,106,0.6)' : digits[i] ? '1px solid rgba(0,229,160,0.4)' : '1px solid #253447',
  })

  return (
    <div style={{ minHeight: '100vh', background: '#0A0E1A', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, fontFamily: "'Inter',sans-serif" }}>
      <div style={{ background: '#111827', border: '1px solid #253447', borderRadius: 20, padding: '48px 40px', width: '100%', maxWidth: 420, textAlign: 'center' }}>
        {!success ? (
          <>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(0,229,160,0.1)', border: '1px solid rgba(0,229,160,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 26 }}>✉</div>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: '#E8EDF5', marginBottom: 10 }}>Confirme seu e-mail</h1>
            <p style={{ fontSize: 14, color: '#7B8FA6', lineHeight: 1.6, marginBottom: 32 }}>
              Enviamos um código de 6 dígitos para{' '}
              <strong style={{ color: '#E8EDF5', fontWeight: 500 }}>{email}</strong>.
              <br />Digite abaixo para ativar sua conta.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 24 }} onPaste={handlePaste}>
              {digits.map((digit, i) => (
                <input key={i} ref={(el) => { inputRefs.current[i] = el }}
                  type="text" inputMode="numeric" pattern="[0-9]" maxLength={1} value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  aria-label={`Dígito ${i + 1}`}
                  style={digitStyle(i)} />
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#FF4D6A', minHeight: 18, marginBottom: 12 }} role="alert">{error ?? ''}</p>
            <button onClick={handleSubmit} disabled={loading}
              style={{ width: '100%', padding: '12px 0', borderRadius: 8, background: loading ? 'rgba(0,229,160,0.5)' : '#00E5A0', border: 'none', color: '#0A0E1A', fontFamily: "'Inter',sans-serif", fontSize: 14, fontWeight: 600, cursor: loading ? 'wait' : 'pointer' }}>
              {loading ? 'Verificando…' : 'Verificar Conta'}
            </button>
            <p style={{ fontSize: 13, color: '#7B8FA6', marginTop: 20 }}>
              Não recebeu o código?{' '}
              {cooldown > 0
                ? <span>Reenviar em <strong style={{ color: '#E8EDF5' }}>{cooldown}s</strong></span>
                : <button onClick={handleResend} style={{ background: 'none', border: 'none', color: '#00E5A0', fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0 }}>Reenviar código</button>
              }
            </p>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, padding: '20px 0' }}>
            <CheckCircle2 size={56} color="#00E5A0" strokeWidth={1.5} />
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#E8EDF5' }}>Conta verificada!</h2>
            <p style={{ fontSize: 14, color: '#7B8FA6', lineHeight: 1.6 }}>
              Seu e-mail foi confirmado com sucesso.<br />Você será redirecionado ao dashboard.
            </p>
            <div style={{ width: '100%', height: 3, background: '#1A2332', borderRadius: 99, marginTop: 8, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#00E5A0', animation: 'ss-progress 2.5s linear forwards' }} />
            </div>
            <style>{`@keyframes ss-progress { from{width:0%} to{width:100%} }`}</style>
          </div>
        )}
      </div>
    </div>
  )
}
