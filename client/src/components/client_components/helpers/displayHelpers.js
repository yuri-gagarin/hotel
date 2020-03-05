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

