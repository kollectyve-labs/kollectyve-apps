"use client"

import * as React from "react"
import { ChevronDown } from 'lucide-react'

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  placeholder?: string
  children: React.ReactNode
}

interface SelectContextValue {
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue>({} as SelectContextValue)

export function Select({ value, onValueChange, placeholder, children }: SelectProps) {
  const [open, setOpen] = React.useState(false)
  const [internalValue, setInternalValue] = React.useState(value)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)

  const handleValueChange = (newValue: string) => {
    setInternalValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !triggerRef.current?.contains(event.target as Node) &&
        !contentRef.current?.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, open, setOpen }}>
      <div className="relative w-[180px]">{children}</div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  const { open, setOpen } = React.useContext(SelectContext)
  const triggerRef = React.useRef<HTMLButtonElement>(null)

  const baseClasses = `
    flex h-9 w-full items-center justify-between rounded-md border 
    border-input bg-transparent px-3 py-2 text-sm shadow-sm 
    ring-offset-background placeholder:text-muted-foreground 
    focus:outline-none focus:ring-1 focus:ring-ring 
    disabled:cursor-not-allowed disabled:opacity-50
  `

  return (
    <button
      ref={triggerRef}
      type="button"
      role="combobox"
      aria-expanded={open}
      className={`${baseClasses} ${open ? 'ring-1 ring-ring' : ''}`}
      onClick={() => setOpen(!open)}
    >
      {children}
      <ChevronDown 
        className={`h-4 w-4 opacity-50 transition-transform ${open ? 'rotate-180' : ''}`} 
      />
    </button>
  )
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = React.useContext(SelectContext)
  return <span className="block truncate">{value || placeholder}</span>
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { open } = React.useContext(SelectContext)
  const contentRef = React.useRef<HTMLDivElement>(null)

  if (!open) return null

  return (
    <div
      ref={contentRef}
      className="
        absolute left-0 top-[calc(100%+5px)] z-50 min-w-[8rem] 
        overflow-hidden rounded-md border bg-popover 
        text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95
      "
    >
      <div className="p-1">{children}</div>
    </div>
  )
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value

  const baseClasses = `
    relative flex w-full cursor-default select-none items-center 
    rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none 
    hover:bg-accent hover:text-accent-foreground
  `

  return (
    <button
      className={`${baseClasses} ${
        isSelected ? 'bg-accent text-accent-foreground' : ''
      }`}
      onClick={() => onValueChange?.(value)}
    >
      {children}
    </button>
  )
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="p-1">{children}</div>
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
}
