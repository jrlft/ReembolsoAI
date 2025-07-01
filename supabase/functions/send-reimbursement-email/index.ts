import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Deno } from "https://deno.land/std@0.168.0/node/global.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { reimbursementId } = await req.json()

    const supabase = createClient(Deno.env.get("SUPABASE_URL") ?? "", Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "")

    // Buscar dados do reembolso
    const { data: reimbursement, error } = await supabase
      .from("reimbursements")
      .select(`
        *,
        documents (*),
        users (name, email)
      `)
      .eq("id", reimbursementId)
      .single()

    if (error) throw error

    // TODO: Implementar envio via Amazon SES ou Gmail API
    // Exemplo com Amazon SES:
    /*
    const ses = new AWS.SES({
      region: 'us-east-1',
      accessKeyId: Deno.env.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: Deno.env.get('AWS_SECRET_ACCESS_KEY'),
    })

    const params = {
      Source: 'noreply@reemborsofacil.com',
      Destination: {
        ToAddresses: [reimbursement.users.email],
      },
      Message: {
        Subject: {
          Data: `Reembolso ${reimbursement.id} - Documentos`,
        },
        Body: {
          Html: {
            Data: generateEmailHTML(reimbursement),
          },
        },
      },
      Attachments: reimbursement.documents.map(doc => ({
        Filename: doc.name,
        Content: await getDocumentContent(doc.url),
      })),
    }

    await ses.sendEmail(params).promise()
    */

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    })
  }
})
