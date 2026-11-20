"use client"

import * as React from "react"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"


/* -------------------------------------------------------------------------
 * Types
 * ---------------------------------------------------------------------- */

type ToastVariant = "default" | "destructive"

interface ToasterToast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: ToastVariant
  open?: boolean
  className?: string
}

type Toast = Omit<ToasterToast, "id">

/* -------------------------------------------------------------------------
 * State management (module-level store, no external deps)
 * ---------------------------------------------------------------------- */

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 10000

type Action =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

interface State {
  toasts: ToasterToast[]
}

let count = 0
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({ type: "REMOVE_TOAST", toastId })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((t) => addToRemoveQueue(t.id))
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined ? { ...t, open: false } : t
        ),
      }
    }

    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] }
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) }
  }
}

const listeners: Array<(state: State) => void> = []
let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => listener(memoryState))
}

function toast({ ...props }: Toast) {
  const id = genId()

  const update = (next: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...next, id } })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({ type: "ADD_TOAST", toast: { ...props, id, open: true } })

  return { id, dismiss, update }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

/* -------------------------------------------------------------------------
 * UI primitives (plain divs + Tailwind, no Radix)
 * ---------------------------------------------------------------------- */

const toastVariantClasses: Record<ToastVariant, string> = {
  default: "border bg-background text-foreground",
  destructive: "border-destructive bg-destructive text-destructive-foreground",
}

function ToastItem({
  title,
  description,
  action,
  variant = "default",
  open = true,
  className,
  onClose,
}: ToasterToast & { onClose: () => void }) {
  if (!open) return null

  return (
    <div
      role="status"
      data-state={open ? "open" : "closed"}
      className={cn(
        "group pointer-events-auto relative flex w-full m-2 items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all",
        "animate-in slide-in-from-top-full fade-in-80 sm:slide-in-from-bottom-full",
        toastVariantClasses[variant],
        className
      )}
    >
      <div className="grid gap-1">
        {title && <div className="text-sm font-semibold">{title}</div>}
        {description && <div className="text-sm opacity-90">{description}</div>}
      </div>
      {action}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}

/* -------------------------------------------------------------------------
 * Toaster (mount this once in your root layout)
 * ---------------------------------------------------------------------- */

function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <ol className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 m-4 sm:top-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} onClose={() => dismiss(t.id)} />
      ))}
    </ol>
  )
}

export { useToast, toast, Toaster }