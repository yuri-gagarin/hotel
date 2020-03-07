import ServiceImage from "./../models/ServiceImage";

export default {
  uploadImage: (req, res) => {
    const imageUploadResult = req.locals.serviceImageUpload;
    if (imageUploadResult.success) {
      return ServiceImage.create({
        path: imageUploadResult.imagePath
      })
      .then((serviceImage) => {
        return res.status(200).json({
          responseMsg: "Uploaded an image",
          newImage: serviceImage
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "A database error occured",
          error: error
        });
      });
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  deleteImage: (req, res) => {
    const { imageId } = req.params;
    return ServiceImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then((response) => {
        return res.status(200).json({
          responseMsg: "Deleted the image"
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "A delete error occured",
          error: error
        });
      });
  }
}