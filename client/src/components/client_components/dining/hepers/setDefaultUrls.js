// @flow
import type { DiningImgData, MenuImageData } from "../../../../redux/reducers/dining_entertainment/flowTypes";
// helpers //
import { setImagePath } from "../../../helpers/displayHelpers";

const generateDefaultURLS = (numberToGenerate): Array<string> => {
  const imgURLSArr: Array<string> = [];
  for (let i = 0; i < numberToGenerate; i++) {
    imgURLSArr.push(setImagePath());
  }
  return imgURLSArr;
};

export const setDefaultURLS = (imgDataArr: Array<DiningImgData | MenuImageData>): Array<string> => {
  const imageURLS: Array<string> = [];
  for (const imgData of imgDataArr) {
    imageURLS.push(imgData.path);
  }
  if (imageURLS.length < 3) {
    switch (imageURLS.length) {
      case 0: {
        imageURLS.push(...generateDefaultURLS(3));
        break;
      };
      case 1: {
        imageURLS.push(...generateDefaultURLS(2));
        break;
      };
      case 2: {
        imageURLS.push(...generateDefaultURLS(1));
        break;
      }
    }
  }
  return imageURLS;
}