// @flow

export const setImagePath = (path?: string): string => {
  if (path && typeof path === "string" && path.length > 0) {
    const imagePathArr = path.split("/");
    return "/" + imagePathArr.slice(1).join("/")
  } else {
    return "/assets/images/roomStock1.jpeg";
  }    
};

/**
 * Trims string to specific length.
 * @param {string} string String to trim.
 * @param {number} length Length to trim to.
 */
export const trimStringToSpecificLength = (string: string, length?: number): string => {
  if (!string) {
    return "No string to trim..."
  }
  if (string && typeof string === "string") {
    if (length && typeof length === "number") {
      return string.trim().slice(0, length - 1) + "...";
    } else {
      return string.trim().slice(0, 10) + "...";
    }
  } else {
    return "Argument must be a string...";
  }
};
/**
 * Capitalizes the string
 * @param {string} string String to capitalize
 */
export const capitalizeString = (string: string): string => {
  if (string && typeof string === "string" && string.length > 0) {
    return string.slice(0, 1).toUpperCase() + string.slice(1);
  } else if (typeof string === "string" && string.length === 0) {
    return "";
  } else {
    throw new Error("Invalid argument, expected a string");
  }
};

export const setStringTranslation = (stringToTranslate: string, i18nLanguage: string): string => {
  let descriptionText: string;
  if (!stringToTranslate || stringToTranslate.length === 0) {
    return "Nothing to translate...";
  }

  const translations = stringToTranslate.split(/(<en>|<ru>|<uk>)/g).filter((text) => text.length !== 0);
  // if string is not split according to translation, return string //
  if (translations.length === 1) {
    return translations[0];
  }

  if (i18nLanguage === "en" && translations.indexOf("<en>") !== -1) {
    descriptionText = translations[translations.indexOf("<en>") + 1];
  } else if (i18nLanguage === "ru" && translations.indexOf("<ru>") !== -1) {
    descriptionText = translations[translations.indexOf("<ru>") + 1];
  } else if (i18nLanguage === "uk" && translations.indexOf("<uk>") !== -1) {
    descriptionText = translations[translations.indexOf("<uk>") + 1];
  } else {
    descriptionText = "No translation in set language";
  }
  return descriptionText;
};


export const isEmpty = (obj: any): boolean => {
  console.log(Object.keys(obj))
  return obj && Object.keys(obj).length === 0;
};

type DataObject = {
  [string]: any,
}
export const objectValuesEmpty = (obj: any): boolean => {
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
      const values = Object.values(obj);
      if (values.length == 0) {
        return true;
      } else {
        for (const val of values) {
          if (val) {
            if (Array.isArray(val) && val.length === 0) {
              continue;
            } else if (typeof val === "object") {
              const obj: any = val;
              const keys = Object.keys(obj);
              for (const key of keys) {
                if (obj[key]) {
                  return false;
                }
              }
              continue;
            } else {
              return false;
            }
          }
        }
        return true;
      }
    } else {
      return true;
    }
  } else {
    throw new TypeError("Invalid argument, expected type <object>");
  }
};

export const validateEmail = (emailAdress: string): boolean => { 
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailAdress)) {
    return true;
  }
  return false;
};
export const checkEmptyString = (string: string): boolean => {
  return (typeof string === "string") && (string.length > 0) ? false : true;
};

