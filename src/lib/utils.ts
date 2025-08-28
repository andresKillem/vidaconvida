import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextSunday(): Date {
  const now = new Date()
  const dayOfWeek = now.getDay()
  const hour = now.getHours()
  const minute = now.getMinutes()
  
  let daysUntilSunday = (7 - dayOfWeek) % 7
  if (daysUntilSunday === 0 && (hour > 10 || (hour === 10 && minute >= 30))) {
    daysUntilSunday = 7
  }
  
  const nextService = new Date(now)
  nextService.setDate(now.getDate() + daysUntilSunday)
  nextService.setHours(10, 30, 0, 0)
  
  return nextService
}

export function formatTimeUntil(targetDate: Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
} {
  const now = new Date()
  const diff = targetDate.getTime() - now.getTime()
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
  
  return { days, hours, minutes, seconds }
}