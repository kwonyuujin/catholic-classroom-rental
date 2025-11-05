"use client"

import { useEffect, useState } from "react"
import { CheckCircle, AlertCircle, X } from "lucide-react"

interface Toast {
  id: string
  message: string
  type: "success" | "error" | "info"
  duration?: number
}

let toastId = 0
let showToastFn: ((toast: Omit<Toast, "id">) => void) | null = null

export function useToast() {
  return {
    showToast: (toast: Omit<Toast, "id">) => {
      if (showToastFn) {
        showToastFn(toast)
      }
    },
  }
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([])

  useEffect(() => {
    showToastFn = (toast: Omit<Toast, "id">) => {
      const id = `toast-${++toastId}`
      const newToast: Toast = { ...toast, id, duration: toast.duration || 4000 }

      setToasts((prev) => [...prev, newToast])

      if (newToast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, newToast.duration)
      }
    }

    return () => {
      showToastFn = null
    }
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start gap-3 p-4 rounded-lg shadow-lg animate-in fade-in slide-in-from-top-4 duration-300 ${
            toast.type === "success"
              ? "bg-green-50 border border-green-200"
              : toast.type === "error"
                ? "bg-red-50 border border-red-200"
                : "bg-blue-50 border border-blue-200"
          }`}
        >
          {toast.type === "success" && <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />}
          {toast.type === "error" && <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />}
          {toast.type === "info" && <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />}

          <div className="flex-1">
            <p
              className={
                toast.type === "success" ? "text-green-800" : toast.type === "error" ? "text-red-800" : "text-blue-800"
              }
            >
              {toast.message}
            </p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="text-muted-foreground hover:text-foreground flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
