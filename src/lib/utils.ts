/**
 * @project Top 100 Frameworks para Prompt Engineering
 * @file lib/utils.ts
 * @description Utilidades generales (cn para clases de Tailwind)
 * @author 686f6c61
 * @repository https://github.com/686f6c61/top-100-frameworks-prompt-engineering
 * @license MIT
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
