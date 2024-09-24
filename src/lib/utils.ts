import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isWeixinBrowser(){
  const ua = navigator.userAgent.toLowerCase();
  return (/micromessenger/.test(ua)) ? true : false ;
}
