import type React from "react"
import { ArrowRight } from "lucide-react"

interface IconWithArrowProps {
  Icon: React.ComponentType<{ className?: string }>
  completed: boolean
  size?: "sm" | "md" | "lg"
  title?: string
}

export function IconWithArrow({ Icon, completed, size = "md", title }: IconWithArrowProps) {
  // Configuración de tamaños mejorada
  const sizeConfig = {
    sm: {
      container: "h-12 w-12",
      icon: "h-5 w-5",
      arrow: "h-4 w-4",
      arrowContainer: "h-6 w-6",
      position: "-right-1 -bottom-1",
    },
    md: {
      container: "h-16 w-16",
      icon: "h-7 w-7",
      arrow: "h-5 w-5",
      arrowContainer: "h-7 w-7",
      position: "-right-1.5 -bottom-1.5",
    },
    lg: {
      container: "h-20 w-20",
      icon: "h-9 w-9",
      arrow: "h-6 w-6",
      arrowContainer: "h-8 w-8",
      position: "-right-2 -bottom-2",
    },
  }

  const config = sizeConfig[size]

  return (
    <div className="relative inline-block">
      {/* Contenedor principal del icono */}
      <div
        className={`
          relative flex items-center justify-center rounded-full text-white
          transition-all duration-300 ease-in-out transform hover:scale-105
          ${config.container}
          ${
            completed
              ? "bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-lg shadow-green-500/25 ring-2 ring-green-400/30"
              : "bg-gradient-to-br from-slate-400 via-slate-500 to-slate-600 shadow-lg shadow-slate-500/20 ring-2 ring-slate-400/20"
          }
        `}
        aria-label={title || "Paso del proceso"}
        role="img"
      >
        {/* Efecto de brillo interno */}
        <div className="absolute inset-0.5 rounded-full bg-gradient-to-t from-transparent via-white/10 to-white/20 pointer-events-none" />

        {/* Icono principal */}
        <Icon className={`${config.icon} relative z-10 drop-shadow-sm`} aria-hidden="true" />
      </div>

      {/* Flecha superpuesta mejorada */}
      {completed && (
        <div
          className={`
            absolute ${config.position} z-20
            flex items-center justify-center rounded-full
            bg-white shadow-lg shadow-black/10
            ring-2 ring-green-500/30
            transition-all duration-300 ease-in-out
            hover:shadow-xl hover:ring-green-500/50
            ${config.arrowContainer}
          `}
          aria-hidden="true"
        >
          {/* Fondo con gradiente sutil */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white to-green-50" />

          {/* Flecha con mejor diseño */}
          <ArrowRight
            className={`
              ${config.arrow} text-green-600 relative z-10
              transition-transform duration-200 ease-in-out
              group-hover:translate-x-0.5
            `}
            strokeWidth={2.5}
          />
        </div>
      )}

      {/* Efecto de pulso para estados completados */}
      {completed && (
        <div
          className={`
            absolute inset-0 rounded-full
            animate-ping bg-green-400/20
            ${config.container}
          `}
          style={{ animationDuration: "3s" }}
        />
      )}
    </div>
  )
}
