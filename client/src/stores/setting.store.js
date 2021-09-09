import create from "zustand";
import { devtools } from "zustand/middleware";

const darkMode = localStorage.getItem("darkMode");

export const useSettingStore = create(
  devtools((set) => ({
    darkMode: darkMode === "true",
    message: {
      show: false,
      type: "SUCCESS",
      text: "",
    },

    setDarkMode: (payload) => {
      localStorage.setItem("darkMode", payload.toString());
      return set({ darkMode: payload });
    },

    setShowMessage: ({ type, text }) =>
      set(() => ({
        message: {
          show: true,
          type,
          text,
        },
      })),

    setHiddenMessage: () =>
      set((state) => ({
        message: {
          ...state.message,
          show: false,
        },
      })),
  }))
);
