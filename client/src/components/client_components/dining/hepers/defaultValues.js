import { setImagePath } from '../../../helpers/displayHelpers';

export const setComponentValues = (diningOption) => {
  let title, description, hours, imagePaths = [];
  if (diningOption && typeof diningOption === "object") {
    title = diningOption.title ? diningOption.title : "Dining/Entertainment option title here...";
    description = diningOption.description ? diningOption.description : "Write a short description here, be creative...";
    hours = diningOption.hours ? diningOption.hours : "Your hours will go here";
    if (diningOption.images && Array.isArray(diningOption.images)) {
      for (let i = 0; i < 3; i++) {
        if (diningOption.images[i] && typeof diningOption.images[i] === "string") {
          imagePaths[i] = setImagePath(diningOption.images[i]);
        } else {
          imagePaths[i] = "/assets/images/dining/restaurant_stock3.jpeg";
        }
      }
    } else {
      for (let i = 0; i < 2; i++) {
        imagePaths[i] = "/assets/images/dining/restaurant_stock3.jpeg";
      }
    }
  } else {
    // default values  //
    title = "Dining/Entertainment option title here...";
    description = "Write a short description here, be creative...";
    hours = "Your hours will go here";
    for (let i = 0; i < 3; i++) {
      imagePaths[i] = "/assets/images/dining/restaurant_stock3.jpeg";
    }
  }

  return {
    title, description, hours, imagePaths
  };
};
