import { useEffect, useState } from "react";
import { Style, log } from "../utils/log";

export const useImage = (image) => {
  //const apiUrl = Constants.manifest2.extra.apiUrl;

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    log("...useImage...", [], Style.effects);
    if (image && typeof image === "string") {
      log("Image URL", [image], Style.code);
      const imageURL = image.replace(/public\\uploads\\/g, "");
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
      const imageURL = img.replace("public\\uploads\\", "");
      setImageUrl(
        //NOTE: URL Hardcoded
        `https://etc-backend.onrender.com/uploads/${imageURL}`,
      );
    }
  };

  return { imageUrl, setImage };
};
