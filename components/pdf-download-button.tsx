"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

// Dynamically import PDFDownloadLink with SSR disabled
const PDFDownloadLink = dynamic(() => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink), { ssr: false })

// Dynamically import the PDF component
const TermoPDF = dynamic(() => import("./termo-pdf"), { ssr: false })

interface PDFDownloadButtonProps {
  formData: {
    nomeFunc: string
    cpfFunc: string
    numSerie: string
    data: string
  }
  formattedDate: string
  isValid: boolean
}

export default function PDFDownloadButton({ formData, formattedDate, isValid }: PDFDownloadButtonProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <Button className="w-full" disabled>
        Carregando...
      </Button>
    )
  }

  return (
    <PDFDownloadLink
      document={<TermoPDF formData={formData} formattedDate={formattedDate} />}
      fileName="termo-responsabilidade.pdf"
      className="w-full"
    >
      {({ loading }) => (
        <Button className="w-full" disabled={loading || !isValid}>
          {loading ? "Gerando PDF..." : "Baixar PDF"}
        </Button>
      )}
    </PDFDownloadLink>
  )
}

