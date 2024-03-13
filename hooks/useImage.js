import { useEffect, useState } from "react";
import { removeUploadsPrefix } from "../utils/removeUploadPrefix";

export const useImage = (image) => {
  
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    // log("...useImage...", [image], Style.effects);
    if (image && typeof image === "string") {
      const imageURL = removeUploadsPrefix(image);
      // log("useEffect image", [imageURL], Style.code);
      setImageUrl(
        image
      );
    }
  }, [image]);

  // Set image url function
  const setImage = (img) => {
    // log("...useImage setImage...", [img], Style.function);
    if (img && typeof img === "string") {
      const imageURL = removeUploadsPrefix(img);
      // log("setImage Image URL", [img], Style.code);
      // log("setImage ImageURL", [imageURL], Style.code);
      setImageUrl(
        img
      );
    }
  };

  return { imageUrl, setImage };
};
