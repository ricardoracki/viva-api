import { create } from 'zustand'

type UseToastParams = {
  visible?: boolean
  text: string
  time?: number
  variant: 'success' | 'error' | 'warning' | 'default'
}

type UseToastActions = {
  show: (params: UseToastParams) => void
  hide: () => void
}

export const useToast = create<UseToastParams & UseToastActions>((set) => ({
  visible: false,
  text: '',
  variant: 'default',
  time: 3000,
  show: (params) =>
    set((prev) => ({ ...prev, time: 3000, ...params, visible: true })),
  hide: () => set((prev) => ({ ...prev, visible: false })),
}))
