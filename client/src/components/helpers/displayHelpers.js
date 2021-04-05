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


export const isEmpty = (obj: any): boolean => {
  console.log(Object.keys(obj))
  return obj && Object.keys(obj).length === 0;
};

export const objectValuesEmpty = (obj: any): boolean => {
  if (obj && typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length > 0) {
      const values = Object.values(obj);
      if (values.length == 0) {
        return true;
      } else {
        for (const val of values) {
          if (val && Array.isArray(val) && val.length > 0) return false;
          if (val && Array.isArray(val) && val.length === 0) continue;
        }
        return true;
      }
    } else {
      return true;
    }
  } else {
    console.log("display helpers 68:");
    console.log(typeof obj)
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

