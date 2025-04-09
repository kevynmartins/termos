"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, ArrowLeft } from "lucide-react"
import { branches } from "@/config/branches"
import Link from "next/link"

export default function TermoNotebook() {
  const [formData, setFormData] = useState({
    nomeFunc: "",
    cpfFunc: "",
    marca: "",
    modelo: "",
    numSerie: "",
    outrosItens: "",
    filial: "criciuma",
    data: new Date().toLocaleDateString('en-CA'),
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const documentRef = useRef<HTMLDivElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData(prevState => ({ ...prevState, [name]: value }))
  }

  const isFormValid = Object.values(formData).every(value => value.trim() !== "")

  const generatePDF = async () => {
    if (!isFormValid || !documentRef.current) return

    setIsGenerating(true)

    try {
      const jsPDFModule = await import("jspdf")
      const jsPDF = jsPDFModule.default
      // Create a new PDF document
      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = 210
      const pageHeight = 297

      // Adjust margins and spacing
      const marginLeft = 15
      const marginRight = 15
      const marginTop = 15
      const marginBottom = 15
      const lineSpacing = 5
      const sectionSpacing = 8
      const signatureSpacing = 12
      const witnessSpacing = 8
      const contentWidth = pageWidth - (marginLeft + marginRight)
      const contentHeight = pageHeight - (marginTop + marginBottom)

      const checkNewPage = (currentYPos: number, neededSpace: number) => {
        if (currentYPos + neededSpace > pageHeight - marginBottom) {
          pdf.addPage()
          return marginTop
        }
        return currentYPos
      }

      // Add logo
      const logoImg = new Image()
      logoImg.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        logoImg.onload = resolve
        logoImg.onerror = reject
        logoImg.src = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_delupo-XDZbwDYFMvE2B1wwQp1sZ8HuzhghwO.png"
      })

      const logoWidth = 118.3
      const logoHeight = 37.8
      const logoX = (pageWidth - logoWidth) / 2

      pdf.addImage(logoImg, "PNG", logoX, marginTop, logoWidth, logoHeight)

      let yPos = marginTop + logoHeight + 10

      // Title
      pdf.setFont("cambria", "bold")
      pdf.setFontSize(14)
      const title = "TERMO DE RESPONSABILIDADE PELO USO DE NOTEBOOK DA"
      const title2 = "EMPRESA"

      const titleWidth = (pdf.getStringUnitWidth(title) * 14) / pdf.internal.scaleFactor
      const title2Width = (pdf.getStringUnitWidth(title2) * 14) / pdf.internal.scaleFactor
      pdf.text(title, (pageWidth - titleWidth) / 2, yPos)
      yPos += lineSpacing
      pdf.text(title2, (pageWidth - title2Width) / 2, yPos)
      yPos += sectionSpacing

      // Reset font for body
      pdf.setFont("cambria", "normal")
      pdf.setFontSize(12)

      const selectedBranch = branches.find(b => b.id === formData.filial) || branches[0]

      // Initial paragraph
      yPos = checkNewPage(yPos, 40)
      const paragraph1 = `Pelo presente Termo de Responsabilidade pelo Uso de Notebook da Empresa, de um lado, A. SILVA FERRAGENS LTDA, pessoa jurídica de direito privado, estabelecida à ${selectedBranch.address}, inscrita no CNPJ nº ${selectedBranch.cnpj}, neste ato representada pelo Senhor Alexandro Willemann da Silva, doravante denominada "EMPRESA" e de outro lado, ${(formData.nomeFunc || "NOME DO FUNCIONÁRIO").toUpperCase()}, portador do CPF nº ${formData.cpfFunc || "000.000.000-00"}, doravante denominado FUNCIONÁRIO, tem entre si justo e contratado o que segue:`
      
      const lines1 = pdf.splitTextToSize(paragraph1, contentWidth)
      pdf.text(lines1, marginLeft, yPos)
      yPos += lines1.length * lineSpacing + sectionSpacing

      // CLÁUSULA PRIMEIRA
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA PRIMEIRA – DO EQUIPAMENTO", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      const paragraph2 = "A EMPRESA cede ao FUNCIONÁRIO, para fins de uso exclusivo na execução de suas atividades profissionais, os seguintes equipamentos:"
      const lines2 = pdf.splitTextToSize(paragraph2, contentWidth)
      pdf.text(lines2, marginLeft, yPos)
      yPos += lines2.length * lineSpacing + sectionSpacing

      // Equipment list
      const equipmentText = `- Notebook ${formData.marca} ${formData.modelo}, N° de Série: ${formData.numSerie || "___________________"}`
      const equipmentLines = pdf.splitTextToSize(equipmentText, contentWidth)
      pdf.setFont("cambria", "bold")
      pdf.text(equipmentLines, marginLeft, yPos)
      yPos += equipmentLines.length * lineSpacing

      pdf.setFont("cambria", "normal")
      pdf.text("- Fonte de alimentação", marginLeft, yPos)
      yPos += lineSpacing

      if (formData.outrosItens) {
        const otherItems = pdf.splitTextToSize(`- ${formData.outrosItens}`, contentWidth)
        pdf.text(otherItems, marginLeft, yPos)
        yPos += otherItems.length * lineSpacing
      }
      yPos += sectionSpacing

      // Continue with remaining clauses using the same pattern
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA SEGUNDA – DA RESPONSABILIDADE PELO USO E CONSERVAÇÃO", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      pdf.text("O FUNCIONÁRIO se compromete a:", marginLeft, yPos)
      yPos += lineSpacing

      const paragraph3 = "1. Zelar pela integridade física e funcional dos equipamentos listados na Cláusula Primeira, responsabilizando-se por seu uso e conservação."
      const responsibilityLines = pdf.splitTextToSize(paragraph3, contentWidth)
      pdf.text(responsibilityLines, marginLeft, yPos)
      yPos += responsibilityLines.length * lineSpacing

      pdf.text("2. Não emprestar, alugar, ceder ou permitir o uso dos equipamentos por terceiros.", marginLeft, yPos)
      yPos += lineSpacing

      pdf.text("3. Utilizar os equipamentos exclusivamente para fins profissionais.", marginLeft, yPos)
      yPos += lineSpacing

      pdf.text("4. Não realizar a instalação de programas sem autorização expressa do Departamento de TI.", marginLeft, yPos)
      yPos += sectionSpacing

      // CLÁUSULA TERCEIRA
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA TERCEIRA – DA PROPRIEDADE DO EQUIPAMENTO", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      const paragraph4 = "Os equipamentos descritos na Cláusula Primeira são propriedade exclusiva da EMPRESA, cabendo ao FUNCIONÁRIO apenas sua detenção temporária para fins profissionais, sem qualquer direito de posse definitiva."
      const lines4 = pdf.splitTextToSize(paragraph4, contentWidth)
      pdf.text(lines4, marginLeft, yPos)
      yPos += lines4.length * lineSpacing + sectionSpacing

      // CLÁUSULA QUARTA
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA QUARTA – DA DEVOLUÇÃO E RESPONSABILIDADE POR DANOS", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      const paragraph5 = "1. O FUNCIONÁRIO compromete-se a devolver todos os equipamentos listados na Cláusula Primeira em perfeito estado de funcionamento, excetuando-se o desgaste natural, no mesmo dia de seu desligamento."
      const lines5 = pdf.splitTextToSize(paragraph5, contentWidth)
      pdf.text(lines5, marginLeft, yPos)
      yPos += lines5.length * lineSpacing + lineSpacing

      const paragraph6 = "2. Em caso de danos, extravios ou avarias, decorrentes de negligência ou mau uso, o FUNCIONÁRIO autoriza a EMPRESA a proceder com o desconto em folha de pagamento."
      const lines6 = pdf.splitTextToSize(paragraph6, contentWidth)
      pdf.text(lines6, marginLeft, yPos)
      yPos += lines6.length * lineSpacing + sectionSpacing

      // CLÁUSULA QUINTA
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA QUINTA – DA RESPONSABILIDADE DO GESTOR", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      pdf.text("1. O GESTOR responsável pelo FUNCIONÁRIO se compromete a:", marginLeft, yPos)
      yPos += lineSpacing

      pdf.text("   - Informar imediatamente ao Departamento de TI sempre que houver alteração na posse do", marginLeft, yPos)
      yPos += lineSpacing
      pdf.text("     equipamento.", marginLeft, yPos)
      yPos += lineSpacing

      pdf.text("   - Garantir que o FUNCIONÁRIO tenha assinado este termo antes da utilização do equipamento.", marginLeft, yPos)
      yPos += lineSpacing

      pdf.text("   - Responder solidariamente caso a omissão resulte em danos ao patrimônio da EMPRESA.", marginLeft, yPos)
      yPos += sectionSpacing

      // CLÁUSULA SEXTA
      yPos = checkNewPage(yPos, 60)
      pdf.setFont("cambria", "bold")
      pdf.text("CLÁUSULA SEXTA – DISPOSIÇÕES FINAIS", marginLeft, yPos)
      yPos += lineSpacing

      pdf.setFont("cambria", "normal")
      const paragraph7 = "1. O FUNCIONÁRIO declara estar ciente e de acordo com as responsabilidades descritas neste termo."
      const lines7 = pdf.splitTextToSize(paragraph7, contentWidth)
      pdf.text(lines7, marginLeft, yPos)
      yPos += lines7.length * lineSpacing + lineSpacing

      const paragraph8 = "2. Este termo entra em vigor na data de sua assinatura e permanecerá válido enquanto o FUNCIONÁRIO estiver na posse dos equipamentos."
      const lines8 = pdf.splitTextToSize(paragraph8, contentWidth)
      pdf.text(lines8, marginLeft, yPos)
      yPos += lines8.length * lineSpacing + sectionSpacing * 2

      // Signatures section
      const formattedDate = formData.data ? getFormattedDate() : "____ de ___________________ de _______"
      const location = selectedBranch.name.split(" - ")[0] || 'Criciúma'
      pdf.text(`${location}, ${formattedDate}`, marginLeft, yPos)
      yPos += signatureSpacing * 2

      pdf.text("EMPRESA: ____________________________", marginLeft, yPos)
      yPos += signatureSpacing

      pdf.text("GESTOR RESPONSÁVEL: ____________________________", marginLeft, yPos)
      yPos += signatureSpacing

      pdf.text("FUNCIONÁRIO: ____________________________", marginLeft, yPos)
      yPos += signatureSpacing

      pdf.text("Testemunhas:", marginLeft, yPos)
      yPos += witnessSpacing

      pdf.text("Nome: ____________________________    CPF: ____________________________", marginLeft, yPos)
      yPos += witnessSpacing

      pdf.text("Nome: ____________________________    CPF: ____________________________", marginLeft, yPos)

      pdf.save("termo_responsabilidade_notebook.pdf")
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Ocorreu um erro ao gerar o PDF. Por favor, tente novamente.")
    } finally {
      setIsGenerating(false)
    }
  }

  const getFormattedDate = () => {
    const date = new Date(formData.data)
    const day = date.getDate()
    const month = date.toLocaleString("pt-BR", { month: "long" })
    const year = date.getFullYear()
    return `${day} de ${month} de ${year}`
  }

  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Sistema de Edição de Termo de Responsabilidade - Notebook</h1>
      <Link href="/">
        <Button variant="outline" size="icon" className="mb-4">
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>Dados do Funcionário</CardTitle>
            <CardDescription>Preencha os dados para gerar o termo</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="filial">Filial</Label>
              <select
                id="filial"
                name="filial"
                value={formData.filial}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2"
              >
                {branches.map(branch => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nomeFunc">Nome do Funcionário</Label>
              <Input
                id="nomeFunc"
                name="nomeFunc"
                value={formData.nomeFunc}
                onChange={handleChange}
                placeholder="Nome completo do funcionário"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpfFunc">CPF</Label>
              <Input
                id="cpfFunc"
                name="cpfFunc"
                value={formData.cpfFunc}
                onChange={handleChange}
                placeholder="000.000.000-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca">Marca do Notebook</Label>
              <Input
                id="marca"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Ex: DELL, Lenovo, etc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelo">Modelo do Notebook</Label>
              <Input
                id="modelo"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ex: Vostro 15 3510, ThinkPad E14, etc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numSerie">Número de Série</Label>
              <Input
                id="numSerie"
                name="numSerie"
                value={formData.numSerie}
                onChange={handleChange}
                placeholder="Número de série do equipamento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="outrosItens">Outros Itens</Label>
              <Input
                id="outrosItens"
                name="outrosItens"
                value={formData.outrosItens}
                onChange={handleChange}
                placeholder="Ex: Mouse, mochila, etc"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="data">Data</Label>
              <Input id="data" name="data" type="date" value={formData.data} onChange={handleChange} />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" disabled={isGenerating || !isFormValid} onClick={generatePDF}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gerando PDF...
                </>
              ) : (
                "Baixar PDF"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
            <CardDescription>Visualize como ficará o documento</CardDescription>
          </CardHeader>
          <CardContent className="bg-gray-50 p-6 rounded-md text-sm max-h-[752px] overflow-y-auto">
            <div className="space-y-6 font-serif" ref={documentRef}>
              {/* Logo */}
              <div className="flex justify-center mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_delupo-XDZbwDYFMvE2B1wwQp1sZ8HuzhghwO.png"
                  alt="Logo DELUPO"
                  style={{ width: "11.83cm", height: "3.78cm" }}
                  crossOrigin="anonymous"
                />
              </div>

              {/* Title */}
              <div className="text-center font-bold text-lg uppercase mb-6">
                TERMO DE RESPONSABILIDADE PELO USO DE NOTEBOOK DA
                <br />
                EMPRESA
              </div>

              {/* Initial Paragraph */}
              <p className="mb-6 text-justify">
                Pelo presente Termo de Responsabilidade pelo Uso de Notebook da Empresa, de um lado, 
                A. SILVA FERRAGENS LTDA, pessoa jurídica de direito privado, estabelecida 
                à {branches.find(b => b.id === formData.filial)?.address || ''}, 
                inscrita no CNPJ nº {branches.find(b => b.id === formData.filial)?.cnpj || ''}, 
                neste ato representada pelo Senhor Alexandro Willemann da Silva, doravante 
                denominada "EMPRESA" e de outro lado, {formData.nomeFunc.toUpperCase() || '___________________'}, 
                portador do CPF nº {formData.cpfFunc || '___________________'}, doravante 
                denominado FUNCIONÁRIO, tem entre si justo e contratado o que segue:
              </p>

              {/* Clauses */}
              <div className="mb-6">
                <p className="font-bold uppercase mb-2">CLÁUSULA PRIMEIRA – DO EQUIPAMENTO</p>
                <p className="mb-2">
                  A EMPRESA cede ao FUNCIONÁRIO, para fins de uso exclusivo na execução de suas atividades
                  profissionais, os seguintes equipamentos:
                </p>
                <p className="mb-1">
                  - Notebook {formData.marca} {formData.modelo}, 
                  N° de Série: {formData.numSerie || '___________________'}
                </p>
                <p className="mb-1">- Fonte de alimentação</p>
                {formData.outrosItens && <p>- {formData.outrosItens}</p>}
              </div>

              <div className="mb-6">
                <p className="font-bold uppercase mb-2">CLÁUSULA SEGUNDA – DA RESPONSABILIDADE PELO USO E CONSERVAÇÃO</p>
                <p className="mb-2">O FUNCIONÁRIO se compromete a:</p>
                <p className="mb-1">1. Zelar pela integridade física e funcional dos equipamentos listados na Cláusula Primeira, responsabilizando-se por seu uso e conservação.</p>
                <p className="mb-1">2. Não emprestar, alugar, ceder ou permitir o uso dos equipamentos por terceiros.</p>
                <p className="mb-1">3. Utilizar os equipamentos exclusivamente para fins profissionais.</p>
                <p>4. Não realizar a instalação de programas sem autorização expressa do Departamento de TI.</p>
              </div>

              <div className="mb-6">
                <p className="font-bold uppercase mb-2">CLÁUSULA TERCEIRA – DA PROPRIEDADE DO EQUIPAMENTO</p>
                <p>Os equipamentos descritos na Cláusula Primeira são propriedade exclusiva da EMPRESA, cabendo ao FUNCIONÁRIO apenas sua detenção temporária para fins profissionais, sem qualquer direito de posse definitiva.</p>
              </div>

              <div className="mb-6">
                <p className="font-bold uppercase mb-2">CLÁUSULA QUARTA – DA DEVOLUÇÃO E RESPONSABILIDADE POR DANOS</p>
                <p className="mb-2">1. O FUNCIONÁRIO compromete-se a devolver todos os equipamentos listados na Cláusula Primeira em perfeito estado de funcionamento, excetuando-se o desgaste natural, no mesmo dia de seu desligamento.</p>
                <p>2. Em caso de danos, extravios ou avarias, decorrentes de negligência ou mau uso, o FUNCIONÁRIO autoriza a EMPRESA a proceder com o desconto em folha de pagamento.</p>
              </div>

              <div className="mb-6">
                <p className="font-bold uppercase mb-2">CLÁUSULA QUINTA – DA RESPONSABILIDADE DO GESTOR</p>
                <p className="mb-2">1. O GESTOR responsável pelo FUNCIONÁRIO se compromete a:</p>
                <p className="mb-1 pl-3">- Informar imediatamente ao Departamento de TI sempre que houver alteração na posse do equipamento.</p>
                <p className="mb-1 pl-3">- Garantir que o FUNCIONÁRIO tenha assinado este termo antes da utilização do equipamento.</p>
                <p className="pl-3">- Responder solidariamente caso a omissão resulte em danos ao patrimônio da EMPRESA.</p>
              </div>

              <div className="mb-8">
                <p className="font-bold uppercase mb-2">CLÁUSULA SEXTA – DISPOSIÇÕES FINAIS</p>
                <p className="mb-2">1. O FUNCIONÁRIO declara estar ciente e de acordo com as responsabilidades descritas neste termo.</p>
                <p>2. Este termo entra em vigor na data de sua assinatura e permanecerá válido enquanto o FUNCIONÁRIO estiver na posse dos equipamentos.</p>
              </div>

              {/* Signatures */}
              <div className="mt-10 mb-6">
                <p className="mb-8">
                  {branches.find(b => b.id === formData.filial)?.name.split(" - ")[0] || 'Criciúma'}, {formData.data ? getFormattedDate() : "____ de ___________________ de _______"}
                </p>

                <p className="mb-6">EMPRESA: ____________________________</p>
                <p className="mb-6">GESTOR RESPONSÁVEL: ____________________________</p>
                <p className="mb-10">FUNCIONÁRIO: ____________________________</p>

                <p className="mb-4">Testemunhas:</p>
                <p className="mb-6">Nome: ____________________________ CPF: ____________________________</p>
                <p>Nome: ____________________________ CPF: ____________________________</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}