import { create } from "zustand";

type NavbarState = {
  isOpen: boolean;
  isServicesOpen: boolean;
  toggleNav: () => void;
  toggleServices: (value?: boolean) => void;
};

export const useNavbarStore = create<NavbarState>((set) => ({
  isOpen: false,
  isServicesOpen: false,
  toggleNav: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleServices: (value) =>
    set((state) => ({
      isServicesOpen: value !== undefined ? value : !state.isServicesOpen,
    })),
}));
