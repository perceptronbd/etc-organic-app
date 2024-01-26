import { useEffect, useState } from "react";
import { Style, log } from "../utils/log";
import { removeUploadsPrefix } from "../utils/removeUploadPrefix";

export const useImage = (image) => {
  //const apiUrl = Constants.manifest2.extra.apiUrl;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    log("...useImage...", [], Style.effects);
    if (image && typeof image === "string") {
      const imageURL = removeUploadsPrefix(image);
      log("useEffect ImageURL", [imageURL], Style.code);
      setImageUrl(
        //NOTE: URL Hardcoded
        `https://etc-backend.onrender.com/uploads/${imageURL}`,
      );
    }
  }, [image]);

  // Set image url function
  const setImage = (img) => {
    log("...useImage setImage...", [], Style.function);
    if (img && typeof img === "string") {
      const imageURL = removeUploadsPrefix(img);
      log("setImage Image URL", [image], Style.code);
      log("setImage ImageURL", [imageURL], Style.code);
      setImageUrl(
        //NOTE: URL Hardcoded
        `https://etc-backend.onrender.com/uploads/${imageURL}`,
      );
    }
  };

  return { imageUrl, setImage };
};
