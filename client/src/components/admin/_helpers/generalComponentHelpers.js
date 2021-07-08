// @flow

export const getCountryFlag = (languageName: string): string => {
  // add more as needed //
  switch (languageName) {
    case "en": return "uk";
    case "ru": return "ru";
    case "uk": return "ua";
    default: return "us";
  }
};

type LanguageAndFlag = {
  flagType: "uk" | "ru" | "ua";
  messageLanguage: "English" | "Русский" | "Українська";
}
export const getMenuLanguageWithFlag = (languageName: string): LanguageAndFlag => {
  switch (languageName) {
    case "en": return { flagType: "uk", messageLanguage: "English" };
    case "ru": return { flagType: "ru", messageLanguage: "Русский" };
    case "uk": return { flagType: "ua", messageLanguage: "Українська" };
    default: return { flagType: "uk", messageLanguage: "English" };
  }
};


