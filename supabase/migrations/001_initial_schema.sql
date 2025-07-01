-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Tabela de usuários (estende auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro')),
  reimbursements_used INTEGER DEFAULT 0,
  reimbursements_limit INTEGER DEFAULT 1,
  has_health_plan BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de planos de saúde
CREATE TABLE public.health_plans (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  provider TEXT NOT NULL,
  plan_name TEXT NOT NULL,
  card_number TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de dependentes
CREATE TABLE public.dependents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  relationship TEXT NOT NULL,
  birth_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de tipos de reembolso
CREATE TABLE public.reimbursement_types (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  description TEXT,
  active BOOLEAN DEFAULT true,
  required_documents JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de reembolsos
CREATE TABLE public.reimbursements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL,
  patient TEXT NOT NULL,
  date DATE NOT NULL,
  value DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'iniciar' CHECK (status IN ('iniciar', 'documentos', 'pronto', 'enviado', 'complementar', 'aprovado', 'reprovado', 'pago')),
  plan TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de documentos
CREATE TABLE public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  reimbursement_id UUID REFERENCES public.reimbursements(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_health_plans_updated_at BEFORE UPDATE ON public.health_plans FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_dependents_updated_at BEFORE UPDATE ON public.dependents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reimbursement_types_updated_at BEFORE UPDATE ON public.reimbursement_types FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reimbursements_updated_at BEFORE UPDATE ON public.reimbursements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Inserir tipos de reembolso padrão
INSERT INTO public.reimbursement_types (name, category, subcategory, description, required_documents) VALUES
('Consulta Médica - Consultório', 'Consulta Médica', 'Presencial', 'Consulta médica realizada em consultório físico', '["Nota Fiscal", "Comprovante de Pagamento"]'),
('Consulta Médica - Online', 'Consulta Médica', 'Telemedicina', 'Consulta médica realizada por telemedicina', '["Nota Fiscal", "Comprovante de Pagamento", "Comprovante de Consulta Online"]'),
('Fisioterapia', 'Terapias', null, 'Sessões de fisioterapia', '["Nota Fiscal", "Encaminhamento Médico", "Comprovante de Pagamento", "Relatório do Prestador"]'),
('Terapia Ocupacional', 'Terapias', null, 'Sessões de terapia ocupacional', '["Nota Fiscal", "Encaminhamento Médico", "Comprovante de Pagamento"]'),
('Fonoaudiologia', 'Terapias', null, 'Sessões de fonoaudiologia', '["Nota Fiscal", "Encaminhamento Médico", "Comprovante de Pagamento"]'),
('Psicoterapia', 'Terapias', null, 'Sessões de psicoterapia', '["Nota Fiscal", "Comprovante de Pagamento"]'),
('Exames Laboratoriais', 'Exames', null, 'Exames de sangue, urina e outros laboratoriais', '["Nota Fiscal", "Pedido Médico", "Comprovante de Pagamento"]');
