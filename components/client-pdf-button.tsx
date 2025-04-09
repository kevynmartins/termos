"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface ClientPDFButtonProps {
  formData: {
    nomeFunc: string
    cpfFunc: string
    numSerie: string
    data: string
  }
  formattedDate: string
  isValid: boolean
}

export default function ClientPDFButton({ formData, formattedDate, isValid }: ClientPDFButtonProps) {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const generatePDF = async () => {
    if (!isValid) return

    setIsLoading(true)

    try {
      // Dynamically import the PDF generation libraries only on client side
      const { pdf } = await import("@react-pdf/renderer")

      // Import our PDF component
      const TermoPDFModule = await import("./termo-pdf-content")
      const TermoPDF = TermoPDFModule.default

      // Create the PDF document
      const blob = await pdf(<TermoPDF formData={formData} formattedDate={formattedDate} />).toBlob()

      // Create a URL for the blob
      const url = URL.createObjectURL(blob)

      // Create a temporary link element to trigger the download
      const link = document.createElement("a")
      link.href = url
      link.download = "termo-responsabilidade.pdf"
      document.body.appendChild(link)
      link.click()

      // Clean up
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return (
      <Button className="w-full" disabled>
        Carregando...
      </Button>
    )
  }

  return (
    <Button className="w-full" disabled={isLoading || !isValid} onClick={generatePDF}>
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Gerando PDF...
        </>
      ) : (
        "Baixar PDF"
      )}
    </Button>
  )
}

