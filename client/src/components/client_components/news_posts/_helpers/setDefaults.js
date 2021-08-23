// @flow
import { setImagePath } from "../../../helpers/displayHelpers";
// types //
import type { NewsPostData, NewsPostImgData } from "../../../../redux/reducers/news_posts/flowTypes";
type DefaultData = {
  defaultTitle: string;
  defaultAuthor: string;
  defaultContent: string;
};

export const setDefaultImages = (newsPostData: NewsPostData): { imageURLs: Array<string>, numOfImages: number } => {
  let imageURLs: Array<string> = []; 
  if (newsPostData.images && Array.isArray() && newsPostData.images.length <= 3) {
    for (let i = 0; i < 3; i++) {
      if (newsPostData.images[i] && typeof newsPostData.images[i].path === "string") {
        imageURLs.push(setImagePath(newsPostData.images[i].path));
      } else {
        imageURLs.push("/assets/images/news/news_default" + (i+1).toString() + ".jpeg");
      }
    }
  } else if (newsPostData.images && Array.isArray(newsPostData.images) && newsPostData.images.length > 3) {
    for (let i = 0; i < newsPostData.images.length; i++) {
      imageURLs.push(setImagePath(newsPostData.images[i].path));
    }
  } else {
    for (let i = 0; i < 3; i++) {
      imageURLs[i] = "/assets/images/news/news_default" + (i+1).toString() + ".jpeg";
    }
  }
  return { imageURLs, numOfImages: imageURLs.length };
};

export const setDefaultNewsPostImg = (data?: NewsPostImgData): string => {
  if (data && typeof data === "object" && data.path) {
    return setImagePath(data.path);
  }
  return "/assets/images/news/news_default1.jpeg";
}

export const setDefaultValues = (newsPostData: NewsPostData): DefaultData => {
  let defaultTitle: string; let defaultAuthor: string; let defaultContent: string;
  // default title //
  defaultTitle = newsPostData.title ? newsPostData.title : "Default news post title goes here";
  // default author //
  defaultAuthor = newsPostData.createdBy ? newsPostData.createdBy : "Default Author";
  if (newsPostData.content) {
    defaultContent = newsPostData.content;
  } else {
    defaultContent = "Default news post content goes here. Anything related to any news and so on."
  } 
  return { defaultTitle, defaultAuthor, defaultContent };
};