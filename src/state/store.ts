import { create } from 'zustand';

type InputType = 'file' | 'text';

interface AppState {
    input_type: InputType;
    user_file: File | null;
    user_text: string;

    selectButton: (type: InputType) => void;
    updateFile: (file: File | null) => void;
    updateText: (text: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
    input_type: 'text',
    user_file: null,
    user_text: '',

    selectButton: (type) => set((_state) => ({input_type: type })),
    updateFile: (file) => set((_state) => ({ user_file: file })),
    updateText: (text) => set((_state) => ({ user_text: text }))
}));
