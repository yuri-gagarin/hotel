import multer from "multer";
import path from "path";
// 
import { checkForExistingPath } from "./helpers/uploaderHelpers";
import { APP_HOME_DIRECTORY } from "../server";


let imagePath, absolutePath, fileName;
const storage = multer.diskStorage({
  destination: (req, file, done) => {
    imagePath = path.join("public", "uploads", "news_post_images");
    absolutePath = path.join(APP_HOME_DIRECTORY, imagePath);

    return checkForExistingPath(absolutePath)
      .then((absolutePath) => {
        done(null, absolutePath);
      })
      .catch((error) => {
        done(error, absolutePath);
      });
  },
  filename: (req, file, done) => {
    const extName = path.extname(file.originalname);
    fileName = file.originalname.split(".")[0] + "_" + Date.now() + extName;
    done(null, fileName);
  }
});

//filter to make sure only allowed file types are allowed
const fileFilter = (req, file, done) => {
  const valid = [".jpeg", ".jpg", ".png"];
  const fileTypes = /jpeg|jpg|gif|png/;
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());

  if (mimeType && extName) {
    return done(null, true);
  }
  //return an error for the wrong file type
  else {
    return done(new Error(`You can only upload the following file types: ${valid.join(", ")}`), false);
  }
};

const diningImageUploader = (req, res, next) => {
  const maxFileSize = 10000000; // max 10mb file size //
  const upload = multer({
    limits: {
      fileSize: maxFileSize
    },
    storage: storage,
    fileFilter: fileFilter
  }).single("newsPostImage");

  //run the upload function
  upload(req, res, function(error) {
    console.log(error);
    //check for MulterError
    if (error instanceof multer.MulterError) {
      console.error(error);
      //account for a file size error
      if (error.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          responseMsg: "File size error",
          error: error,
          errorMsg: `File size should be less than ${maxFileSize/1000000} Mb`
        });
      } else {
        console.error(error);
        return res.status(500).json({
          responseMsg: "Internal Server Error",
          error: error
        });
      }
    } else if (error) {
      return res.status(400).json({
        responseMsg: "Invalid file type",
        error: error
      });
    } else {
      //if uploaded PostImage send postImageUpload object to the next middleware
      if (imagePath && fileName) {
        req.locals = { 
          diningModelImageUpload: {
            responseMsg: "File uploaded",
            success: true,
            imagePath: path.join(imagePath, fileName),
            absolutePath: path.join(absolutePath, fileName)
          }
        };
        return next();
      }
      //else report to next midleware that no upload took place
      else {
        req.locals = { 
          diningModelImageUpload: {
            message: "No file uploaded",
            success: false,
            imagePath: null,
            absolutePath: null
          }
        };
        return next();
      }
    }
  });
};

export default diningImageUploader;