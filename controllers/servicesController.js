import ServiceImage from "./../models/ServiceImage";
import HotelService from "../models/HotelService";
// helpers //
import { deleteFile } from "./helpers/apiHelpers"
// validators //
import { validateHotelService } from "./helpers/validationHelpers";

export default {
  getServices: (req, res) => {
    return HotelService.find({})
      .populate("images", ["_id", "path"])
      .then((services) => {
        return res.status(200).json({
          responseMsg: "Loaded all Services",
          services: services
        });
      })
      .catch((error) => {
        return res.status(500).json({
          responseMsg: "An error occured",
          error: error
        });
      });
  },
  createHotelService: (req, res) => {
    const  { hotelServiceData } = req.body;
    let createdService;
    const { errors, isValid } = validateHotelService(hotelServiceData);
    if (!isValid) { 
      return Promise.resolve()
        .then(() => {
          return res.status(400).json({
            responseMsg: "Validation error",
            error: errors
          });
        });
    };

    return HotelService.create({ ...hotelServiceData, createdAt: new Date(Date.now()), editedAt: new Date(Date.now()), live: false })
      .then((service) => {
        return HotelService.populate(service, { path: "images", model: "ServiceImage" });
      })
      .then((populatedNewService) => {
        createdService = populatedNewService;
        if (populatedNewService.populated("images")) {
          // update corresponding image models //
          const imageIdsToUpdate = populatedNewService.images.map((image) => image._id);
          return ServiceImage.updateMany({ _id: imageIdsToUpdate }, { hotelService: createdService._id });
        } else {
          return Promise.resolve({ nModified: 0 });
        }
      })
      .then((_) => {
        return res.status(200).json({
          responseMsg: "New Service created",
          newService: createdService
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
  updateService: (req, res) => {
    let status, editedService;
    const { serviceId } = req.params;
    console.log(req.body)
    const { serviceData = {}, serviceImages = [], changeOnlineStatus, changeAllOnlineStatus } = req.body;
    const updatedImages = serviceImages.length > 0 ? serviceImages.map((img) => `${img._id}`) : [];

    if (changeOnlineStatus) {
      const { status = false } = changeOnlineStatus;
      return HotelService.findOneAndUpdate(
        { _id: serviceId },
        { $set: { live: status, editedAt: new Date(Date.now()) } },
        { new: true }
      )
      .populate("images").exec()
      .then((editedHService) => {
        editedService = editedHService;
        const onlineStatus = editedService.live ? "ONLINE" : "OFFLINE";
        return res.status(200).json({
          responseMsg: `Current service online status is now: ${onlineStatus}`,
          updatedService: editedService
        });
      });
    };

    if (changeAllOnlineStatus) {
      const { status = false } = changeAllOnlineStatus;
      return HotelService.update({}, { live: status }, { multi: true })
        .then((res) => {
          console.log(res);
          return HotelService.find({}).populate("images").exec();
        })
        .then((updatedServices) => {
          const { live } = updatedServices[0];
          return res.status(200).json({
            responseMsg: `All Hotel <Services> are now ${ live ? "ONLINE" : "OFFLIME" }`,
            updatedServices: updatedServices
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "An error occured",
            error: error
          });
        });
    }

    return HotelService.findOneAndUpdate(
      { _id: serviceId },
      {
        $set: { 
          serviceType: serviceData.serviceType,
          hours: serviceData.hours,
          price: serviceData.price,
          description: serviceData.description,
          images: [ ...updatedImages ],
          editedAt: new Date(Date.now())
        },
      },
      { new: true }
    )
    .populate("images").exec()
    .then((populatedService) => {
      editedService = populatedService;
      return res.status(200).json({
        responseMsg: "Service Updated",
        updatedService: editedService
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

  deleteHotelService: (req, res) => {
    let status, deletedService, imagePathsToDelete, imageIdsToDelete;
    const serviceId = req.params.serviceId;
    const { serviceImages } = req.body;
    if (serviceImages && Array.isArray(serviceImages) && serviceImages.length > 0) {
      // do image cleanup first //
      imagePathsToDelete = serviceImages.map((img) => `${img.path}`);
      imageIdsToDelete = serviceImages.map((img) => `${img._id}`);
    }
    return HotelService.findOneAndDelete({ _id: serviceId })
      .then((hotelService) => {
        deletedService = hotelService;
        if (imagePathsToDelete) {
          const deletePromises = imagePathsToDelete.map((filePath) => deleteFile(filePath));
          return Promise.all(deletePromises);
        } else {
          return Promise.resolve([{ success: true }]);
        }
      })
      .then((deleteArray) => {
        if (imageIdsToDelete) {
          return ServiceImage.deleteMany({ _id: imageIdsToDelete});
        } else {
          return Promise.resolve({ "n": 0, "ok": 1, "deletedCount": 0 })
        }
      })
      .then((result) => {
        return res.status(200).json({
          responseMsg: `Deleted 1 Item and ${result.deletedCount} related images`,
          deletedService: deletedService
        });
      })
      .catch((error) => {
        console.error(error);
        return res.status(status || 500).json({
          responseMsg: "An error occured in your request",
          error: error
        });
      });
  },

  uploadImage: (req, res) => {
    const imageUploadResult = req.locals.serviceImageUpload;
    const { imagePath, success } = imageUploadResult;
    const { serviceId } = req.params;
    let uploadedImage, updatedService;

    if (success) {
      if (serviceId) {
        // request is on an existing service //
        return (
          ServiceImage.create({ path: imagePath, hotelService: serviceId, createdAt: new Date(Date.now()) })
        )
        .then((createdImage) => {
          uploadedImage = createdImage;
          return (
            HotelService 
              .findOneAndUpdate({ _id: serviceId }, { $push: { images: createdImage._id } }, { new: true })
              .populate("images").exec()
          );
        })
        .then((populatedService) => {
          updatedService = populatedService;
          return res.status(200).json({
            responseMsg: "Uploaded a Service image",
            newImage: uploadedImage,
            updatedService: updatedService
          });
        })
        .catch((error) => {
          return res.status(500).json({
            responseMsg: "An error occured",
            error: error
          })
        })
      } else {
        return ServiceImage.create({
          path: imagePath, createdAt: new Date(Date.now())
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
      }
    } else {
      return res.status(500).json({
        responseMsg: "Upload not successful"
      });
    }
  },

  deleteImage: (req, res) => {
    const { imageId } = req.params;
    let deletedImage, updatedService;

    return ServiceImage.findOneAndDelete({ _id: imageId })
      .then((deletedImg) => {
        if (deletedImg) {
          deletedImage = deletedImg;
          // remove from the files //
          return deleteFile(deletedImg.path);
        } else {
          return Promise.reject(new Error("No Image was found"));
        }
      })
      .then((_) => {
        const { _id : imageId, hotelService : serviceId } = deletedImage;
        return (
          HotelService
            .findOneAndUpdate({ _id: serviceId }, { $pull: { images: imageId }, $set: { editedAt: new Date(Date.now()) } }, { new: true })
            .populate("images").exec()
        );
      })
      .then((populatedService) => {
        updatedService = populatedService;
        return res.status(200).json({
          responseMsg: "Deleted the image",
          deletedImage: deletedImage,
          updatedService: updatedService
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