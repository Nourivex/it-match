import { fallbackData } from "./fallback-data.js";
import { fallbackDataEn } from "./fallback-data.en.js";

export function getLocalizedFallbackData(locale) {
  return locale === "en" ? fallbackDataEn : fallbackData;
}
