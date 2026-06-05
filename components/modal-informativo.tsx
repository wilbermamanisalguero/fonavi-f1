"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

interface ModalInformativoProps {
  isOpen: boolean
  onAccept: () => void
  titulo?: string
  subtitulo: string
  mensaje: string
}

export default function ModalInformativo({ 
  isOpen, 
  onAccept, 
  titulo = "Informativo",
  subtitulo,
  mensaje 
}: ModalInformativoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md p-0 overflow-hidden border-0 gap-0" showCloseButton={false}>
        {/* Header azul */}
        <div className="bg-blue-500 px-6 py-4">
          <h2 className="text-xl font-bold text-white">{titulo}</h2>
        </div>

        {/* Cuerpo blanco */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Icono de información */}
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            
            {/* Texto */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">{subtitulo}</h3>
              <p className="text-gray-700">{mensaje}</p>
            </div>
          </div>

          {/* Botón Aceptar */}
          <div className="flex justify-end mt-6">
            <Button 
              onClick={onAccept} 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 font-medium"
            >
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
