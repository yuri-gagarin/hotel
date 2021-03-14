import DiningModel from "../models/DiningModel";
import DiningModelImage from "../models/DiningImage";
import MenuImage from "../models/MenuImage";
// helpers //
import { deleteFile } from "./helpers/apiHelpers";

export default {
  getDiningModels: (_req, res) => {
    return DiningModel.find({})
      .populate("images", ["_id", "path"])
      .populate("menuImages", ["_id", "path"])
      .then((foundModels) => {
        return res.status(200).json({
          responseMsg: "Success",
          diningModels: foundModels
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
    const  { diningModelData } = req.body;
    
    return DiningModel.create({ ...diningModelData, createdAt: new Date(Date.now()), editedAt: new Date(Date.now()) })
      .then((createdModel) => {
        return createdModel
          .populate({ path:'images', model: "DiningModelImage" })
          .populate({ path: "menuImages" , model: "MenuImage" })
          .execPopulate()
      })
      .then((newDiningModel) => {
        return res.status(200).json({
          responseMsg: "New Dining/Entertainment option created",
          newDiningModel: newDiningModel
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
    const { diningModelId } = req.params;
    const { diningModelData, diningModelImages = [], menuImages = [] } = req.body;
    const { title, description, hours } = diningModelData;
    // 
    const populateQuery = [
      { path:'images', model: "DiningModelImage" }, 
      { path: "menuImages" , model: "MenuImage" }
    ];

    const updatedDiningModelImages = diningModelImages.currentImages.map((img) => `${img._id}` );
    return DiningModel.findOneAndUpdate(
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
    .then((updatedDiningModel) => {
      return DiningModel.populate(updatedDiningModel, populateQuery).execPopulate();
    })
    .then((diningModel) => {
      return res.status(200).json({
        responseMsg: "Dining/Entertainment option updated",
        updatedDiningModel: diningModel
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
      DiningModel.findOne({ _id: diningModelId })
        .populate("images").populate("menuImages").execPopulate()
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
      return DiningModel.findOneAndDelete({ _id: diningModelId }).exec()
    })
    .then((deletedDiningModel) => {
      return res.status(200).json({
        responseMsg: "Successfully deleted",
        deletedDiningModel: deletedDiningModel
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
    const imageUploadResult = req.locals.diningModelImageUpload;
    if (imageUploadResult.success) {
      return DiningModelImage.create({
        path: imageUploadResult.imagePath
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
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  uploadMenuImage: (req, res) => {
    const imageUploadResult = req.locals.menuImageUpload;
    if (imageUploadResult.success) {
      return MenuImage.create({
        path: imageUploadResult.imagePath
      })
      .then((menuImage) => {
        return res.status(200).json({
          responseMsg: "Uploaded an image",
          newImage: menuImage
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
    return DiningModelImage.findOneAndDelete({ _id: imageId })
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
  },

  deleteMenuImage: (req, res) => {
    const { imageId } = req.params;
    return MenuImage.findOneAndDelete({ _id: imageId })
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
};
