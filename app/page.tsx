"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw } from "lucide-react"
import Image from "next/image"
import ResultadoBusqueda from "@/components/resultado-busqueda"
import ModalAviso from "@/components/modal-aviso"
import ModalAdvertencia from "@/components/modal-advertencia"
  import ModalError from "@/components/modal-error"
  import ModalInformativo from "@/components/modal-informativo"

// Constante para minutos de inactividad antes de cerrar sesión
const MINUTOS_INACTIVIDAD = 15

const tiposDocumento = [
  { valor: "DNI", etiqueta: "DNI" },
  { valor: "CARNET_EXTRANJERIA", etiqueta: "CARNET DE EXTRANJERIA" },
  { valor: "LIBRETA_7", etiqueta: "LIBRETA ELECTORAL – 7 DIGITOS" },
  { valor: "LIBRETA_8", etiqueta: "LIBRETA ELECTORAL – 8 DIGITOS" },
  { valor: "CARNET_POLICIAL", etiqueta: "CARNET FUERZAS POLICIALES" },
  { valor: "CARNET_ARMADAS", etiqueta: "CARNET FUERZAS ARMADAS" },
]

export default function Home() {
  const [vistaActual, setVistaActual] = useState<"inicio" | "resultado">("inicio")
  const [mostrarModal, setMostrarModal] = useState(false)
  const [tipoDocumento, setTipoDocumento] = useState("")
  const [numeroDocumento, setNumeroDocumento] = useState("")
  const [captchaIngresado, setCaptchaIngresado] = useState("")
  const [errores, setErrores] = useState<string[]>([])
  const [codigoCaptcha, setCodigoCaptcha] = useState("WAAL99")
  
  // Estado para modal de advertencia
  const [mostrarModalAdvertencia, setMostrarModalAdvertencia] = useState(false)
  const [advertenciaData, setAdvertenciaData] = useState({
    subtitulo: "",
    mensaje: ""
  })
  
  // Estado para errores inline de cada campo
  const [erroresCampos, setErroresCampos] = useState({
    tipoDocumento: "",
    numeroDocumento: "",
    captcha: ""
  })
  
  // Estado para modal de error
  const [mostrarModalError, setMostrarModalError] = useState(false)
  const [errorData, setErrorData] = useState({
    subtitulo: "",
    mensaje: ""
  })
  
  // Estado para loader del botón consultar
  const [isLoading, setIsLoading] = useState(false)
  
  // Estado para modal informativo
  const [mostrarModalInformativo, setMostrarModalInformativo] = useState(false)
  const [informativoData, setInformativoData] = useState({
    subtitulo: "",
    mensaje: ""
  })
  
  // Estado para sesión expirada por inactividad
  const [sesionExpirada, setSesionExpirada] = useState(false)
  
  // Función para mostrar modal de sesión expirada
  const mostrarSesionExpirada = useCallback(() => {
    setSesionExpirada(true)
    setInformativoData({
      subtitulo: "Sesión finalizada",
      mensaje: `Por su seguridad, la sesión ha finalizado debido a que no se registró actividad durante ${MINUTOS_INACTIVIDAD} minuto${MINUTOS_INACTIVIDAD > 1 ? 's' : ''}. Para continuar, vuelva a ingresar.`
    })
    setMostrarModalInformativo(true)
  }, [])
  
  // Función para manejar aceptar en modal informativo
  const handleAceptarInformativo = () => {
    setMostrarModalInformativo(false)
    if (sesionExpirada) {
      window.location.href = "https://www.fonavi-st.gob.pe/sifonavi/"
    }
  }
  
  // Detección de inactividad
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const resetTimer = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        mostrarSesionExpirada()
      }, MINUTOS_INACTIVIDAD * 60 * 1000) // Convertir minutos a milisegundos
    }
    
    // Eventos que indican actividad del usuario
    const eventos = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    
    // Agregar listeners
    eventos.forEach(evento => {
      document.addEventListener(evento, resetTimer)
    })
    
    // Iniciar timer
    resetTimer()
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      eventos.forEach(evento => {
        document.removeEventListener(evento, resetTimer)
      })
    }
  }, [mostrarSesionExpirada])

  const validarDocumento = (tipo: string, numero: string): string[] => {
    const erroresTemp: string[] = []

    if (!tipo) {
      erroresTemp.push("Debe seleccionar un tipo de documento")
      return erroresTemp
    }

    if (!numero.trim()) {
      erroresTemp.push("Debe ingresar el número de documento")
      return erroresTemp
    }

    switch (tipo) {
      case "DNI":
        if (!/^\d{8}$/.test(numero)) {
          erroresTemp.push("DNI debe tener exactamente 8 dígitos")
        }
        break
      case "CARNET_EXTRANJERIA":
        if (numero.length > 12) {
          erroresTemp.push("Carnet de Extranjería no puede exceder 12 caracteres")
        }
        break
      case "LIBRETA_7":
        if (!/^\d{7}$/.test(numero)) {
          erroresTemp.push("Libreta Electoral debe tener exactamente 7 dígitos")
        }
        break
      case "LIBRETA_8":
        if (!/^\d{8}$/.test(numero)) {
          erroresTemp.push("Libreta Electoral debe tener exactamente 8 dígitos")
        }
        break
      case "CARNET_POLICIAL":
      case "CARNET_ARMADAS":
        if (numero.length > 12) {
          erroresTemp.push("Carnet no puede exceder 12 caracteres")
        }
        break
    }

    return erroresTemp
  }

  const generarNuevoCaptcha = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let resultado = ""
    for (let i = 0; i < 6; i++) {
      resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
    }
    setCodigoCaptcha(resultado)
  }

  const manejarConsultar = () => {
    // Limpiar errores previos
    setErroresCampos({
      tipoDocumento: "",
      numeroDocumento: "",
      captcha: ""
    })
    
    // Validación de campos vacíos con errores inline y modal
    let tieneErrores = false
    const nuevosErrores = {
      tipoDocumento: "",
      numeroDocumento: "",
      captcha: ""
    }
    
    // Validar primer campo vacío para mostrar modal
    if (!tipoDocumento) {
      nuevosErrores.tipoDocumento = "Seleccione el tipo de documento."
      tieneErrores = true
      // Mostrar modal de advertencia para el primer error
      setAdvertenciaData({
        subtitulo: "Tipo de documento requerido",
        mensaje: "Seleccione el tipo de documento del fonavista titular."
      })
      setMostrarModalAdvertencia(true)
      setErroresCampos(nuevosErrores)
      return
    }
    
    if (!numeroDocumento.trim()) {
      nuevosErrores.numeroDocumento = "Ingrese el número de documento."
      tieneErrores = true
      setAdvertenciaData({
        subtitulo: "Número de documento requerido",
        mensaje: "Ingrese el número de documento del fonavista titular."
      })
      setMostrarModalAdvertencia(true)
      setErroresCampos(nuevosErrores)
      return
    }
    
    if (!captchaIngresado.trim()) {
      nuevosErrores.captcha = "Ingrese el código CAPTCHA."
      tieneErrores = true
      setAdvertenciaData({
        subtitulo: "Código CAPTCHA requerido",
        mensaje: "Ingrese el código que se muestra en la imagen."
      })
      setMostrarModalAdvertencia(true)
      setErroresCampos(nuevosErrores)
      return
    }
    
    const erroresValidacion = validarDocumento(tipoDocumento, numeroDocumento)
    setErrores(erroresValidacion)

    if (erroresValidacion.length > 0) {
      // Mostrar error de validación de formato en el campo correspondiente
      setErroresCampos({
        tipoDocumento: "",
        numeroDocumento: erroresValidacion[0],
        captcha: ""
      })
      setAdvertenciaData({
        subtitulo: "Formato de documento inválido",
        mensaje: erroresValidacion[0]
      })
      setMostrarModalAdvertencia(true)
      return
    }

    // Activar loader por 3 segundos
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      ejecutarConsulta()
    }, 3000)
  }

  const ejecutarConsulta = () => {
    // Reglas de negocio específicas
    if (tipoDocumento === "DNI") {
      if (numeroDocumento === "11111111") {
        setErrorData({
          subtitulo: "Error inesperado",
          mensaje: "Ocurrió un error inesperado, vuelva a intentar en unos minutos o contacte con el administrador"
        })
        setMostrarModalError(true)
        return
      }
      if (numeroDocumento === "22222222") {
        setInformativoData({
          subtitulo: "Sesión finalizada",
          mensaje: "Por su seguridad, la sesión ha finalizado debido a que no se registró actividad durante 15 minutos. Para continuar, vuelva a ingresar."
        })
        setMostrarModalInformativo(true)
        return
      }
      if (numeroDocumento === "31231231") {
        setMostrarModal(true)
        return
      } else if (numeroDocumento === "12345679") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345671") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345672") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345673") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345674") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345675") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345676") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345677") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "12345678") {
        setVistaActual("resultado")
        return
      } else if (numeroDocumento === "88888888") {
        setVistaActual("resultado")
        return
      }
    }

    // Para cualquier otro valor válido, permanecer en inicio
  }

  const manejarAceptarModal = () => {
    setMostrarModal(false)
    generarNuevoCaptcha()
    setVistaActual("resultado")
  }

  const manejarSalir = () => {
    setVistaActual("inicio")
    setTipoDocumento("")
    setNumeroDocumento("")
    setCaptchaIngresado("")
    setErrores([])
  }

  const manejarClicCaptcha = () => {
    generarNuevoCaptcha()
  }

  if (vistaActual === "resultado") {
    return <ResultadoBusqueda alSalir={manejarSalir} codigoCaptcha={codigoCaptcha} numeroDocumento={numeroDocumento} />
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header - Mobile */}
      <header className="bg-white shadow-sm p-2 md:hidden">
        <div className="container mx-auto flex flex-row items-center justify-between gap-2">
          <div className="flex-shrink-0">
            <Image src="/images/logo-fonavi.png" alt="FONAVI Logo" width={200} height={80} className="h-14 w-auto" />
          </div>
          <div className="text-right text-[10px] flex-1 min-w-0">
            <p className="text-gray-600 leading-tight">¿Necesita ayuda?</p>
            <p className="text-blue-600 font-medium leading-tight">
              Plataforma Única Virtual: <span className="font-bold">(01) 640-8655</span>
            </p>
            <p className="text-blue-600 font-medium leading-tight">
               Aló MAC: <span className="font-bold">(1800)</span>
            </p>            
            <p className="text-gray-600 leading-tight">Sesión se cierra tras 15 min de inactividad.</p>
          </div>
        </div>
      </header>
      {/* Header - Desktop */}
      <header className="bg-white shadow-sm p-4 hidden md:block">
        <div className="container mx-auto flex flex-row items-center justify-between gap-4">
          <div>
            <Image src="/images/logo-fonavi.png" alt="FONAVI Logo" width={250} height={100} className="h-20 w-auto" />
          </div>
          {/* Desktop */}
          <div className="hidden sm:block text-right text-sm">
            <p className="text-gray-600">Si tiene dificultad al ingresar llamar a los canales</p>
            <p className="text-blue-600 font-medium">
              Plataforma Única de Atención Virtual: <span className="font-bold">(01) 640-8655</span>
            </p>
            <p className="text-blue-600 font-medium">
              Aló MAC: <span className="font-bold">(1800)</span>
            </p>
            <p className="text-gray-600">Por su seguridad el Sistema se cerrará luego de 15 minutos de inactividad</p>
          </div>
          {/* Mobile */}
          <div className="sm:hidden text-right text-[10px]">
            <p className="text-gray-600">Si tiene dificultad al ingresar llamar a:</p>
            <p className="text-blue-600 font-medium">
              Plataforma Única: <span className="font-bold">(01) 640-8655</span>
            </p>
            <p className="text-blue-600 font-medium">
              Aló MAC: <span className="font-bold">(1800)</span>
            </p>
            <p className="text-gray-600">Sistema se cerrará luego de 15 min de inactividad</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <h1 className="text-[3.8vw] sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center leading-tight w-full whitespace-nowrap" style={{ color: "#103586" }}>
          MÓDULO DE REGISTRO DE HISTORIAL LABORAL F1
        </h1>
        <div className="w-full max-w-2xl">
          <div className="text-center mb-6">
            <p className="text-red-600 font-medium text-sm sm:text-lg">Ingrese los datos del Fonavista Titular</p>
          </div>

          <Card className="shadow-lg bg-white">
            <CardContent className="px-8 py-4 sm:p-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-1 sm:space-y-0">
                    <Label className="text-sm font-medium sm:w-32 sm:text-right sm:pt-2">Tipo Documento :</Label>
                    <div className="w-full sm:flex-1">
                      <Select value={tipoDocumento} onValueChange={(value) => {
                        setTipoDocumento(value)
                        setNumeroDocumento("")
                        if (erroresCampos.tipoDocumento) {
                          setErroresCampos(prev => ({ ...prev, tipoDocumento: "", numeroDocumento: "" }))
                        }
                      }}>
                        <SelectTrigger className={`w-full h-10 border ${erroresCampos.tipoDocumento ? 'border-red-500 border-2' : 'border-gray-300'}`}>
                          <SelectValue placeholder="Seleccionar" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposDocumento.map((tipo) => (
                            <SelectItem key={tipo.valor} value={tipo.valor}>
                              {tipo.etiqueta}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {erroresCampos.tipoDocumento && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{erroresCampos.tipoDocumento}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-1 sm:space-y-0">
                    <Label className="text-sm font-medium sm:w-32 sm:text-right sm:pt-2">Nro Documento :</Label>
                    <div className="w-full sm:flex-1">
                      <Input
                        value={numeroDocumento}
                        onChange={(e) => {
                          let valor = e.target.value
                          // Si es DNI, solo permitir números y máximo 8 dígitos
                          if (tipoDocumento === "DNI") {
                            valor = valor.replace(/\D/g, "").slice(0, 8)
                          }
                          setNumeroDocumento(valor)
                          if (erroresCampos.numeroDocumento) {
                            setErroresCampos(prev => ({ ...prev, numeroDocumento: "" }))
                          }
                        }}
                        className={`w-full h-10 border ${erroresCampos.numeroDocumento ? 'border-red-500 border-2' : 'border-gray-300'}`}
                        placeholder={tipoDocumento === "DNI" ? "00000000" : "Nro Documento"}
                        maxLength={tipoDocumento === "DNI" ? 8 : undefined}
                        inputMode={tipoDocumento === "DNI" ? "numeric" : "text"}
                      />
                      {erroresCampos.numeroDocumento && (
                        <p className="text-red-500 text-xs sm:text-sm mt-1">{erroresCampos.numeroDocumento}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">CAPTCHA :</Label>
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className="bg-blue-100 border border-blue-300 px-4 py-2 font-mono text-lg tracking-wider cursor-pointer hover:bg-blue-200 transition-colors"
                        onClick={manejarClicCaptcha}
                      >
                        {codigoCaptcha}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={generarNuevoCaptcha}
                        className="p-2 bg-transparent"
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      value={captchaIngresado}
                      onChange={(e) => {
                        setCaptchaIngresado(e.target.value)
                        if (erroresCampos.captcha) {
                          setErroresCampos(prev => ({ ...prev, captcha: "" }))
                        }
                      }}
                      className={`w-full sm:w-24 h-10 border text-center ${erroresCampos.captcha ? 'border-red-500 border-2' : 'border-gray-300'}`}
                      placeholder="Código"
                    />
                  </div>
                  {erroresCampos.captcha && (
                    <p className="text-red-500 text-xs sm:text-sm text-center">{erroresCampos.captcha}</p>
                  )}
                  <p className="text-center text-sm text-gray-600">
                    Haz clic en la imagen o en el botón para cambiar el código.
                  </p>
                </div>

                <div className="text-center sm:text-center">
                  <Button
                    onClick={manejarConsultar}
                    disabled={isLoading}
                    className="w-full sm:w-auto sm:min-w-[180px] text-white px-12 py-3 text-lg font-medium rounded-md hover:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#103586" }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Consultando...
                      </span>
                    ) : (
                      "Consultar"
                    )}
                  </Button>
                </div>

                {/* Caja de aviso importante */}
                <div className="border border-blue-300 bg-blue-50 rounded-lg p-3 sm:p-4 -mx-2 sm:mx-0">
                  <div className="flex items-start space-x-2 sm:space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white font-bold text-xs sm:text-sm">!</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-blue-800 text-sm sm:text-base mb-1">Importante</p>
                      <ul className="text-blue-700 text-xs sm:text-sm space-y-0.5">
                        <li>• Uso exclusivo del fonavista titular.</li>
                        <li>• Todo trámite de devolución es gratuito.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-3 px-4">
        <div className="container mx-auto">
          <p className="text-center text-xs sm:text-sm text-gray-600">
            © {new Date().getFullYear()} Secretaría Técnica del FONAVI · Versión 2.0.0
          </p>
        </div>
      </footer>

      {/* Modal */}
      <ModalAviso isOpen={mostrarModal} onAccept={manejarAceptarModal} documentNumber={numeroDocumento} />
      
      {/* Modal de Advertencia */}
      <ModalAdvertencia 
        isOpen={mostrarModalAdvertencia} 
        onAccept={() => setMostrarModalAdvertencia(false)}
        subtitulo={advertenciaData.subtitulo}
        mensaje={advertenciaData.mensaje}
      />
      
      {/* Modal de Error */}
      <ModalError 
        isOpen={mostrarModalError} 
        onAccept={() => setMostrarModalError(false)}
        subtitulo={errorData.subtitulo}
        mensaje={errorData.mensaje}
      />
      
      {/* Modal Informativo */}
      <ModalInformativo 
        isOpen={mostrarModalInformativo} 
        onAccept={handleAceptarInformativo}
        subtitulo={informativoData.subtitulo}
        mensaje={informativoData.mensaje}
      />
    </div>
  )
}
