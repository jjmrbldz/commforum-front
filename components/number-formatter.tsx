'use client'

import { cn } from '@/lib/utils'

interface NumberFormatterProps {
  value: number | null | undefined
  prefix?: string
  suffix?: string
  className?: string
  fallback?: string // Optional fallback display
}

export function NumberFormatter({
  value,
  prefix = '',
  suffix = '',
  className,
  fallback = '-'
}: NumberFormatterProps) {
  const isValid = typeof value === 'number' && !isNaN(value)
  const isNegative = isValid && value! < 0

  if (!isValid) {
    return <span className={cn('text-muted-foreground', className)}>{fallback}</span>
  }

  const formatted = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  }).format(value!)

  return (
    <span className={cn(isNegative && 'text-red-500', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
