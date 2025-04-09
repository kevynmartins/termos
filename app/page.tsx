"use client"

import { Card } from "@/components/ui/card"
import { SmartphoneNfc, Laptop2, ScanLine } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <Image 
          src="/images/delupo-logo.png"
          alt="Delupo Logo"
          width={200}
          height={80}
          priority
          className="mb-8"
        />
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Sistema de Termos de Responsabilidade
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <Link href="/termo-celular">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-blue-100 group-hover:bg-blue-200 transition-colors">
                  <SmartphoneNfc className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Termo de Celular</h2>
                <p className="text-gray-500 text-center text-sm">
                  Termo de responsabilidade para uso de celular corporativo
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/termo-notebook">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-green-100 group-hover:bg-green-200 transition-colors">
                  <Laptop2 className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Termo de Notebook</h2>
                <p className="text-gray-500 text-center text-sm">
                  Termo de responsabilidade para uso de notebook corporativo
                </p>
              </div>
            </Card>
          </Link>

          <Link href="/termo-coletor">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="flex flex-col items-center space-y-4">
                <div className="p-4 rounded-full bg-purple-100 group-hover:bg-purple-200 transition-colors">
                  <ScanLine className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-700">Termo de Coletor</h2>
                <p className="text-gray-500 text-center text-sm">
                  Termo de responsabilidade para uso de coletor de dados
                </p>
              </div>
            </Card>
          </Link>
        </div>
      </div>
    </main>
  )
}