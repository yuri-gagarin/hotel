import DiningEntertainmentModel from "../models/DiningEntertainment";
import DiningModelImage from "../models/DiningImage";
import MenuImage from "../models/MenuImage";
// helpers //
import { deleteFile } from "./helpers/apiHelpers";

export default {
  getDiningModels: (_req, res) => {
    return DiningEntertainmentModel.find({})
      .populate("images", ["_id", "path"])
      .populate("menuImages", ["_id", "path"])
      .then((foundModels) => {
        return res.status(200).json({
          responseMsg: "Success",
          diningEntModels: foundModels
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },
  createDiningModel: (req, res) => {
    const { title, hours, address, description, optionType } = req.body.diningModelData;
    const { images = [], menuImages = []} = req.body;

    const imgIds = images.length > 0 ? images.map((img) => img._id) : [];
    const menuImgIds = menuImages.length > 0 ? menuImages.map((img) => img._id) : [];

    return DiningEntertainmentModel.create({
      title, 
      hours,
      address,
      description,
      optionType,
      live: false,
      images: [ ...images ],
      menuImages: [ ...menuImgIds ],
      createdAt: new Date(Date.now()), 
      editedAt: new Date(Date.now()) 
    })
    .then((createdModel) => {
      return DiningEntertainmentModel.findOne(
        { _id: createdModel._id }
      )
      .populate("images")
      .populate("menuImages")
      .exec()       
    })
    .then((newDiningModel) => {
      return res.status(200).json({
        responseMsg: "New Dining/Entertainment option created",
        newDiningEntModel: newDiningModel
      });
    })
    .catch((error) => {
      console.error(error)
      return res.status(500).json({
        responseMsg: "It seems an error occured",
        error: error
      })
    }); 
    
  },

  updateDiningModel: (req, res) => {
    let status, foundDiningModel;
    console.log(req.body)
    const { diningModelId } = req.params;
    const { diningModelData, images = [], menuImages = [] } = req.body;
    const { title, description, hours } = diningModelData;

    const updatedDiningModelImages = images.map((img) => img._id );
    const updatedMenuImages = menuImages.map((img) => img._id);

    return DiningEntertainmentModel.findOneAndUpdate(
      { _id: diningModelId },
      {
        $set: { 
          title: title,
          description: description,
          hours: hours,
          images: [ ...updatedDiningModelImages ],
          menuImages: [ ...updatedMenuImages ],
          editedAt: new Date(Date.now())
        },
      },
      { new: true }
    )
    .populate("images")
    .populate("menuImages")
    .exec()
    .then((diningModel) => {
      console.log(diningModel)
      return res.status(200).json({
        responseMsg: "Dining/Entertainment option updated",
        updatedDiningEntModel: diningModel
      });
    })
    .catch((error) => {
      console.error(error);
      return res.status(status || 500).json({
        responseMsg: "An error occured",
        error: error
      });
    });
  },

  deleteDiningModel: (req, res) => {
    const { diningModelId } = req.params;
    // 
    const modelImagePaths = [];
    const modelImageIds = []
    const menuImagePaths = [];
    const menuImageIds = [];

    return (
      DiningEntertainmentModel
        .findOne({ _id: diningModelId })
        .populate("images").populate("menuImages")
        .exec()
    )
    .then((modelToDelete) => {
      if (!modelToDelete) {
        throw new Error("Did not find model to delete");
      } else {
        let imageDeletePromises = [];
        let menuImageDeletePromises = [];
        // delete images first //
        if (modelToDelete.populated("images")) {
          for (const image of modelToDelete.images) {
            modelImagePaths.push(image.path);
            modelImageIds.push(image._id);
          }
        }
        if (modelToDelete.populated("menuImages")) {
          for (const image of modelToDelete.menuImages) {
            menuImagePaths.push(image.path);
            menuImageIds.push(image._id);
          }
        }

        if (modelImagePaths.length > 0) {
          imageDeletePromises = modelImagePaths.map((imgPath) => deleteFile(imgPath));
        }
        if (menuImagePaths.length > 0) {
          menuImageDeletePromises = menuImagePaths.map((imgPath) => deleteFile(imgPath));
        }
        return Promise.all([ ...imageDeletePromises, ...menuImageDeletePromises ]);
      }
    })
    .then((delArray) => {
      if (delArray && delArray.length > 0) {
        return Promise.all([
          DiningModelImage.deleteMany({ _id: modelImageIds }).exec(),
          MenuImage.deleteMany({ _id: menuImageIds }).exec()
        ])
      } else {
        return Promise.all([]);
      }
    })
    .then((_res) => {
      return DiningEntertainmentModel.findOneAndDelete({ _id: diningModelId }).exec()
    })
    .then((deletedDiningModel) => {
      return res.status(200).json({
        responseMsg: "Successfully deleted",
        deletedDiningEntModel: deletedDiningModel
      })
    })
    .catch((error) => {
      return res.status(500).json({
        responseMsg: "An error occured deleting the room",
        error: error
      });
    });
  },

  uploadImage: (req, res) => {
    const { diningModelId } = req.params;
    const { success, imagePath } = req.locals.diningModelImageUpload;

    let uploadedImage; let updatedDiningEntModel;
    console.log(168)
    if (success) {
      // check if id is present and upload is performed on existing model /
      if (diningModelId) {
        return (
          DiningModelImage.create({ diningModel: diningModelId, path: imagePath, uploadedAt: new Date(Date.now()) })
        )
        .then((imageData) => {
          uploadedImage = imageData;
          return (
            DiningEntertainmentModel.findOneAndUpdate(
              { _id: diningModelId },
              { $push: { images: uploadedImage._id } },
              { new: true }
            )
            .populate("images")
            .populate("menuImages")
            .exec()
          );
        })
        .then((diningEntModel) => {
          updatedDiningEntModel = diningEntModel;
          return res.status(200).json({
            responseMsg: "Image uploaded",
            newImage: uploadedImage,
            updatedDiningEntModel: updatedDiningEntModel
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "A database error occured",
            error: error
          });
        });
      } else {
        // image is being uploaded on a new not created model //
        return DiningModelImage.create({
          path: imagePath,
          uploadedAt: new Date(Date.now())
        })
        .then((diningModelImage) => {
          return res.status(200).json({
            responseMsg: "Uploaded an image",
            newImage: diningModelImage
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "A database error occured",
            error: error
          });
        });
      }
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  uploadMenuImage: (req, res) => {
    const { modelId } = req.params;
    const imageUploadResult = req.locals.menuImageUpload;
    let createdMenuImage, updatedDiningEntModel;
    
    if (imageUploadResult.success) {
      // check if request is made on existing model //
      if (modelId) {
        return MenuImage.create({
          path: imageUploadResult.imagePath, diningModel: modelId, uploadedAt: new Date(Date.now())
        })
        .then((menuImage) => {
          createdMenuImage = menuImage;
          return DiningEntertainmentModel.findOneAndUpdate(
            { id: modelId },
            { $push: { menuImages: menuImage._id } },
            { new: true }
          )
          .populate("images")
          .populate("menuImages")
          .exec()
        })
        .then((diningEntModel) => {
          updatedDiningEntModel = diningEntModel;
          return res.status(200).json({
            responseMsg: "Uploaded an image",
            newImage: createdMenuImage,
            updatedDiningEntModel: updatedDiningEntModel
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "A database error occured",
            error: error
          });
        });
      } else {
        console.log(275)
        return (
          MenuImage.create({ path: imageUploadResult.imagePath, uploadedAt: new Date(Date.now()) })
        )
        .then((menuImage) => {
          return res.status(200).json({
            responseMsg: "Uploaded an image",
            newImage: menuImage
          })
        })
        .catch((error) => {
          console.log(error)
          return res.status(500).json({
            responseMsg: "A database error occured",
            error: error
          });
        });
      }
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  deleteImage: (req, res) => {
    const { imageId } = req.params;
    let deletedImageData; let updatedDiningEntModel;

    return DiningModelImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          deletedImageData = deletedImg;
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then((response) => {
        if (deletedImg.diningModel) {
          const { _id: imageId, diningModel: modelIdToupdate } = deletedImg;
          return DiningEntertainmentModel.findOneAndUpdate(
            { _id: modelIdToupdate },
            { $pull: { images: imageId } },
            { new: true }
          )
          .populate("images")
          .populate("menuImages")
          .exec();
        } else {
          return Promise.resolve()
        }
      })
      .then((updatedModel) => {
        updatedDiningEntModel = updatedModel ? updatedModel : null;
        return res.status(200).json({
          responseMsg: "Deleted the image",
          deletedImage: deletedImageData,
          updatedDiningEntModel: updatedDiningEntModel
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(500).json({
          responseMsg: "A delete error occured",
          error: error
        });
      });
  },

  deleteMenuImage: (req, res) => {
    const { imageId } = req.params;
    let deletedImageData; let updatedDiningEntModel;

    return MenuImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        deletedImageData = deletedImg;
        if (deletedImg) {
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then((response) => {
        const { _id: imageId, diningModel: modelIdToUpdate } = deletedImageData;
        if (modelIdToUpdate) {
          return DiningEntertainmentModel.findOneAndUpdate(
            { _id: modelIdToUpdate },
            { $pull: { menuImages: imageId } },
            { new: true }
          )
          .populate("images")
          .populate("menuImages")
          .exec();
        } else {
          return Promise.resolve();
        }
      })
      .then((updatedModel) => {
        updatedDiningEntModel = updatedModel ? updatedModel : null;
        return res.status(200).json({
          responseMsg: "Deleted the image",
          deletedImage: deletedImageData,
          updatedDiningEntModel: updatedDiningEntModel
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
};
