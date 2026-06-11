import { MMKV } from "react-native-mmkv"
const mmkv = new MMKV({ id: "uh-app-storage" })
export const mmkvStorage = {
  get: (k: string) => mmkv.getString(k) ?? null,
  set: (k: string, v: string) => mmkv.set(k, v),
  remove: (k: string) => mmkv.delete(k),
  clearAll: () => mmkv.clearAll(),
}