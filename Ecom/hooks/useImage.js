import { HOST } from "@env";
import { useEffect, useState } from "react";
import { Style, log } from "../utils/log";

export const useImage = (image) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    log("...useImage...", [], Style.effects);
    if (image) {
      log("Image URL", [image], Style.code);
      const imageURL = image.replace(/public\\uploads\\/g, "");

      setImageUrl(`${HOST}/uploads/${imageURL}`);
    }
  }, [image]);

  //set image url function

  const setImage = (img) => {
    log("...useImage setImage...", [], Style.function);
    if (img) {
      const imageURL = img.replace("public\\uploads\\", "");
      setImageUrl(`${HOST}/uploads/${imageURL}`);
    }
  };

  return { imageUrl, setImage };
};
