// @flow
export const setUploadedImgPath = (path: string): string => {
  if (!path) {
    return "/assets/images/roomStock1.jpeg";
  } else {
    const pathArr = path.split("/");
    return "/" + pathArr[1] + "/" + pathArr[2] + "/" + pathArr[3];
  }
};

export const simplifyPath = (path: string): string => {
  if (!path) {
    return "/assets/images/roomStock1.jpeg";
  } else {
    const pathArr = path.split("/");
    return "/" + pathArr[3] + "/" + pathArr[4] + "/" + pathArr[5];
  }
};


export const setImagePath = (path?: string): string => {
  if (!path) return "";
  const imagePathArr = path.split("/");
  return "/" + imagePathArr.slice(1).join("/")
}

/**
 * Trims string to specific length.
 * @param {string} string String to trim.
 * @param {number} length Length to trim to.
 */
export const trimStringToSpecificLength = (string: string, length: number): string => {
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
  } else if (string && typeof string === "string" && string.length === 0) {
    return "";
  } else {
    throw new Error("Invalid argument, expected a string");
  }
};


export const isEmpty = (obj: any): boolean => {
  console.log(Object.keys(obj))
  return obj && Object.keys(obj).length === 0;
};

