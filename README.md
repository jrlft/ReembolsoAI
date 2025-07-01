# ReembolsoFácil - Sistema de Gestão de Reembolsos Médicos

Protótipo de aplicação web mobile-first desenvolvida em Next.js 14 com React 18, Tailwind CSS e shadcn/ui, preparada para conversão via Capacitor.

## 🚀 Funcionalidades Implementadas

### ✅ Layout Responsivo
- **Breakpoints**: xs (475px), sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Mobile-first**: Design otimizado para dispositivos móveis
- **Preview integrado**: Interface adaptável para todos os tamanhos de tela

### ✅ Autenticação
- **Tela de login**: E-mail/senha com validação
- **Registro de usuários**: Cadastro completo
- **JWT**: Gerenciamento de tokens (preparado para backend)

### ✅ Dashboard Kanban
- **7 colunas drag-and-drop**:
  1. Iniciar Reembolso
  2. Adicionando Documentos  
  3. Documentos Prontos
  4. Enviado à Seguradora
  5. Documentação Complementar
  6. Aprovado/Reprovado
  7. Pago
- **Acessibilidade**: Suporte completo a leitores de tela
- **Filtros**: Busca, plano de saúde, dependente

### ✅ Wizard de Reembolso
- **3 etapas**: Informações → Documentos → Revisão
- **Tipos disponíveis**:
  - Consulta médica presencial
  - Consulta online
  - Fisioterapia
  - Terapia ocupacional
  - Fonoaudiologia
  - Psicoterapia
  - Opção "Cadastrar novo tipo"
- **Seleção**: Plano de saúde e dependente

### ✅ Upload de Documentos
- **Compressão automática**: ≤ 900 KB
- **Renomeação inteligente**: tipo_documento + ID_reembolso
- **Tipos suportados**: Pagamento, pedido médico, relatório, nota fiscal
- **Ações**: Enviar por e-mail ou baixar ZIP

### ✅ Drawer Lateral
- **Seções organizadas**: Planos, Dependentes, Reembolsos
- **Touch-friendly**: Gestos otimizados para mobile
- **Responsivo**: Drawer mobile + sidebar desktop

## 🔧 Integrações Preparadas

### Backend FastAPI/Python
\`\`\`typescript
// Endpoints mockados prontos para integração
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Exemplos de chamadas REST com JWT
await fetch(`${API_BASE_URL}/auth/login`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({ email, password }),
})
\`\`\`

### Supabase
\`\`\`typescript
// Configuração completa com RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Políticas RLS preparadas para:
// - users: acesso próprios dados
// - reimbursements: CRUD por usuário
// - storage: upload documentos seguros
\`\`\`

### Stripe (Freemium)
\`\`\`typescript
// Planos configurados
const STRIPE_PRICES = {
  monthly: "price_1234567890", // R$ 29/mês
  yearly: "price_0987654321",  // R$ 300/ano
}

// Checkout preparado
await createCheckoutSession(STRIPE_PRICES.monthly)
\`\`\`

### Email Services
\`\`\`typescript
// Amazon SES
await reimbursementAPI.sendByEmail(reimbursementId)

// Gmail API (alternativa)
await reimbursementAPI.sendByGmail(reimbursementId)
\`\`\`

### Analytics
\`\`\`html
<!-- Meta Pixel: 581961359233767 -->
<script>
  fbq('init', '581961359233767');
  fbq('track', 'PageView');
</script>

<!-- Google Ads: AW-10888031582 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-10888031582"></script>
\`\`\`

## 🧪 Testes

### Jest + React Testing Library
\`\`\`bash
npm run test          # Executar testes
npm run test:watch    # Modo watch
npm run test:coverage # Relatório de cobertura
\`\`\`

### Cobertura Configurada
- **Mínimo**: 70% (branches, functions, lines, statements)
- **Componentes**: Todos testados
- **Hooks**: Contextos e APIs mockados
- **Utils**: Funções auxiliares cobertas

## 📱 Preparação Capacitor

### Configurações Mobile-Ready
\`\`\`typescript
// Touch targets mínimo 44px
className="min-h-[44px] min-w-[44px]"

// Safe area insets
className="pt-safe-top pb-safe-bottom"

// Scroll otimizado
className="overflow-y-auto overscroll-contain"
\`\`\`

### Recursos Nativos Preparados
- **Camera**: Placeholder para captura de documentos
- **File System**: Upload e compressão
- **Push Notifications**: Estrutura preparada
- **Deep Links**: Navegação configurada

## 🚀 Como Executar

### Desenvolvimento
\`\`\`bash
npm install
npm run dev
\`\`\`

### Produção
\`\`\`bash
npm run build
npm start
\`\`\`

### Variáveis de Ambiente
\`\`\`bash
cp .env.example .env.local
# Configure suas chaves de API
\`\`\`

## 📋 Checklist de Implementação

### ✅ Concluído
- [x] Layout responsivo completo
- [x] Sistema de autenticação
- [x] Dashboard Kanban drag-and-drop
- [x] Wizard de criação de reembolsos
- [x] Upload com compressão
- [x] Drawer lateral tocável
- [x] Modal de plano obrigatório
- [x] Hooks de API mockados
- [x] Testes unitários configurados
- [x] Integração analytics preparada
- [x] Estrutura Capacitor-ready

### 🔄 Próximos Passos
- [ ] Conectar backend FastAPI
- [ ] Configurar Supabase RLS
- [ ] Implementar Stripe checkout
- [ ] Configurar Amazon SES/Gmail
- [ ] Deploy e CI/CD
- [ ] Conversão Capacitor

## 🏗️ Arquitetura

\`\`\`
src/
├── app/                 # Next.js App Router
├── components/          # Componentes React
│   ├── auth/           # Autenticação
│   ├── dashboard/      # Dashboard
│   ├── kanban/         # Board Kanban
│   ├── layout/         # Layout components
│   └── ui/             # shadcn/ui components
├── contexts/           # React Context (estado global)
├── lib/                # Utilitários e APIs
│   ├── api/           # Chamadas de API
│   └── utils/         # Funções auxiliares
├── types/              # TypeScript types
└── __tests__/          # Testes unitários
\`\`\`

## 📄 Licença

Este é um protótipo para demonstração. Todos os direitos reservados.
