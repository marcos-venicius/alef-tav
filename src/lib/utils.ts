import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shuffleArray<T>(array: Array<T>): Array<T> {
  return array
    .map(x => ({ x, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.x)
}

export function isTrue(text?: string) {
  if (text === undefined || text === null) return false

  if (['1', 'true', 'yes', 'y', 's', 'sim'].includes(text)) return true

  return false
}
