# StatusSentry — Frontend

## Estrutura do projeto

```
statussentry/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── SpaController.java          ← copie para o seu Spring Boot
└── src/
    ├── main.tsx                ← entry point
    ├── App.tsx                 ← roteamento entre telas
    ├── types/
    │   └── index.ts            ← interfaces, enums, helpers
    ├── hooks/
    │   └── useMonitors.ts      ← estado dos targets
    ├── components/
    │   ├── DashboardSummary.tsx
    │   ├── MonitorTable.tsx
    │   └── AddMonitorModal.tsx
    └── pages/
        ├── DashboardPage.tsx
        └── VerifyAccountPage.tsx
```

---

## Passo a passo completo

### 1. Instalar dependências e rodar em dev
```bash
cd statussentry
npm install
npm run dev
# Abre em http://localhost:5173
```

### 2. Gerar build de produção
```bash
npm run build
# Gera a pasta dist/ com os arquivos estáticos
```

### 3. Copiar para o Spring Boot
```bash
# Copie o CONTEÚDO de dist/ para:
# src/main/resources/static/

cp -r dist/* ../seu-projeto-spring/src/main/resources/static/
```

### 4. Adicionar o SpaController ao Spring Boot
Copie o arquivo `SpaController.java` para o pacote de controllers do seu projeto.
Ajuste o `package` no topo do arquivo conforme a estrutura do seu projeto.

Isso é necessário para que o Spring Boot redirecione qualquer URL
para o `index.html`, deixando o React Router funcionar corretamente.

---

## Integrando com a sua API Spring Boot

Todos os pontos de integração estão marcados com `// TODO:` nos arquivos.

### useMonitors.ts — CRUD de targets
```ts
// Troque os mocks pelas chamadas reais:
const res = await api.post<MonitorTarget>('/targets', data)
setMonitors((prev) => [...prev, res.data])
```

### App.tsx — Autenticação
```ts
// Substitua o MOCK_USER pelo retorno do seu endpoint de login:
const { data: user } = await api.post<AuthResponse>('/auth/login', credentials)
```

### VerifyAccountPage.tsx — Verificação de e-mail
```ts
onVerify={async ({ verificationCode }) => {
  await api.post('/auth/verify', { verificationCode })
  navigate('/dashboard')
}}
```

---

## Variáveis de ambiente (opcional)

Crie um `.env` na raiz do projeto para apontar para a API:

```env
VITE_API_URL=http://localhost:8080/api
```

E use no código:
```ts
const BASE_URL = import.meta.env.VITE_API_URL
```

---

## Demo interativa

- Clique no badge **FREE/PREMIUM** no canto superior direito para alternar o plano e ver a regra de intervalo do modal mudar em tempo real.
- Na tela de verificação, o código `123456` é aceito como válido no widget de preview.

---

## Paleta de cores

| Token         | Hex        | Uso                        |
|---------------|------------|----------------------------|
| `bg`          | `#0A0E1A`  | Fundo geral                |
| `surface`     | `#111827`  | Cards e header             |
| `surface2`    | `#1A2332`  | Thead, estados hover       |
| `accent`      | `#00E5A0`  | Online, CTA, foco          |
| `danger`      | `#FF4D6A`  | Offline, erros             |
| `warning`     | `#FFC107`  | Hint de upgrade            |
| `info`        | `#4A9EE0`  | Links de URL               |
| `muted`       | `#7B8FA6`  | Texto secundário           |
