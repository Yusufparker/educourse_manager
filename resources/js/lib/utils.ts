import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPrice = (price: number) => {
    if (price >= 1_000_000) {
        return `${(price / 1_000_000).toFixed(0)}M`; 
    } else if (price >= 1_000) {
        return `${(price / 1_000).toFixed(0)}k`; 
    } else {
        return price.toString(); 
    }
};
