import { Image } from "lucide-react";
import React, { useState } from "react";
import { Text } from "../text/Text";

// DOC:ImgInput Component
/**
 * This component provides a user-friendly interface for selecting and previewing an image file.
 * It renders an input field for file selection and a preview area that displays the selected image.
 *
 * Props:
 * - id (string, optional): The ID attribute for the input field.
 * - onChange (function, required): A callback function that is called when the input field value changes (an image is selected). The `event` object is passed as a parameter.
 * - ...inputProps (object, optional): Additional props that can be passed to the input field element.
 *
 * State:
 * - imagePreview (initially null): Stores the data URL of the selected image for preview.
 * - imageName (initially null): Stores the name of the selected image file.
 *
 * Functions:
 * - handleImageChange(event): This function is called when the input field value changes (an image is selected).
 *   It retrieves the first file from the `event.target.files` array, and if a file is selected, it creates
 *   a new `FileReader` object, sets up an `onload` event handler that updates the `imagePreview` state with
 *   the data URL of the selected image and the `imageName` state with the name of the selected image file.
 *   It then reads the selected file as a data URL using the `readAsDataURL` method. If no file is selected,
 *   it resets `imagePreview` and `imageName` to `null`. Finally, it calls the `onChange` function passed as
 *   a prop, passing the original `event` object.
 *
 * Rendering:
 * The component renders the following elements:
 * - A hidden `input` element of type `file` for selecting an image file.
 * - A `label` element associated with the input element, which acts as a clickable area for opening the file picker dialog.
 * - Inside the `label`:
 *   - If an image is selected (`imagePreview` is not `null`):
 *     - Renders a section with the selected image preview and the image name using the `Text` component.
 *   - If no image is selected (`imagePreview` is `null`):
 *     - Renders an upload icon using the `Image` component from `lucide-react` and plain text instructing the user to upload an image.
 */
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
