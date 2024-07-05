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


export function randomPassword(length: number) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
