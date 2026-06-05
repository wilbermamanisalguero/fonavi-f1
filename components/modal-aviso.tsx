"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalAvisoProps {
  isOpen: boolean
  onAccept: () => void
  documentNumber: string
}

export default function ModalAviso({ isOpen, onAccept, documentNumber }: ModalAvisoProps) {
  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle className="sr-only">Aviso de Verificación</DialogTitle>
        </DialogHeader>

        <div className="text-center space-y-6 py-4">
          <div className="space-y-4">
            <p className="text-gray-800 leading-relaxed">Al 30/06/2025 se ha verificado que el</p>
            <p className="text-gray-800 leading-relaxed">
              <span className="font-semibold">DNI {documentNumber}</span> consultado por Usted, no se encuentra
              registrado.
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              Si usted presentó su Formulario N° 1 recientemente, éste aún se encuentra en proceso de carga, puede
              volver a consultar posteriormente o llamar a nuestra{" "}
              <span className="font-semibold text-blue-600">PLATAFORMA ÚNICA DE ATENCIÓN VIRTUAL</span> llamando al
              teléfono <span className="font-semibold">(01) 640-8655</span>
            </p>
          </div>

          <Button onClick={onAccept} className="bg-red-500 hover:bg-red-600 text-white px-8 py-2 font-medium">
            Aceptar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
