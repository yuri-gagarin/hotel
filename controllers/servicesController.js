import ServiceImage from "./../models/ServiceImage";
import HotelService from "../models/HotelService";
// helpers //
import { deleteFile } from "./helpers/apiHelpers"

export default {
  getServices: (req, res) => {
    return HotelService.find({})
      .populate("images", ["_id", "path"])
      .then((services) => {
        console.log("responded");
        console.log(services);
        return res.status(200).json({
          responseMsg: "Success",
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
    const  { serviceData } = req.body;
    return HotelService.create(serviceData)
      .then((service) => {
        return HotelService.populate(service, { path: "images", model: "ServiceImage"});
      })
      .then((newService) => {
        return res.status(200).json({
          responseMsg: "New Service created",
          newService: newService
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
    let status;
    const serviceId = req.params.serviceId;
    const { serviceData, serviceImages } = req.body;
    const updatedImages = serviceImages.currentImages.map((img) => `${img._id}` );
    return HotelService.findOneAndUpdate(
      { _id: serviceId },
      {
        $set: { 
          serviceType: serviceData.serviceType,
          hours: serviceData.hours,
          price: serviceData.price,
          description: serviceData.description,
          images: [ ...updatedImages ]
        },
      },
      { new: true }
    ).then((updatedService) => {
      return HotelService.populate(updatedService, { path: "images", model: "ServiceImage" });
    })
    .then((service) => {
      console.log(room);
      return res.status(200).json({
        responseMsg: "Service Updated",
        updatedService: service
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