// TODO: Configuração do Supabase
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Row Level Security (RLS) policies devem ser configuradas no Supabase:
/*
-- Política para tabela de usuários
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Política para tabela de reembolsos
CREATE POLICY "Users can view own reimbursements" ON reimbursements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reimbursements" ON reimbursements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Política para storage de documentos
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'reimbursement-documents' AND auth.uid()::text = (storage.foldername(name))[1]);
*/
