import React, { useState } from 'react'
import { DashboardPage } from './pages/DashboardPage'
import { VerifyAccountPage } from './pages/VerifyAccountPage'
import { PlanType, User } from './types'

// ─── Mock do usuário autenticado ─────────────────────────────
// Substitua por dados reais vindos do seu endpoint de login
const MOCK_USER: User = {
  id: 'uuid-001',
  username: 'João Silva',
  email: 'joao@statusSentry.dev',
  verified: false,       // false = vai cair na tela de verificação
  plan: PlanType.FREE,
}

type Screen = 'verify' | 'dashboard'

export default function App() {
  const [user, setUser] = useState<User>(MOCK_USER)
  const [screen, setScreen] = useState<Screen>(
    MOCK_USER.verified ? 'dashboard' : 'verify'
  )

  // Callback chamado após verificação bem-sucedida
  async function handleVerify() {
    // TODO: await api.post('/auth/verify', { verificationCode })
    setUser((u) => ({ ...u, verified: true }))
    setScreen('dashboard')
  }

  // Callback de reenvio de código
  async function handleResend() {
    // TODO: await api.post('/auth/resend-verification')
    console.log('Reenviar código para', user.email)
  }

  if (screen === 'verify') {
    return (
      <VerifyAccountPage
        email={user.email}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    )
  }

  return <DashboardPage user={user} />
}
