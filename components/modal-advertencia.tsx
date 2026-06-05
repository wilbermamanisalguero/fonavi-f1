"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Check } from "lucide-react"

interface ModalAdvertenciaProps {
  isOpen: boolean
  onAccept: () => void
  titulo?: string
  subtitulo: string
  mensaje: string
}

export default function ModalAdvertencia({ 
  isOpen, 
  onAccept, 
  titulo = "Advertencia",
  subtitulo,
  mensaje 
}: ModalAdvertenciaProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-md p-0 overflow-hidden border-0 gap-0" showCloseButton={false}>
        {/* Header amarillo */}
        <div className="bg-amber-400 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">{titulo}</h2>
        </div>

        {/* Cuerpo blanco */}
        <div className="p-6">
          <div className="flex items-start space-x-4">
            {/* Icono de advertencia */}
            <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-gray-900" />
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
              variant="outline"
              className="border-2 border-amber-400 text-amber-600 hover:bg-amber-50 px-6 py-2 font-medium"
            >
              <Check className="w-4 h-4 mr-2" />
              Aceptar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
