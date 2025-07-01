"use client"

import { ArrowLeft, MessageCircle, Mail, Phone, Book, Video } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { User, Page } from "@/app/page"

interface HelpPageProps {
  user: User
  onNavigate: (page: Page) => void
}

export function HelpPage({ user, onNavigate }: HelpPageProps) {
  const faqItems = [
    {
      question: "Como criar um novo reembolso?",
      answer:
        "Clique em 'Novo Reembolso' no menu principal, preencha as informações solicitadas e anexe os documentos necessários.",
    },
    {
      question: "Quais documentos são necessários?",
      answer: "Geralmente você precisa do recibo/nota fiscal, relatório médico e carteirinha do plano de saúde.",
    },
    {
      question: "Quanto tempo demora para ser aprovado?",
      answer: "O tempo varia conforme o plano de saúde, mas geralmente entre 5 a 15 dias úteis.",
    },
    {
      question: "Posso acompanhar o status do meu reembolso?",
      answer: "Sim! Na página 'Reembolsos' você pode ver o status atual de cada solicitação.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => onNavigate("dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Central de Ajuda</h1>
          <p className="text-gray-600">Encontre respostas e entre em contato conosco</p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Chat Online</h3>
            <p className="text-sm text-gray-600 mb-4">Fale conosco em tempo real</p>
            <Button size="sm">Iniciar Chat</Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Email</h3>
            <p className="text-sm text-gray-600 mb-4">Envie sua dúvida por email</p>
            <Button size="sm" variant="outline">
              Enviar Email
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Telefone</h3>
            <p className="text-sm text-gray-600 mb-4">(11) 3000-0000</p>
            <Button size="sm" variant="outline">
              Ligar Agora
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Resources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Guias e Tutoriais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              Como usar o ReembolsoFácil
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Documentos necessários por tipo
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Dicas para aprovação rápida
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Gerenciando dependentes
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5" />
              Vídeos Explicativos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="ghost" className="w-full justify-start">
              Criando seu primeiro reembolso
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Fotografando documentos
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Acompanhando o status
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              Recursos do plano Pro
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ */}
      <Card>
        <CardHeader>
          <CardTitle>Perguntas Frequentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqItems.map((item, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0">
              <h4 className="font-medium mb-2">{item.question}</h4>
              <p className="text-sm text-gray-600">{item.answer}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
