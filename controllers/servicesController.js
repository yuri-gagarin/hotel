import ServiceImage from "./../models/ServiceImage";
import HotelService from "../models/HotelService";

export default {
  getServices: (req, res) => {
    return HotelService.find({})
      .populate("images", ["_id", "path"])
      .then((services) => {
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
    let status, foundRoom;
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