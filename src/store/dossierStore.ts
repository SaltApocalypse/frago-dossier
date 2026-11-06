import { assetUrl } from "../lib/assets";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DossierData {
  nickname: string;
  rank: string;
  gameVersion: string;
  avatar: string;
}

const DEFAULT_AVATAR = assetUrl("assets/default-avatar.png");

export const DEFAULT_DOSSIER: DossierData = {
  nickname: "FREEL",
  rank: "foundation",
  gameVersion: "founders",
  avatar: DEFAULT_AVATAR,
};

interface DossierState extends DossierData {
  setField: <K extends keyof DossierData>(
    key: K,
    value: DossierData[K]
  ) => void;
  reset: () => void;
}

export const useDossierStore = create<DossierState>()(
  persist(
    (set) => ({
      ...DEFAULT_DOSSIER,
      setField: (key, value) =>
        set({ [key]: value } as Partial<DossierData>),
      reset: () => set({ ...DEFAULT_DOSSIER }),
    }),
    {
      name: "frago-dossier:v1",
      version: 1,
    }
  )
);
