"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { PatientAnswers, Therapist } from "./types";
import { defaultAnswers } from "./data/options";
import { therapists as demoTherapists } from "./data/therapists";
import { normalizePhotoSrc } from "./utils";

export type ExcludedEntry = {
  reason: string;
};

type AppState = {
  hasHydrated: boolean;
  answers: PatientAnswers;
  therapists: Therapist[];
  shortlist: string[];
  maybe: string[];
  excluded: Record<string, ExcludedEntry>;
  compareList: string[];
  setHasHydrated: (value: boolean) => void;
  setAnswers: (updater: (prev: PatientAnswers) => PatientAnswers) => void;
  setTherapists: (therapists: Therapist[]) => void;
  resetAnswers: () => void;
  toggleShortlist: (id: string) => void;
  toggleMaybe: (id: string) => void;
  excludeCandidate: (id: string, reason?: string) => void;
  clearExcluded: (id: string) => void;
  toggleCompare: (id: string) => void;
  setCompareList: (ids: string[]) => void;
  upsertTherapist: (therapist: Therapist) => void;
  deleteTherapist: (id: string) => void;
  resetTherapists: () => void;
};

const resolvePhoto = (therapist: Therapist) => {
  const legacyImage = (therapist as { image?: string }).image;
  const candidate = therapist.photo?.trim() || legacyImage?.trim();
  if (candidate) {
    return normalizePhotoSrc(candidate);
  }
  const fallback = demoTherapists.find((item) => item.id === therapist.id)?.photo;
  return normalizePhotoSrc(fallback);
};

const normalizeTherapist = (therapist: Therapist): Therapist => ({
  ...therapist,
  photo: resolvePhoto(therapist)
});

const initialTherapists = demoTherapists.map(normalizeTherapist);

const normalizeAnswers = (answers: PatientAnswers): PatientAnswers => ({
  ...defaultAnswers,
  ...answers,
  preferences: {
    ...defaultAnswers.preferences,
    ...(answers.preferences ?? {})
  },
  availability: {
    ...defaultAnswers.availability,
    ...(answers.availability ?? {})
  }
});

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      hasHydrated: false,
      answers: defaultAnswers,
      therapists: initialTherapists,
      shortlist: [],
      maybe: [],
      excluded: {},
      compareList: [],
      setHasHydrated: (value) => set({ hasHydrated: value }),
      setAnswers: (updater) => set((state) => ({ answers: updater(state.answers) })),
      resetAnswers: () => set({ answers: defaultAnswers }),
      toggleShortlist: (id) =>
        set((state) => {
          const exists = state.shortlist.includes(id);
          return {
            shortlist: exists
              ? state.shortlist.filter((item) => item !== id)
              : [...state.shortlist, id],
            maybe: state.maybe.filter((item) => item !== id)
          };
        }),
      toggleMaybe: (id) =>
        set((state) => {
          const exists = state.maybe.includes(id);
          return {
            maybe: exists ? state.maybe.filter((item) => item !== id) : [...state.maybe, id],
            shortlist: state.shortlist.filter((item) => item !== id)
          };
        }),
      excludeCandidate: (id, reason) =>
        set((state) => ({
          excluded: { ...state.excluded, [id]: { reason: reason ?? "" } },
          shortlist: state.shortlist.filter((item) => item !== id),
          maybe: state.maybe.filter((item) => item !== id),
          compareList: state.compareList.filter((item) => item !== id)
        })),
      clearExcluded: (id) =>
        set((state) => {
          const nextExcluded = { ...state.excluded };
          delete nextExcluded[id];
          return { excluded: nextExcluded };
        }),
      toggleCompare: (id) =>
        set((state) => {
          const exists = state.compareList.includes(id);
          if (exists) {
            return { compareList: state.compareList.filter((item) => item !== id) };
          }
          if (state.compareList.length >= 3) {
            return state;
          }
          return { compareList: [...state.compareList, id] };
        }),
      setCompareList: (ids) => set({ compareList: ids.slice(0, 3) }),
      setTherapists: (therapists) => set({ therapists: therapists.map(normalizeTherapist) }),
      upsertTherapist: (therapist) =>
        set((state) => {
          const normalized = normalizeTherapist(therapist);
          const existingIndex = state.therapists.findIndex((item) => item.id === normalized.id);
          if (existingIndex === -1) {
            return { therapists: [...state.therapists, normalized] };
          }
          const updated = [...state.therapists];
          updated[existingIndex] = normalized;
          return { therapists: updated };
        }),
      deleteTherapist: (id) =>
        set((state) => ({ therapists: state.therapists.filter((item) => item.id !== id) })),
      resetTherapists: () => set({ therapists: initialTherapists })
    }),
    {
      name: "psy-matching-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        answers: state.answers,
        therapists: state.therapists,
        shortlist: state.shortlist,
        maybe: state.maybe,
        excluded: state.excluded,
        compareList: state.compareList
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setAnswers((prev) => normalizeAnswers(prev));
          state.setTherapists(state.therapists);
          state.setHasHydrated(true);
        }
      }
    }
  )
);
