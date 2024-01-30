import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Container,
  FormInput,
  ImgInput,
  SelectInput,
  Text,
  TextInput,
} from "../../components";
import { selectCategory } from "../../const/mockData";
import { Style, logs } from "../../utils/logs";

export const EditProduct = () => {
  const item = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [file, setFile] = useState();
  const [formValues, setFormValues] = useState({
    productName: "",
    category: "",
    salesPrice: "",
    purchasePrice: "",
    csb: "",
    points: "",
    unit: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    setLoading(true);
    logs("EditProduct useEffect:", [item], Style.effects);
  }, []);

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

  const onDelete = async (e) => {};

  const onUpdate = async (e) => {
    e.preventDefault();
    console.log({ form: formValues });
  };

  return (
    <Container className={"flex-col justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Edit Product
        </Text>
        <Button asChild variant="ghost">
          <Link to={-1}>Go Back</Link>
        </Button>
      </div>
      <form action="submit" className="w-full rounded-lg bg-white p-4">
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
          <SelectInput {...selectCategory} />
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
          <SelectInput {...selectCategory} />
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
        <Button className={`mr-2`} type={"submit"} onClick={onUpdate}>
          Update Product
        </Button>
        <Button variant="destructive" type={"submit"} onClick={onDelete}>
          Delete
        </Button>
      </form>
    </Container>
  );
};
