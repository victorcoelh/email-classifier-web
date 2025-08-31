/* eslint-disable @typescript-eslint/no-unused-vars */
import { create } from "zustand";

export type EmailResult = {
  classification: string;
  confidence: number;
  suggested_answer: string;
};

type InputType = "file" | "text";
type AppStatus = "idle" | "processing" | "complete" | "failed";

interface AppState {
  inputType: InputType;
  appStatus: AppStatus;
  analysisResult: Array<EmailResult>;
  currentFile: number;
  userContent: { userFiles: Array<File>; userText: string };

  selectButton: (type: InputType) => void;
  setStatus: (status: AppStatus) => void;
  setResult: (result: Array<EmailResult>) => void;
  setCurrentFile: (index: number) => void;
  updateFiles: (files: Array<File>) => void;
  updateText: (text: string) => void;
}

export const useAppStore = create<AppState>()((set) => ({
  inputType: "text",
  appStatus: "idle",
  analysisResult: [],
  currentFile: 0,
  userContent: {
    userFiles: [],
    userText: "",
  },

  selectButton: (type) => set((_state) => ({ inputType: type })),
  setStatus: (status) => set((_state) => ({ appStatus: status })),
  setResult: (result) => set((_state) => ({ analysisResult: result })),
  setCurrentFile: (index) => set((_state) => ({ currentFile: index })),

  updateFiles: (files) =>
    set((state) => ({ userContent: { ...state.userContent, userFiles: files } })),
  updateText: (text) =>
    set((state) => ({ userContent: { ...state.userContent, userText: text } })),
}));
