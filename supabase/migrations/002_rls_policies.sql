-- Habilitar RLS em todas as tabelas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dependents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reimbursement_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reimbursements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- Políticas para users
CREATE POLICY "Users can view own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para health_plans
CREATE POLICY "Users can view own health plans" ON public.health_plans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health plans" ON public.health_plans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health plans" ON public.health_plans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own health plans" ON public.health_plans
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para dependents
CREATE POLICY "Users can view own dependents" ON public.dependents
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own dependents" ON public.dependents
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own dependents" ON public.dependents
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own dependents" ON public.dependents
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para reimbursement_types (todos podem ler)
CREATE POLICY "Anyone can view reimbursement types" ON public.reimbursement_types
  FOR SELECT USING (true);

-- Políticas para reimbursements
CREATE POLICY "Users can view own reimbursements" ON public.reimbursements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reimbursements" ON public.reimbursements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reimbursements" ON public.reimbursements
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reimbursements" ON public.reimbursements
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para documents
CREATE POLICY "Users can view own documents" ON public.documents
  FOR SELECT USING (
    auth.uid() = (
      SELECT user_id FROM public.reimbursements 
      WHERE id = reimbursement_id
    )
  );

CREATE POLICY "Users can insert own documents" ON public.documents
  FOR INSERT WITH CHECK (
    auth.uid() = (
      SELECT user_id FROM public.reimbursements 
      WHERE id = reimbursement_id
    )
  );

CREATE POLICY "Users can update own documents" ON public.documents
  FOR UPDATE USING (
    auth.uid() = (
      SELECT user_id FROM public.reimbursements 
      WHERE id = reimbursement_id
    )
  );

CREATE POLICY "Users can delete own documents" ON public.documents
  FOR DELETE USING (
    auth.uid() = (
      SELECT user_id FROM public.reimbursements 
      WHERE id = reimbursement_id
    )
  );
