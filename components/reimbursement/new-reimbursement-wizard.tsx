"use client"

import { useState } from "react"
import { useReimbursement } from "@/contexts/reimbursement-context"
import { WizardStep1 } from "./wizard-steps/wizard-step-1"
import { WizardStep2 } from "./wizard-steps/wizard-step-2"
import { WizardStep3 } from "./wizard-steps/wizard-step-3"
import { WizardProgress } from "./wizard-progress"
import type { Page } from "@/components/main-app"
import type { ReimbursementFormData } from "@/types"

interface NewReimbursementWizardProps {
  onNavigate: (page: Page) => void
}

export function NewReimbursementWizard({ onNavigate }: NewReimbursementWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ReimbursementFormData>({
    type: "",
    patient: "",
    date: "",
    value: 0,
    plan: "",
    description: "",
  })
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const { createReimbursement, isLoading } = useReimbursement()

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    try {
      await createReimbursement(formData)

      // TODO: Upload dos arquivos após criar o reembolso
      // for (const file of uploadedFiles) {
      //   await uploadDocument(reimbursementId, file, getDocumentType(file))
      // }

      onNavigate("reimbursements")
    } catch (error) {
      console.error("Erro ao criar reembolso:", error)
      // TODO: Mostrar toast de erro
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <WizardStep1
            formData={formData}
            onFormDataChange={setFormData}
            onNext={handleNext}
            onCancel={() => onNavigate("dashboard")}
          />
        )
      case 2:
        return (
          <WizardStep2
            formData={formData}
            uploadedFiles={uploadedFiles}
            onFilesChange={setUploadedFiles}
            onNext={handleNext}
            onPrevious={handlePrevious}
            onCancel={() => onNavigate("dashboard")}
          />
        )
      case 3:
        return (
          <WizardStep3
            formData={formData}
            uploadedFiles={uploadedFiles}
            onSubmit={handleSubmit}
            onPrevious={handlePrevious}
            onCancel={() => onNavigate("dashboard")}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">Novo Reembolso</h1>
        <p className="text-gray-600">Preencha as informações para solicitar seu reembolso</p>
      </div>

      {/* Progress */}
      <WizardProgress currentStep={currentStep} totalSteps={3} />

      {/* Step Content */}
      {renderStep()}
    </div>
  )
}
