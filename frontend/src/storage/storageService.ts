import { mmkvStorage } from "./mmkvStorage"
import { secureStorage } from "./secureStorage"

export const storage = {
  getItem: async (k: string) => mmkvStorage.get(k),
  setItem: async (k: string, v: string) => mmkvStorage.set(k, v),
  removeItem: async (k: string) => mmkvStorage.remove(k),
  getSecure: secureStorage.get,
  setSecure: secureStorage.set,
  removeSecure: secureStorage.remove,
}