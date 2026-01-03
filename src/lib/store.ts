import { create } from "zustand";
import { User } from "./types";

interface AppState {
  profile: User | null;
  setProfile: (p: User | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  profile: null,
  setProfile: (p) => {
    set({ profile: p });
  },
}));
