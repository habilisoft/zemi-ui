import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getSubdomain() {
  if (window.location.hostname.split('.')[0] === 'localhost' || (window.location.hostname.split('.')[1] === 'ngrok')) {
    return 'local';
  }
  return window.location.hostname.split('.')[0];
}


