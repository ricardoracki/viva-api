import { create } from 'zustand'

type UseNavbarParams = {
  isOpen: boolean
  open(): void
  close(): void
  toggle(): void
}

export const useNavbar = create<UseNavbarParams>((set) => ({
  isOpen: false,
  open: () => set((prev) => ({ ...prev, isOpen: true })),
  close: () => set((prev) => ({ ...prev, isOpen: false })),
  toggle: () => set((prev) => ({ ...prev, isOpen: !prev.isOpen })),
}))
