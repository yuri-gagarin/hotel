import fs from "fs";

export const checkForExistingPath = (absoluteImagePath) => {
  return new Promise((resolve, reject) => {
    fs.access(absoluteImagePath, fs.constants.W_OK, fs.constants.R_OK, (error) => {
      if(error) {
        // if error ENOENT make directory //
        if (error.code === "ENOENT") {
          fs.mkdir(absoluteImagePath, { recursive: true }, (error) => {
            if (error) {
              console.error(error);
              reject(error);
            }
            resolve(absoluteImagePath);
          });
        } else {
          console.error(error);
          reject(error);
        }
      } else {
        reject(absoluteImagePath);
      }
    });
  });
};