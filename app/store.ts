//@ts-nocheck

import { create } from 'zustand';

interface TimerState {
    forTask: boolean;
    forBreak: boolean;
    setForTask: (isForTask: boolean) => void;
    setForBreak: (isForBreak: boolean) => void;
    toggleForTask: () => void;
    toggleForBreak: () => void;
}

export const useTimerStore = create<TimerState>(
    (set) => ({
        forTask: true,
        forBreak: false,
        setForTask: (isForTask: boolean) => set((state) => ({ ...state, forTask: isForTask })),
        setForBreak: (isForBreak: boolean) => set((state) => ({ ...state, forBreak: isForBreak })),
        toggleForTask: () => set((state) => ({ ...state, forTask: !state.forTask })),
        toggleForBreak: () => set((state) => ({ ...state, forBreak: !state.forBreak })),
    })
);
