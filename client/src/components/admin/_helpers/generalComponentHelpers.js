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

