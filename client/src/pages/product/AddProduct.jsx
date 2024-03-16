import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { createProductApi } from "../../api";
import {
  Button,
  Container,
  FormInput,
  ImgInput,
  SelectInput,
  Text,
  TextInput,
} from "../../components";
import { selectCategory } from "../../const/selectInputs";
import { useAuth } from "../../context/AuthContext";
import { Style, logs } from "../../utils/logs";

export const AddProduct = () => {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const [file, setFile] = useState();
  const [formValues, setFormValues] = useState({
    productName: "",
    category: "",
    salesPrice: "",
    purchasePrice: "",
    csb: "",
    points: "",
    units: 0,
    description: "",
    image: null,
  });

  const onChange = (e) => {
    if (e.target.name === "image") {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
        setFormValues({ ...formValues, [e.target.name]: selectedFile });
        setFile(URL.createObjectURL(selectedFile));
      } else {
        setFormValues({ ...formValues, [e.target.name]: null });
        setFile(null);
      }
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };

  const onChangeSelect = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();

    logs("onSubmit -> formValues", [formValues], Style.code);

    // Create a new FormData object for each submission
    const formData = new FormData();

    // Populate formData with the current formValues
    for (const key in formValues) {
      if (key === "image" && formValues[key]) {
        // Append the file with the correct filename
        formData.append(key, formValues[key], formValues[key].name);
      } else {
        // Append other form values
        formData.append(key, formValues[key]);
      }
    }

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      // Pass formData to the API call
      const res = await createProductApi(formData, user.token);
      logs("onSubmit -> res", [res], Style.function);

      if (res.status === 200 || res.status === 201) {
        setSubmitting(false);
        navigate(-1);
        toast.success("Product added successfully");
      } else {
        setSubmitting(false);
        toast.error("Error submitting form");
      }
    } catch (error) {
      setSubmitting(false);
      toast.error("Error submitting form");
    }
  };

  return (
    <Container className={"flex-col justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Add Product
        </Text>
        <Button asChild variant="ghost">
          <Link to={-1}>Go Back</Link>
        </Button>
      </div>
      <form action="submit" onSubmit={onSubmit} className="w-full rounded-lg bg-white p-4">
        <></>
        <div className="grid w-[80%] grid-cols-2 gap-x-8 gap-y-2">
          <FormInput
            id={"productName"}
            label={"Product Name"}
            placeholder={"Product Name"}
            name={"productName"}
            required
            onChange={onChange}
          />{" "}
          <SelectInput
            {...selectCategory}
            onValueChange={(value) => onChangeSelect("category", value)}
          />
          <>
            <FormInput
              id={"salesPrice"}
              label={"Sales Price"}
              placeholder={"Sales Price"}
              name={"salesPrice"}
              type={"number"}
              pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"}
              required
              onChange={onChange}
            />
          </>
          <>
            <FormInput
              id={"purchasePrice"}
              label={"Purchase Price"}
              placeholder={"Purchase Price"}
              name={"purchasePrice"}
              type={"number"}
              pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"}
              required
              onChange={onChange}
            />
          </>
          <FormInput
            id={"csb"}
            label={"CSB"}
            placeholder={"CSB"}
            name={"csb"}
            type={"number"}
            pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"}
            required
            onChange={onChange}
          />
          <FormInput
            id={"points"}
            label={"Points"}
            placeholder={"Points"}
            name={"points"}
            type={"number"}
            pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"}
            required
            onChange={onChange}
          />
        </div>
        <div className="mb-4">
          <ImgInput file={file} label={"Upload Image"} id={"img"} onChange={onChange} />
        </div>
        <TextInput
          id={"description"}
          className={"mb-4"}
          name={"description"}
          label={"Description"}
          placeholder={"Description"}
          required
          onChange={onChange}
        />
        <Button type={"submit"} loading={submitting}>
          Add Product
        </Button>
      </form>
    </Container>
  );
};
