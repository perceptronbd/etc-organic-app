import { Image } from "lucide-react";
import React, { useState } from "react";
import { Text } from "../text/Text";

export const ImgInput = (props) => {
  const { id, onChange, ...inputProps } = props;
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState(null);

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
        setImageName(selectedImage.name);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreview(null);
      setImageName(null);
    }
    onChange(event);
  };

  return (
    <div className="my-2" id={id}>
      <input
        id="image"
        name="image"
        accept="image/*"
        type="file"
        {...inputProps}
        onChange={handleImageChange}
        className="hidden"
      />

      <label
        htmlFor={"image"}
        className="3xl:justify-center 3xl:w-80 3xl:h-80 3xl:text-3xl flex h-32 w-72 items-center justify-start rounded-lg border p-2 text-base text-textColor-light hover:cursor-pointer"
      >
        <>
          {imagePreview ? (
            <section className="3xl:flex-col flex items-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="3xl:w-[280px] 3xl:h-[280px] 3xl:mb-2 mr-2 h-[122px] w-[122px] rounded-lg border"
              />
              <Text className={"text-sm"}>{imageName}</Text>
            </section>
          ) : (
            <>
              <Image className="3xl:w-[50px] 3xl:h-[50px] h-[126px] w-[126px]" />
              Upload Image
            </>
          )}
        </>
      </label>
    </div>
  );
};
