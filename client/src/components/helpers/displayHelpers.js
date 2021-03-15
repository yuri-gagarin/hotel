export const setUploadedImgPath = (path) => {
  if (!path) {
    return "/assets/images/roomStock1.jpeg";
  } else {
    const pathArr = path.split("/");
    return "/" + pathArr[1] + "/" + pathArr[2] + "/" + pathArr[3];
  }
};

export const simplifyPath = (path) => {
  if (!path) {
    return "/assets/images/roomStock1.jpeg";
  } else {
    const pathArr = path.split("/");
    return "/" + pathArr[3] + "/" + pathArr[4] + "/" + pathArr[5];
  }
};

export const matchNestedRoute = (path) => {
  
}

export const setImagePath = (path) => {
  const imagePathArr = path.split("/");
  return "/" + imagePathArr.slice(1).join("/")
}

/**
 * Trims string to specific length.
 * @param {string} string String to trim.
 * @param {number} length Length to trim to.
 */
export const trimStringToSpecificLength = (string, length) => {
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


export const isEmpty = (obj) => {
  console.log(Object.keys(obj))
  return obj && Object.keys(obj).length === 0;
};

