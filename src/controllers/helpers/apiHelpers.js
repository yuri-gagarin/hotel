import fs from "fs";

export const deleteFile = (filePath, data = null) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (error, stats) => {
      if (error) {
        if(error.code === "ENOENT") {
          reject(new Error("File not found"));
        }
        else {
          reject(error);
        }
      }
      else {
        fs.unlink(filePath, (error) => {
          if (error) {
            reject(error);
          }
          else {
            if(data) {
              resolve({
                success: true,
                responseMsg: "Successfully deleted",
                data: data
              });
            }
            else {
              resolve({
                success: true,
                responseMsg: "Successfully deleted",
                data: null
              });
            }
          }
        });
      }
    });
  });
};
