import { HOST } from "@env";
import { useEffect, useState } from "react";
import { Style, log } from "../utils/log";

export const useImage = (image) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    log("...useImage...", [], Style.effects);
    if (image && typeof image === "string") {
      log("Image URL", [image], Style.code);
      const imageURL = image.replace(/public\\uploads\\/g, "");
      setImageUrl(`${HOST}/uploads/${imageURL}`);
    }
  }, [image]);

  // Set image url function
  const setImage = (img) => {
    log("...useImage setImage...", [], Style.function);
    if (img && typeof img === "string") {
      const imageURL = img.replace("public\\uploads\\", "");
      setImageUrl(`${HOST}/uploads/${imageURL}`);
    }
  };

  return { imageUrl, setImage };
};
