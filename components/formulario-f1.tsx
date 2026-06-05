"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Bell,
  Briefcase,
  Mail,
  Phone,
  RefreshCw,
  Plus,
  Trash2,
  Info,
  LogOut,
  ShieldCheck,
  Headphones,
} from "lucide-react"

const COLOR_PRIMARIO = "#103586"
const COLOR_ACENTO = "#1A4F8B"

interface RegistroLaboral {
  id: number
  tipoDocumento: string
  numeroDocumento: string
  razonSocial: string
  fechaInicio: string
  fechaCese: string
}

const tiposDocumentoTitular = [
  { valor: "DNI", etiqueta: "DOCUMENTO NACIONAL DE IDENTIDAD" },
  { valor: "CE", etiqueta: "CARNET DE EXTRANJERÍA" },
  { valor: "LE7", etiqueta: "LIBRETA ELECTORAL – 7 DÍGITOS" },
  { valor: "LE8", etiqueta: "LIBRETA ELECTORAL – 8 DÍGITOS" },
]

const tiposDocumentoEmpleador = [
  { valor: "RUC", etiqueta: "RUC (11 DÍGITOS)" },
  { valor: "DNI", etiqueta: "DNI (8 DÍGITOS)" },
]

interface FormularioF1Props {
  alSalir?: () => void
  numeroDocumento?: string
}

export default function FormularioF1({ alSalir, numeroDocumento = "009807921959" }: FormularioF1Props) {
  // Datos del titular (solo lectura)
  const titular = {
    tipoDocumento: "DNI",
    numeroDocumento: "00980792",
    fechaNacimiento: "19/07/1959",
    nombres: "REMY",
    apellidoPaterno: "ARAUJO",
    apellidoMaterno: "VASQUEZ",
  }

  // Datos de notificación
  const [correo, setCorreo] = useState("WILBERMAMANISALGUERO@gmail.com")
  const [celular, setCelular] = useState("948904692")

  // Nuevo registro laboral
  const [nuevoTipoDoc, setNuevoTipoDoc] = useState("")
  const [nuevoNroDoc, setNuevoNroDoc] = useState("")
  const [nuevaRazonSocial, setNuevaRazonSocial] = useState("")
  const [nuevaFechaInicio, setNuevaFechaInicio] = useState("")
  const [nuevaFechaCese, setNuevaFechaCese] = useState("")

  const [historial, setHistorial] = useState<RegistroLaboral[]>([
    {
      id: 1,
      tipoDocumento: "RUC (11 DÍGITOS)",
      numeroDocumento: "20131257750",
      razonSocial: "SEGURO SOCIAL DE SALUD",
      fechaInicio: "30/07/1986",
      fechaCese: "30/08/1998",
    },
    {
      id: 2,
      tipoDocumento: "RUC (11 DÍGITOS)",
      numeroDocumento: "10087397535",
      razonSocial: "BROWN SUAREZ OSWALDO WENCESLAO",
      fechaInicio: "12/08/1998",
      fechaCese: "29/08/1998",
    },
  ])

  const agregarRegistro = () => {
    if (!nuevoTipoDoc || !nuevoNroDoc.trim() || !nuevaRazonSocial.trim() || !nuevaFechaInicio || !nuevaFechaCese) {
      return
    }
    const etiqueta = tiposDocumentoEmpleador.find((t) => t.valor === nuevoTipoDoc)?.etiqueta ?? nuevoTipoDoc
    setHistorial((prev) => [
      ...prev,
      {
        id: prev.length ? Math.max(...prev.map((r) => r.id)) + 1 : 1,
        tipoDocumento: etiqueta,
        numeroDocumento: nuevoNroDoc.trim(),
        razonSocial: nuevaRazonSocial.trim(),
        fechaInicio: nuevaFechaInicio,
        fechaCese: nuevaFechaCese,
      },
    ])
    setNuevoTipoDoc("")
    setNuevoNroDoc("")
    setNuevaRazonSocial("")
    setNuevaFechaInicio("")
    setNuevaFechaCese("")
  }

  const eliminarRegistro = (id: number) => {
    setHistorial((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* ===== Barra superior institucional ===== */}
      <header className="sticky top-0 z-30 bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src="/images/logo-fonavi.png"
                alt="Secretaría Técnica FONAVI"
                className="h-10 sm:h-12 w-auto object-contain flex-shrink-0"
              />
              <nav aria-label="Navegación del formulario" className="hidden md:flex items-center gap-1">
                <span
                  className="px-3 py-2 rounded-md text-sm font-semibold text-white"
                  style={{ backgroundColor: COLOR_PRIMARIO }}
                >
                  Formulario 1
                </span>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Ver Formulario 1
                </button>
                <button className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  Registrar Historial
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <span
                className="hidden sm:inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold"
                style={{ backgroundColor: "#EEF3FB", color: COLOR_ACENTO }}
                title="Documento del titular"
              >
                {numeroDocumento}
              </span>
              <Button
                onClick={alSalir}
                variant="outline"
                className="h-10 px-4 font-semibold bg-transparent"
                style={{ borderColor: COLOR_PRIMARIO, color: COLOR_PRIMARIO }}
              >
                <LogOut className="h-4 w-4 mr-2" aria-hidden="true" />
                Salir
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className="max-w-5xl mx-auto space-y-4 sm:space-y-6">
          {/* Título de página */}
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight text-balance" style={{ color: COLOR_PRIMARIO }}>
              REGISTRO DE HISTORIAL LABORAL F1
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Complete y verifique la información del Fonavista Titular
            </p>
          </div>

          {/* ===== Datos del titular ===== */}
          <Card className="gap-0 py-0 shadow-md rounded-xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 py-3 sm:py-4 text-white" style={{ backgroundColor: COLOR_PRIMARIO }}>
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold">Datos del titular</h2>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CampoSoloLectura label="Tipo de documento" value="DOCUMENTO NACIONAL DE IDENTIDAD" />
                <CampoSoloLectura label="Nro. de documento" value={titular.numeroDocumento} />
                <CampoSoloLectura label="Fecha de nacimiento" value={titular.fechaNacimiento} />
                <CampoSoloLectura label="Nombres" value={titular.nombres} />
                <CampoSoloLectura label="Apellido paterno" value={titular.apellidoPaterno} />
                <CampoSoloLectura label="Apellido materno" value={titular.apellidoMaterno} />
              </div>
            </CardContent>
          </Card>

          {/* ===== Datos de notificación ===== */}
          <Card className="gap-0 py-0 shadow-md rounded-xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 py-3 sm:py-4 text-white" style={{ backgroundColor: COLOR_PRIMARIO }}>
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Bell className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold">Datos de notificación</h2>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div
                className="flex items-start gap-2 rounded-lg p-3 text-sm font-medium"
                style={{ backgroundColor: "#DBEAFE", color: COLOR_ACENTO }}
                role="note"
              >
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Verifique su correo electrónico y número de celular antes de continuar.</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 md:items-end">
                <div className="space-y-1.5">
                  <Label htmlFor="correo" className="text-sm font-semibold text-gray-700">
                    Correo electrónico
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                    <Input
                      id="correo"
                      type="email"
                      value={correo}
                      onChange={(e) => setCorreo(e.target.value)}
                      className="h-12 pl-9 text-base"
                      placeholder="correo@ejemplo.com"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="celular" className="text-sm font-semibold text-gray-700">
                    Celular
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
                    <Input
                      id="celular"
                      type="tel"
                      inputMode="numeric"
                      value={celular}
                      onChange={(e) => setCelular(e.target.value.replace(/\D/g, "").slice(0, 9))}
                      className="h-12 pl-9 text-base"
                      placeholder="999999999"
                    />
                  </div>
                </div>
                <Button
                  className="h-12 px-6 text-base font-semibold text-white w-full md:w-auto"
                  style={{ backgroundColor: COLOR_PRIMARIO }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Actualizar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* ===== Historial laboral ===== */}
          <Card className="gap-0 py-0 shadow-md rounded-xl bg-white overflow-hidden">
            <CardHeader className="flex flex-row items-center gap-3 py-3 sm:py-4 text-white" style={{ backgroundColor: COLOR_PRIMARIO }}>
              <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                <Briefcase className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-base sm:text-lg font-semibold">Historial laboral</h2>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 space-y-4">
              <div
                className="flex items-start gap-2 rounded-lg p-3 text-sm font-medium"
                style={{ backgroundColor: "#DBEAFE", color: COLOR_ACENTO }}
                role="note"
              >
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Registre sólo información del periodo Julio 1979 – Agosto 1998.</span>
              </div>

              {/* Formulario para agregar registro */}
              <fieldset className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
                <legend className="px-2 text-sm font-semibold text-gray-700">Agregar empleador</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="tipoDoc" className="text-sm font-medium text-gray-700">
                      Tipo de documento
                    </Label>
                    <Select value={nuevoTipoDoc} onValueChange={setNuevoTipoDoc}>
                      <SelectTrigger id="tipoDoc" className="!h-12 text-base bg-white">
                        <SelectValue placeholder="Seleccionar" />
                      </SelectTrigger>
                      <SelectContent>
                        {tiposDocumentoEmpleador.map((t) => (
                          <SelectItem key={t.valor} value={t.valor}>
                            {t.etiqueta}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="nroDoc" className="text-sm font-medium text-gray-700">
                      Nro. de documento
                    </Label>
                    <Input
                      id="nroDoc"
                      value={nuevoNroDoc}
                      onChange={(e) => setNuevoNroDoc(e.target.value.replace(/\D/g, ""))}
                      className="h-12 text-base bg-white"
                      inputMode="numeric"
                      placeholder="Número"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="razon" className="text-sm font-medium text-gray-700">
                      Razón social
                    </Label>
                    <Input
                      id="razon"
                      value={nuevaRazonSocial}
                      onChange={(e) => setNuevaRazonSocial(e.target.value)}
                      className="h-12 text-base bg-white"
                      placeholder="Nombre del empleador"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fInicio" className="text-sm font-medium text-gray-700">
                      Inicio (dd/mm/aaaa) <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="fInicio"
                      type="date"
                      value={nuevaFechaInicio}
                      onChange={(e) => setNuevaFechaInicio(e.target.value)}
                      className="h-12 text-base bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="fCese" className="text-sm font-medium text-gray-700">
                      Cese (dd/mm/aaaa) <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="fCese"
                      type="date"
                      value={nuevaFechaCese}
                      onChange={(e) => setNuevaFechaCese(e.target.value)}
                      className="h-12 text-base bg-white"
                    />
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={agregarRegistro}
                      className="h-12 w-full text-base font-semibold text-white"
                      style={{ backgroundColor: "#15803D" }}
                    >
                      <Plus className="w-5 h-5 mr-2" aria-hidden="true" />
                      Agregar
                    </Button>
                  </div>
                </div>
              </fieldset>

              {/* Tabla de registros - escritorio */}
              <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{ backgroundColor: "#EEF3FB" }}>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>#</th>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>Tipo de documento</th>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>Nro. de documento</th>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>Razón social</th>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>Fecha inicio</th>
                      <th className="px-4 py-3 text-left font-semibold" style={{ color: COLOR_ACENTO }}>Fecha cese</th>
                      <th className="px-4 py-3 text-center font-semibold" style={{ color: COLOR_ACENTO }}>Eliminar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historial.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                          No hay registros laborales agregados.
                        </td>
                      </tr>
                    ) : (
                      historial.map((r, index) => (
                        <tr key={r.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="px-4 py-3 text-gray-700 font-medium">{index + 1}</td>
                          <td className="px-4 py-3 text-gray-700">{r.tipoDocumento}</td>
                          <td className="px-4 py-3 text-gray-700 font-mono">{r.numeroDocumento}</td>
                          <td className="px-4 py-3 text-gray-700">{r.razonSocial}</td>
                          <td className="px-4 py-3 text-gray-700">{r.fechaInicio}</td>
                          <td className="px-4 py-3 text-gray-700">{r.fechaCese}</td>
                          <td className="px-4 py-3 text-center">
                            <Button
                              onClick={() => eliminarRegistro(r.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              aria-label={`Eliminar registro ${index + 1}`}
                            >
                              <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                              Eliminar
                            </Button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Tarjetas de registros - móvil */}
              <div className="md:hidden space-y-3">
                {historial.length === 0 ? (
                  <p className="text-center text-gray-500 py-6">No hay registros laborales agregados.</p>
                ) : (
                  historial.map((r, index) => (
                    <div key={r.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                          style={{ backgroundColor: COLOR_PRIMARIO }}
                        >
                          {index + 1}
                        </span>
                        <Button
                          onClick={() => eliminarRegistro(r.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          aria-label={`Eliminar registro ${index + 1}`}
                        >
                          <Trash2 className="w-4 h-4 mr-1" aria-hidden="true" />
                          Eliminar
                        </Button>
                      </div>
                      <dl className="space-y-1.5 text-sm">
                        <FilaMovil etiqueta="Tipo de documento" valor={r.tipoDocumento} />
                        <FilaMovil etiqueta="Nro. de documento" valor={r.numeroDocumento} />
                        <FilaMovil etiqueta="Razón social" valor={r.razonSocial} />
                        <FilaMovil etiqueta="Fecha inicio" valor={r.fechaInicio} />
                        <FilaMovil etiqueta="Fecha cese" valor={r.fechaCese} />
                      </dl>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* ===== Pie de ayuda institucional ===== */}
          <div
            className="rounded-xl p-4 sm:p-5 border"
            style={{ backgroundColor: "#EEF3FB", borderColor: "#E0E7F1" }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                  <Headphones className="w-6 h-6" style={{ color: COLOR_ACENTO }} aria-hidden="true" />
                </div>
                <p className="text-sm font-medium leading-tight" style={{ color: COLOR_ACENTO }}>
                  Para más información
                  <br />
                  comuníquese con:
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 w-[190px] h-[80px]">
                  <p className="text-xs font-medium text-center leading-tight" style={{ color: COLOR_ACENTO }}>
                    Plataforma Única de
                    <br />
                    Atención Virtual
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: COLOR_ACENTO }}>
                      <Phone className="w-3 h-3 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-base font-bold whitespace-nowrap" style={{ color: COLOR_ACENTO }}>
                      (01) 640-8655
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-between bg-white rounded-xl px-4 py-2 shadow-sm border border-gray-100 w-[190px] h-[80px]">
                  <p className="text-xs font-medium text-center leading-tight" style={{ color: COLOR_ACENTO }}>
                    Aló MAC
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: COLOR_ACENTO }}>
                      <Phone className="w-3 h-3 text-white" aria-hidden="true" />
                    </div>
                    <span className="text-base font-bold" style={{ color: COLOR_ACENTO }}>
                      (1800)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#D6E4F7" }}>
                  <ShieldCheck className="w-6 h-6" style={{ color: COLOR_ACENTO }} aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs leading-tight" style={{ color: COLOR_ACENTO }}>
                    Sólo para uso del
                  </p>
                  <p className="text-sm font-bold leading-tight" style={{ color: COLOR_ACENTO }}>
                    FONAVISTA TITULAR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function CampoSoloLectura({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1.5">
      <span className="block text-sm font-medium text-gray-500">{label}</span>
      <div className="h-12 flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 text-base font-semibold text-gray-900 truncate" title={value}>
        {value}
      </div>
    </div>
  )
}

function FilaMovil({ etiqueta, valor }: { etiqueta: string; valor: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-gray-100 pb-1.5 last:border-b-0">
      <dt className="text-gray-500">{etiqueta}</dt>
      <dd className="font-semibold text-gray-900 text-right">{valor}</dd>
    </div>
  )
}
