import fs from "fs";

export const deleteFile = (filePath, data = null) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (error) => {
      if (error) {
        if(error.code === "ENOENT") {
          resolve({ success: true, responseMsg: "Nothing to delete", data: null });
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
