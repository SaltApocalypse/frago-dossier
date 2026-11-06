import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en";
import zh from "./locales/zh";

export type Lang = "en" | "zh";

export const LANG_STORAGE_KEY = "frago-dossier:lang";

export const LANGUAGES: { value: Lang; label: string }[] = [
  { value: "zh", label: "中文" },
  { value: "en", label: "English" },
];

export function getCurrentLang(): Lang {
  return i18n.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function getInitialLang(): Lang {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(LANG_STORAGE_KEY);
  if (saved === "en" || saved === "zh") return saved;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function applyDocumentLang(lang: Lang) {
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getInitialLang(),
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

applyDocumentLang(getCurrentLang());

export function changeLanguage(lang: Lang) {
  i18n.changeLanguage(lang);
  applyDocumentLang(lang);
  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  }
}

export default i18n;
