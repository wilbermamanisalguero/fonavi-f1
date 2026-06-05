"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, FileText, FileSpreadsheet, Book, Landmark, Hourglass, ChevronDown, ChevronUp, LogOut, ArrowRight, Headphones, Phone, ShieldCheck, AlertTriangle } from "lucide-react"
import { IconWithArrow } from "./icon-with-arrow"
import ModalInformativo from "@/components/modal-informativo"

// Constante para minutos de inactividad antes de cerrar sesión
const MINUTOS_INACTIVIDAD = 15

// Interfaz para beneficios
interface Beneficio {
  institucion: string
  departamento: string
  provincia: string
  distrito: string
  direccion?: string
  codigoProyecto: string
  nombreProyecto: string
  descripcionProyecto?: string
  numeroContrato: string
  fechaContrato?: string
}

// Interfaz para historial laboral
interface HistorialLaboral {
  tipoDocumento: string
  numeroDocumento: string
  razonSocial: string
  fechaInicio: string
  fechaCese: string
}

// Componente MensajeBeneficiado
interface MensajeBeneficiadoProps {
  texto: string
  beneficios?: Beneficio[]
}

const MensajeBeneficiado = ({ texto, beneficios = [] }: MensajeBeneficiadoProps) => {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="bg-red-50 border-l-4 border-red-500 rounded-r-lg p-2 sm:p-4 shadow-md">
      <div className="flex items-center justify-between sm:justify-start sm:space-x-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm sm:text-lg">!</span>
            </div>
            {/* Efecto de pulso */}
            <div
              className="absolute inset-0 rounded-full animate-ping bg-red-400/30"
              style={{ animationDuration: "3s" }}
            />
          </div>
          <p className="text-red-800 font-semibold text-xs sm:text-sm">
            {texto}
          </p>
        </div>
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex items-center gap-1 text-red-700 text-xs font-semibold hover:text-red-900 transition-colors sm:ml-2"
        >
          <span className="hidden sm:inline">{abierto ? "Ocultar detalle" : "Ver detalle de beneficio"}</span>
          <span className="sm:hidden">{abierto ? "Ocultar" : "Ver detalle"}</span>
          {abierto ? <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" /> : <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />}
        </button>
      </div>
      {abierto && (
        <div className="mt-2 sm:mt-3">
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed text-justify mb-2 sm:mb-3">
            La Comision Ad Hoc evalua la condicion de Fonavista beneficiado, teniendo en cuenta la jurisprudencia del Tribunal Constitucional y el marco legal aplicable, para su inclusion o exclusion del proceso de devolucion.
          </p>
          {beneficios.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Institucion</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Departamento</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Provincia</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Distrito</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Direccion</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Codigo Proyecto</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Nombre Proyecto</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Desc. Proyecto</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Numero Contrato</th>
                    <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Fecha Contrato</th>
                  </tr>
                </thead>
                <tbody>
                  {beneficios.map((b, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.institucion}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.departamento}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.provincia}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.distrito}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.direccion ?? "-"}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.codigoProyecto}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.nombreProyecto}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.descripcionProyecto ?? "-"}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.numeroContrato}</td>
                      <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[10px]">{b.fechaContrato ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// Componente MensajeTramiteHeredero
interface MensajeTramiteHerederoProps {
  texto: string
}

const MensajeTramiteHeredero = ({ texto }: MensajeTramiteHerederoProps) => {
  const [abierto, setAbierto] = useState(false)
  return (
    <div className="space-y-2 sm:space-y-3">
      {/* Mobile: stack vertically, Desktop: horizontal */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 sm:gap-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M32 4L4 56h56L32 4z" fill="url(#triangleGradient)" stroke="#D97706" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M32 24v16" stroke="#7C2D12" strokeWidth="5" strokeLinecap="round"/>
              <circle cx="32" cy="48" r="3" fill="#7C2D12"/>
              <defs>
                <linearGradient id="triangleGradient" x1="32" y1="4" x2="32" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#FDE047"/>
                  <stop offset="1" stopColor="#FBBF24"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="font-semibold text-xs sm:text-sm leading-tight text-black">
            {texto}
          </p>
        </div>
        <button
          onClick={() => setAbierto(!abierto)}
          className="flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline transition-colors ml-10 sm:ml-0"
          style={{ color: "#103586" }}
        >
          {abierto ? "Ocultar requisitos" : "Ver requisitos"}
          {abierto ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#103586" }} /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: "#103586" }} />}
        </button>
      </div>
      {abierto && (
        <div className="bg-white rounded-lg p-3 sm:p-4 border border-amber-300">
          <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-3">
            Si el Fonavista titular ha fallecido, sus herederos pueden iniciar el trámite de devolución en el Banco de la Nación.  A continuación, se muestran los requisitos principales que deben tener en cuenta.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr style={{ backgroundColor: "#103586" }}>
                  <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left font-semibold text-white">Tema</th>
                  <th className="border border-gray-300 px-2 sm:px-3 py-2 text-left font-semibold text-white">Información que debe conocer el heredero</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs font-medium">Documentos básicos</td>
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs">DNI, Declaración Jurada y acta de defunción del fonavista.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs font-medium">Si el monto es hasta 4 UIT</td>
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs">Presentar documentos que acrediten parentesco (matrimonio, nacimiento, unión de hecho, etc.).</td>
                </tr>
                <tr className="bg-white">
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs font-medium">Si el monto supera 4 UIT</td>
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs">Presentar sucesión intestada o testamento inscrito en SUNARP.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs font-medium">Tiempo del trámite</td>
                  <td className="border border-gray-300 px-2 sm:px-3 py-2 text-gray-700 text-[10px] sm:text-xs">Existe un periodo de oposición de 45 días y el pago puede demorar aproximadamente 65 días calendario.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

// Componente MensajeHistorialLaboral
interface MensajeHistorialLaboralProps {
  historialLaboral?: HistorialLaboral[]
  onOcultar: () => void
}

const MensajeHistorialLaboral = ({ historialLaboral = [], onOcultar }: MensajeHistorialLaboralProps) => {
  return (
    <div className="mt-2 sm:mt-3 rounded-lg p-2 sm:p-4" style={{ backgroundColor: "#DBEAFE" }}>
      {/* Header con icono y link Ocultar detalle */}
      <div className="flex items-center justify-between sm:justify-start sm:space-x-3 mb-2 sm:mb-3">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
          </div>
          <p className="text-blue-800 font-semibold text-xs sm:text-sm">
            MESES DECLARADOS
          </p>
        </div>
        <button
          onClick={onOcultar}
          className="flex items-center gap-1 text-blue-700 text-xs font-semibold hover:text-blue-900 transition-colors sm:ml-2"
        >
          <span className="hidden sm:inline">Ocultar detalle de F1</span>
          <span className="sm:hidden">Ocultar</span>
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>
      {historialLaboral.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Tipo Documento</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Nro. Documento</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Razón Social</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Fecha Inicio</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-semibold text-gray-700">Fecha Cese</th>
              </tr>
            </thead>
            <tbody>
              {historialLaboral.map((h, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[11px]">{h.tipoDocumento}</td>
                  <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[11px]">{h.numeroDocumento}</td>
                  <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[11px]">{h.razonSocial}</td>
                  <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[11px]">{h.fechaInicio}</td>
                  <td className="border border-gray-300 px-2 py-1 text-gray-700 text-[11px]">{h.fechaCese}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

interface PropiedadesResultadoBusqueda {
  alSalir: () => void
  codigoCaptcha: string
  numeroDocumento: string
}

export default function ResultadoBusqueda({ alSalir, codigoCaptcha, numeroDocumento }: PropiedadesResultadoBusqueda) {
  const obtenerFechaActual = () => {
    const hoy = new Date()
    const dia = hoy.getDate().toString().padStart(2, "0")
    const mes = (hoy.getMonth() + 1).toString().padStart(2, "0")
    const anio = hoy.getFullYear()
    return `${dia}/${mes}/${anio}`
  }

  const esCasoSinF0 = numeroDocumento === "12345671"
  const esCasoSinF1 = numeroDocumento === "12345672"
  const esCasoSinHistorial = numeroDocumento === "12345673"
  const esCasoConHistorial = numeroDocumento === "12345674"
  const esCasoConCI = numeroDocumento === "12345675"

  const esCasoGrupoPagoYCobrarBN = numeroDocumento === "12345676"
  const esCasoCobroYEsperaReintegro = numeroDocumento === "12345677"
  const esCasoCobrarReintegro = numeroDocumento === "12345678"
  const esCasoSinAccion = numeroDocumento === "12345679"
  const esCasoBeneficiado = numeroDocumento === "88888888"

  // Datos de prueba para beneficios (caso beneficiado)
  const beneficiosPrueba: Beneficio[] = [
    {
      institucion: "FONAVI",
      departamento: "LIMA",
      provincia: "LIMA",
      distrito: "SAN ISIDRO",
      direccion: "AV. JAVIER PRADO 1234",
      codigoProyecto: "PROY-001",
      nombreProyecto: "VIVIENDA SOCIAL",
      descripcionProyecto: "Programa de vivienda social",
      numeroContrato: "CONT-2015-001",
      fechaContrato: "15/03/2015"
    }
  ]

  // Datos de prueba para historial laboral (caso beneficiado)
  const historialLaboralPrueba: HistorialLaboral[] = [
    {
      tipoDocumento: "RUC (11 DIGITOS)",
      numeroDocumento: "20100030595",
      razonSocial: "BANCO DE LA NACION",
      fechaInicio: "01/01/1980",
      fechaCese: "31/08/1980"
    },
    {
      tipoDocumento: "RUC (11 DIGITOS)",
      numeroDocumento: "20100043140",
      razonSocial: "SCOTIABANK PERU S.A.A.",
      fechaInicio: "01/07/1979",
      fechaCese: "31/08/1998"
    },
    {
      tipoDocumento: "RUC (11 DIGITOS)",
      numeroDocumento: "20538110435",
      razonSocial: "SINDICATO NACIONAL DE TRABAJADORES DEL BANCO DE MATERIALES SINATRA BANMAT",
      fechaInicio: "11/12/1997",
      fechaCese: "26/12/2014"
    }
  ]

  // Estado para controlar "Ver detalle" del historial laboral
  const [mostrarHistorialLaboral, setMostrarHistorialLaboral] = useState(false)
  
  // Estado para modal informativo de sesión expirada
  const [mostrarModalInformativo, setMostrarModalInformativo] = useState(false)
  const [informativoData, setInformativoData] = useState({
    subtitulo: "",
    mensaje: ""
  })
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
      }, MINUTOS_INACTIVIDAD * 60 * 1000)
    }
    
    const eventos = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart', 'click']
    
    eventos.forEach(evento => {
      document.addEventListener(evento, resetTimer)
    })
    
    resetTimer()
    
    return () => {
      clearTimeout(timeoutId)
      eventos.forEach(evento => {
        document.removeEventListener(evento, resetTimer)
      })
    }
  }, [mostrarSesionExpirada])

  console.log("Campo: numeroDocumento, Valor:", numeroDocumento)
  console.log("esCasoSinF0:", esCasoSinF0)
  console.log("esCasoSinF1:", esCasoSinF1)
  console.log("esCasoSinHistorial:", esCasoSinHistorial)
  console.log("esCasoConHistorial:", esCasoConHistorial)
  console.log("esCasoConCI:", esCasoConCI)
  console.log("esCasoGrupoPagoYCobrarBN:", esCasoGrupoPagoYCobrarBN)
  console.log("esCasoCobroYEsperaReintegro:", esCasoCobroYEsperaReintegro)
  console.log("esCasoCobrarReintegro:", esCasoCobrarReintegro)
  console.log("esCasoSinAccion:", esCasoSinAccion)
  console.log("esCasoBeneficiado:", esCasoBeneficiado)


 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-1 md:py-2">
        <div className="max-w-4xl mx-auto space-y-2">
          {/* Title with Logo - Mobile */}
          <div className="block sm:hidden">
            <div className="relative pb-1">
              {/* Salir button - top right */}
              <Button
                onClick={alSalir}
                variant="outline"
                className="absolute top-0 right-0 h-9 px-3 text-sm font-semibold"
                style={{ borderColor: "#103586", color: "#103586" }}
                title="Salir"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Salir
              </Button>
              {/* Logo and title centered */}
              <div className="flex flex-col items-center">
                <img 
                  src="/images/logo-fonavi.png" 
                  alt="Secretaría Técnica FONAVI" 
                  className="w-[140px] h-auto object-contain"
                />
                <h1 className="text-base font-bold text-gray-800 mt-1 leading-tight">RESULTADO DE LA BÚSQUEDA</h1>
                <p className="text-gray-600 flex items-center justify-center text-xs mt-0.5">
                  <span className="mr-1">📅</span>
                  AL {obtenerFechaActual()}
                </p>
              </div>
            </div>
          </div>
          {/* Title with Logo - Desktop */}
          <div className="hidden sm:flex flex-row items-center gap-4">
            <img 
              src="/images/logo-fonavi.png" 
              alt="Secretaría Técnica FONAVI" 
              className="h-14 w-auto object-contain"
            />
            <div className="flex-1 text-center leading-none">
              <h1 className="text-lg md:text-xl font-bold text-gray-800 mb-1 leading-none">RESULTADO DE LA BÚSQUEDA</h1>
              <p className="text-gray-600 flex items-center justify-center leading-none text-sm">
                <span className="mr-2">📅</span>
                AL {obtenerFechaActual()}
              </p>
            </div>
            <Button
              onClick={alSalir}
              variant="outline"
              className="h-10 px-4 text-base font-semibold transition-colors"
              style={{ borderColor: "#103586", color: "#103586" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#103586"
                e.currentTarget.style.color = "white"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent"
                e.currentTarget.style.color = "#103586"
              }}
              title="Salir"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Salir
            </Button>
          </div>

          {/* Personal Information */}
          <Card className="py-1 gap-3 shadow-md sm:shadow-lg rounded-xl bg-white overflow-hidden">
              <CardHeader className="text-white text-center py-2 sm:py-1" style={{ backgroundColor: "#103586" }}>
                <h2 className="text-base sm:text-lg font-semibold leading-tight">Información Personal</h2>
              </CardHeader>
            <CardContent className="px-6 sm:px-6 py-2 sm:py-1">
              {/* Mobile Layout - Single Column */}
              <div className="block sm:hidden space-y-1">
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Tipo Documento</span>
                  <span className="font-bold text-gray-900 text-xs">DNI</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Nro Documento</span>
                  <span className="font-bold text-gray-900 text-xs">{numeroDocumento}</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Nombres</span>
                  <span className="font-bold text-gray-900 text-xs text-right">VICTOR MANUEL</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Apellidos</span>
                  <span className="font-bold text-gray-900 text-xs text-right">TRUMP MAMANI</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Fecha Nacimiento</span>
                  <span className="font-bold text-gray-900 text-xs">15/03/1975</span>
                </div>
                <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                  <span className="text-gray-600 text-[10px] uppercase">Edad</span>
                  <span className="font-bold text-gray-900 text-xs">48 años</span>
                </div>
                <div className="flex justify-between items-center py-0.5">
                  <span className="text-gray-600 text-[10px] uppercase">Condición</span>
                  <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-semibold text-[10px] border border-red-200">
                    FALLECIDO
                  </span>
                </div>
              </div>
              
              {/* Desktop Layout - Two Columns */}
              <div className="hidden sm:grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-1">
                {/* Columna izquierda */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600 text-sm min-w-[175px]">TIPO DOCUMENTO</span>
                    <span className="font-bold text-gray-900 text-sm">DNI</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600 text-sm min-w-[175px]">NOMBRES</span>
                    <span className="font-bold text-gray-900 text-sm">VICTOR MANUEL</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600 text-sm min-w-[175px]">FECHA DE NACIMIENTO</span>
                    <span className="font-bold text-gray-900 text-sm">15/03/1975</span>
                  </div>
                </div>
                {/* Columna derecha */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600 text-sm min-w-[120px]">NRO DOCUMENTO</span>
                    <span className="font-bold text-gray-900 text-sm">{numeroDocumento}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-gray-600 text-sm min-w-[120px]">APELLIDOS</span>
                    <span className="font-bold text-gray-900 text-sm">TRUMP MAMANI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 text-sm min-w-[120px]">EDAD</span>
                    <span className="font-bold text-gray-900 text-sm">48 años</span>
                    <span className="bg-red-100 text-red-800 px-2 py-0.5 rounded-full font-semibold text-xs border border-red-200">
                      FALLECIDO
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Process Status */}
          <div className="bg-white rounded-xl shadow-md sm:shadow-lg p-3 sm:p-4"> 
            <div className="text-center mb-4 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Estado del Proceso</h2>
            </div>

            {/* Status Icons Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-4 sm:mb-6">
              {/* Inscripción */}
              <div className="text-center">
                <div className="mb-2 sm:mb-3">
                  <IconWithArrow Icon={FileText} completed={!esCasoSinF0} size="md" title="Inscripción completada" />
                </div>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-base">1. Registro</h3>
              </div>

              {/* Cuenta Individual */}
              <div className="text-center">
                <div className="mb-2 sm:mb-3">
                  <IconWithArrow
                    Icon={FileSpreadsheet}
                    completed={
                      esCasoCobrarReintegro ||
                      esCasoGrupoPagoYCobrarBN ||
                      esCasoConCI ||
                      esCasoSinAccion ||
                      esCasoBeneficiado ||
                      (!esCasoSinF0 && !esCasoSinF1 && !esCasoSinHistorial && !esCasoConHistorial )
                    }
                    size="md"
                    title="Cuenta Individual completada"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-base">2. Cuenta Individual</h3>
              </div>

              {/* Padrón */}
              <div className="text-center">
                <div className="mb-2 sm:mb-3">
                  <IconWithArrow
                    Icon={Book}
                    completed={
                      esCasoCobrarReintegro ||
                      esCasoGrupoPagoYCobrarBN ||
                      esCasoSinAccion ||
                      esCasoBeneficiado ||
                      (!esCasoSinF0 && !esCasoSinF1 && !esCasoSinHistorial && !esCasoConHistorial && !esCasoConCI)
                    }
                    size="md"
                    title="Padrón completado"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-base">3. Padrón</h3>
              </div>

              {/* Devolución */}
              <div className="text-center">
                <div className="mb-2 sm:mb-3">
                  <IconWithArrow
                    Icon={Landmark}
                    completed={
                      esCasoCobroYEsperaReintegro ||
                      esCasoSinAccion ||
                      esCasoBeneficiado ||
                      (!esCasoCobrarReintegro &&
                        !esCasoGrupoPagoYCobrarBN &&
                        !esCasoSinF0 &&
                        !esCasoSinF1 &&
                        !esCasoSinHistorial &&
                        !esCasoConHistorial &&
                        !esCasoConCI)
                    }
                    size="md"
                    title="Devolución completada"
                  />
                </div>
                <h3 className="font-semibold text-gray-800 text-xs sm:text-base">4. Devolución</h3>
              </div>
            </div>

            {esCasoSinAccion && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                  {/* Inscripción Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
<div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>

                {/* Cuenta Individual Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                    </div>
                  </div>

                  {/* Padrón Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Padrón</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                        <div>GRUPO: 8</div>
                        <div className="mt-1">20/05/2026</div>
                      </div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                        <div>REINTEGRO: 2</div>
                        <div className="mt-1">20/05/2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Devolución Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Devolución</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">27/12/2016</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">01/08/2024</div>
                    </div>
                  </div>
                </div>
              )}

            {esCasoBeneficiado && (
                <>
                <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-4">
                  {/* Inscripción Details - ligeramente más ancho para el texto largo */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 sm:flex-[1.15] sm:min-w-0">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">F0: 12/08/2013</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">F1: 07/02/2014</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-gray-700">
                        <button
                          onClick={() => setMostrarHistorialLaboral(!mostrarHistorialLaboral)}
                          className="flex items-center gap-1 text-xs sm:text-sm font-semibold hover:underline transition-colors"
                          style={{ color: "#1E40AF" }}
                          aria-expanded={mostrarHistorialLaboral}
                        >
                          {mostrarHistorialLaboral ? "Ocultar detalle de F1" : "Ver detalle de F1"}
                          {mostrarHistorialLaboral ? <ChevronUp className="w-4 h-4" style={{ color: "#1E40AF" }} /> : <ChevronDown className="w-4 h-4" style={{ color: "#1E40AF" }} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Cuenta Individual Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 sm:flex-1 sm:min-w-0">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                    </div>
                  </div>

                  {/* Padrón Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 sm:flex-1 sm:min-w-0">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Padrón</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                        <div>GRUPO: 8</div>
                        <div className="mt-1">20/05/2026</div>
                      </div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                        <div>REINTEGRO: 2</div>
                        <div className="mt-1">20/05/2026</div>
                      </div>
                    </div>
                  </div>

                  {/* Devolución Details */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 sm:flex-1 sm:min-w-0">
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Devolución</h4>
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    </div>
                    <div className="space-y-1 sm:space-y-2">
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">27/12/2016</div>
                      <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">01/08/2024</div>
                    </div>
                  </div>
                </div>
                
                {/* Historial Laboral desplegable */}
                {mostrarHistorialLaboral && (
                  <MensajeHistorialLaboral 
                    historialLaboral={historialLaboralPrueba} 
                    onOcultar={() => setMostrarHistorialLaboral(false)} 
                  />
                )}
                </>
              )}

            {esCasoSinF1 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">F0: 12/08/2013</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoSinHistorial && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">F1: 07/02/2014</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoConHistorial && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoConCI && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>

                {/* Cuenta Individual Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoGrupoPagoYCobrarBN && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>

                {/* Cuenta Individual Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                  </div>
                </div>

                {/* Padrón Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Padrón</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">GRUPO: 8</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoCobroYEsperaReintegro && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>

                {/* Cuenta Individual Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                  </div>
                </div>

                {/* Padrón Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Padrón</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">GRUPO: 8</div>
                  </div>
                </div>

                {/* Devolución Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Devolución</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">27/12/2016</div>
                  </div>
                </div>
              </div>
            )}

            {esCasoCobrarReintegro && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                {/* Inscripción Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4 min-w-0 overflow-hidden">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Registro</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F0: 12/08/2013</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">F1: 07/02/2014</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700 w-full min-w-0">Ver detalle de F1</div>
                  </div>
                </div>

                {/* Cuenta Individual Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Cuenta Individual</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">CI: 18/08/2016</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">80 períodos</div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">15 aportes</div>
                  </div>
                </div>

                {/* Padrón Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Padrón</h4>
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                      <div>GRUPO: 8</div>
                      <div className="mt-1">20/05/2026</div>
                    </div>
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">
                      <div>REINTEGRO: 2</div>
                      <div className="mt-1">20/05/2026</div>
                    </div>
                  </div>
                </div>

                {/* Devolución Details */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-base">Devolución</h4>
                    <Hourglass className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
                  </div>
                  <div className="space-y-1 sm:space-y-2">
                    <div className="bg-blue-100 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-700">27/12/2016</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mensaje informativo antes de la acción */}
          {(esCasoSinF0 || esCasoSinF1 || esCasoSinHistorial) && (
            <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-lg p-2 sm:p-3 shadow-sm">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-6 h-6 sm:w-7 sm:h-7 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-base">!</span>
                </div>
                <p className="text-amber-800 font-semibold text-xs sm:text-sm uppercase tracking-wide">
                  {esCasoSinF0 && "USTED NO CUENTA CON FORMULARIO F0"}
                  {esCasoSinF1 && "USTED NO CUENTA CON FORMULARIO F1"}
                  {esCasoSinHistorial && "USTED NO REGISTRA HISTORIA LABORAL EN EL FORMULARIO 1"}
                </p>
              </div>
            </div>
          )}

          {/* Mensaje informativo para caso beneficiado */}
          {esCasoBeneficiado && (
            <MensajeBeneficiado
              texto="USTED ES BENEFICIADO"
              beneficios={beneficiosPrueba}
            />
          )}

          {/* Acción a realizar */}
          <Card className="shadow-md sm:shadow-lg rounded-xl bg-white overflow-hidden !py-0">
            <CardHeader className="text-white text-left !py-2 !px-6 sm:!px-10 flex items-center justify-start" style={{ backgroundColor: "#103586" }}>
              <h2 className="text-base sm:text-lg font-semibold leading-tight">Acción a realizar por el Fonavista Titular</h2>
            </CardHeader>
            <CardContent className="!py-1 !px-6">
              <div className="rounded-lg p-3 sm:p-4" style={{ backgroundColor: "#FFF3CD" }}>
                  {esCasoSinF0 ? (
                    <div className="space-y-2">
                      <p className="text-gray-800 text-xs sm:text-sm font-medium mb-2">Para continuar con su proceso, debe registrar su formulario F0:</p>
                      <a
                        href="https://www.fonavi-st.gob.pe/registro0/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors inline-block"
                      >
                        REGISTRE SU FORMULARIO F0
                      </a>
                    </div>
                  ) : esCasoSinF1 ? (
                    <div className="space-y-2">
                      <p className="text-gray-800 text-xs sm:text-sm font-medium mb-2">Para continuar con su proceso, debe registrar su formulario F1:</p>
                      <a
                        href="https://www.fonavi-st.gob.pe/registro1/pages/index.jsp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors inline-block"
                      >
                        REGISTRE SU FORMULARIO F1
                      </a>
                    </div>
                  ) : esCasoSinHistorial ? (
                    <div className="space-y-2">
                      <p className="text-gray-800 text-xs sm:text-sm font-medium mb-2">Para continuar con su proceso, debe registrar su historia laboral:</p>
                      <a
                        href="https://www.fonavi-st.gob.pe/registro1/pages/index.jsp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium hover:bg-green-600 transition-colors inline-block"
                      >
                        REGISTRE SU HISTORIA LABORAL EN EL F1
                      </a>
                    </div>
                  ) : esCasoConHistorial ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Hourglass className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">HISTORIA LABORAL EN PROCESO DE VALIDACIÓN</span>
                    </div>
                  ) : esCasoConCI ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Hourglass className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">ESPERE EL PRÓXIMO PADRÓN DE PAGO</span>
                    </div>
                  ) : esCasoGrupoPagoYCobrarBN ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Landmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">APERSONARSE AL BANCO DE LA NACIÓN</span>
                    </div>
                  ) : esCasoCobroYEsperaReintegro ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Hourglass className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">REINTEGRO EN FUNCIÓN DE LA EDAD</span>
                    </div>
                  ) : esCasoCobrarReintegro ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Landmark className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">APERSONARSE AL BANCO DE LA NACIÓN</span>
                    </div>
                  ) : esCasoSinAccion ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">NINGUNA</span>
                    </div>
                  ) : esCasoBeneficiado ? (
                    <MensajeTramiteHeredero
                      texto="LOS HEREDEROS DEBEN INICIAR PROCESO DEVOLUCIÓN EN EL BANCO DE LA NACIÓN"
                    />
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">?</span>
                      </div>
                      <span className="text-gray-800 text-xs sm:text-sm font-semibold">INDEFINIDO</span>
                    </div>
                  )}
              </div>
              <div className="border-t mt-2 sm:mt-3 pt-3 pb-3 -mx-6 px-4 sm:px-6 rounded-b-[20px]" style={{ backgroundColor: "#EEF3FB", borderColor: "#E0E7F1", borderTopWidth: "1px" }}>
                {/* Desktop: horizontal layout */}
                <div className="hidden md:flex items-center justify-between max-w-4xl mx-auto">
                  {/* Section 1: Info con headphones */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                      <Headphones className="w-6 h-6" style={{ color: "#1A4F8B" }} />
                    </div>
                    <p className="text-xs font-medium leading-tight" style={{ color: "#1A4F8B" }}>
                      Para más información<br />comuníquese con:
                    </p>
                  </div>
                  
                  {/* Section 2: Plataforma Unica */}
                  <div className="flex flex-col items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 w-[180px] h-[80px]">
                    <p className="text-[11px] font-medium text-center leading-tight" style={{ color: "#1A4F8B" }}>
                      Plataforma Única de<br />Atención Virtual
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A4F8B" }}>
                        <Phone className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-base font-bold whitespace-nowrap" style={{ color: "#1A4F8B" }}>(01) 640-8655</span>
                    </div>
                  </div>
                  
                  {/* Section 3: Aló MAC */}
                  <div className="flex flex-col items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 w-[180px] h-[80px]">
                    <p className="text-[11px] font-medium text-center leading-tight" style={{ color: "#1A4F8B" }}>
                      Aló MAC
                    </p>
                    <div className="flex items-center gap-1.5">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A4F8B" }}>
                        <Phone className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-base font-bold" style={{ color: "#1A4F8B" }}>(1800)</span>
                    </div>
                  </div>
                  
                  {/* Separador vertical */}
                  <div className="w-px h-16" style={{ backgroundColor: "#C5D3E8" }}></div>
                  
                  {/* Section 4: Solo para uso */}
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                      <ShieldCheck className="w-6 h-6" style={{ color: "#1A4F8B" }} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xs leading-tight" style={{ color: "#1A4F8B" }}>
                        Sólo para uso del
                      </p>
                      <p className="text-sm font-bold leading-tight" style={{ color: "#1A4F8B" }}>
                        FONAVISTA TITULAR
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Mobile: vertical layout */}
                <div className="flex md:hidden flex-col items-center gap-3 py-2">
                  {/* Section 1: Info con headphones */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                      <Headphones className="w-4 h-4" style={{ color: "#1A4F8B" }} />
                    </div>
                    <p className="text-[10px] font-medium leading-tight" style={{ color: "#1A4F8B" }}>
                      Para más información<br />comuníquese con:
                    </p>
                  </div>
                  
                  {/* Cards row */}
                  <div className="flex items-center justify-center gap-3">
                    {/* Plataforma Unica */}
                    <div className="flex flex-col items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100 w-[130px] h-[65px]">
                      <p className="text-[9px] font-medium text-center leading-tight" style={{ color: "#1A4F8B" }}>
                        Plataforma Única de<br />Atención Virtual
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A4F8B" }}>
                          <Phone className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-[11px] font-bold whitespace-nowrap" style={{ color: "#1A4F8B" }}>(01) 640-8655</span>
                      </div>
                    </div>
                    
                    {/* Aló MAC */}
                    <div className="flex flex-col items-center justify-between bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100 w-[130px] h-[65px]">
                      <p className="text-[9px] font-medium text-center leading-tight" style={{ color: "#1A4F8B" }}>
                        Aló MAC
                      </p>
                      <div className="flex items-center gap-1">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: "#1A4F8B" }}>
                          <Phone className="w-2.5 h-2.5 text-white" />
                        </div>
                        <span className="text-[11px] font-bold" style={{ color: "#1A4F8B" }}>(1800)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Section 4: Solo para uso */}
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                      <ShieldCheck className="w-4 h-4" style={{ color: "#1A4F8B" }} />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-[10px] leading-tight" style={{ color: "#1A4F8B" }}>
                        Sólo para uso del
                      </p>
                      <p className="text-[11px] font-bold leading-tight" style={{ color: "#1A4F8B" }}>
                        FONAVISTA TITULAR
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      {/* Modal Informativo - Sesión expirada */}
      <ModalInformativo 
        isOpen={mostrarModalInformativo} 
        onAccept={handleAceptarInformativo}
        subtitulo={informativoData.subtitulo}
        mensaje={informativoData.mensaje}
      />
    </div>
  )
}
