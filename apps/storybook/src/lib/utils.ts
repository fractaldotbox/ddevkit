import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function isDeepEqual(obj1: Record<any, any>, obj2: Record<any, any>) {
	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);
	if (keys1.length !== keys2.length) {
		return false;
	}
	for (const key of keys1) {
		if (!obj2.hasOwnProperty(key)) {
			return false;
		}
		if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
			if (!isDeepEqual(obj1[key], obj2[key])) {
				return false;
			}
		} else {
			if (obj1[key] !== obj2[key]) {
				return false;
			}
		}
	}
	return true;
}
