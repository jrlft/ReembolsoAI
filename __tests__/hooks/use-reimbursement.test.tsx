import type React from "react"
import { renderHook, act } from "@testing-library/react"
import { useReimbursement, ReimbursementProvider } from "@/contexts/reimbursement-context"
import jest from "jest" // Declare jest variable
import { reimbursementAPI } from "@/lib/api/reimbursements" // Import reimbursementAPI

// Mock do reimbursementAPI
jest.mock("@/lib/api/reimbursements", () => ({
  reimbursementAPI: {
    getAll: jest.fn(),
    create: jest.fn(),
    updateStatus: jest.fn(),
    uploadDocument: jest.fn(),
    sendByEmail: jest.fn(),
    downloadZip: jest.fn(),
  },
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ReimbursementProvider>{children}</ReimbursementProvider>
)

describe("useReimbursement", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("should create reimbursement successfully", async () => {
    const mockReimbursement = {
      id: "1",
      type: "Consulta Médica",
      patient: "João Silva",
      value: 100,
      status: "iniciar",
    }

    reimbursementAPI.create.mockResolvedValue(mockReimbursement)

    const { result } = renderHook(() => useReimbursement(), { wrapper })

    await act(async () => {
      await result.current.createReimbursement({
        type: "Consulta Médica",
        patient: "João Silva",
        date: "2024-01-15",
        value: 100,
        plan: "Unimed",
      })
    })

    expect(reimbursementAPI.create).toHaveBeenCalledWith({
      type: "Consulta Médica",
      patient: "João Silva",
      date: "2024-01-15",
      value: 100,
      plan: "Unimed",
    })
  })

  it("should update reimbursement status", async () => {
    reimbursementAPI.updateStatus.mockResolvedValue(undefined)

    const { result } = renderHook(() => useReimbursement(), { wrapper })

    await act(async () => {
      await result.current.updateReimbursementStatus("1", "aprovado")
    })

    expect(reimbursementAPI.updateStatus).toHaveBeenCalledWith("1", "aprovado")
  })

  it("should handle upload document with compression", async () => {
    reimbursementAPI.uploadDocument.mockResolvedValue(undefined)

    const { result } = renderHook(() => useReimbursement(), { wrapper })

    const mockFile = new File(["test"], "test.jpg", { type: "image/jpeg" })

    await act(async () => {
      await result.current.uploadDocument("1", mockFile, "nota_fiscal")
    })

    expect(reimbursementAPI.uploadDocument).toHaveBeenCalledWith("1", mockFile, "nota_fiscal")
    expect(reimbursementAPI.uploadDocument).toHaveBeenCalled()
  })
})
