-- Criar bucket para documentos de reembolso
INSERT INTO storage.buckets (id, name, public) VALUES ('reimbursement-documents', 'reimbursement-documents', false);

-- Política de storage para upload
CREATE POLICY "Users can upload own documents" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'reimbursement-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política de storage para visualização
CREATE POLICY "Users can view own documents" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'reimbursement-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política de storage para atualização
CREATE POLICY "Users can update own documents" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'reimbursement-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Política de storage para exclusão
CREATE POLICY "Users can delete own documents" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'reimbursement-documents' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
