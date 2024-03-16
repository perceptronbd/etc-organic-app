import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { deleteProductApi, getProductByIdApi, updateProductApi } from "../../api";
import {
  Button,
  Container,
  FormInput,
  FormSkeleton,
  ImgInput,
  SelectInput,
  Text,
  TextInput,
} from "../../components";
import { selectCategory } from "../../const/selectInputs";
import { Style, logs } from "../../utils/logs";

export const EditProduct = () => {
  const { id } = useParams();

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
    units: "",
    description: "",
    image: null,
  });

  useEffect(() => {
    setLoading(true);
    logs("EditProduct useEffect:", [id], Style.effects);

    const getProduct = async () => {
      const response = await getProductByIdApi(id);

      logs("getProduct", [response], Style.effects);

      if (response.status === 200) {
        const data = response.data;

        setFormValues((prev) => ({
          ...prev,
          productName: data.productName,
          category: data.category,
          salesPrice: data.salesPrice,
          purchasePrice: data.purchasePrice,
          csb: data.csb,
          points: data.points,
          units: data.units,
          description: data.description,
          image: data.image.secure_url,
        }));
        setLoading(false);
      }
    };
    getProduct();
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

  const onChangeSelect = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onDelete = async (e) => {
    e.preventDefault();
    setDeleting(true);
    const response = await deleteProductApi(id);

    if (response.status === 200) {
      navigate(-1);
      setDeleting(false);
      toast.success("Product deleted successfully");
    } else {
      toast.error("Failed to delete product");
      setDeleting(false);
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    console.log({ form: formValues });

    const response = await updateProductApi(id, formValues);

    if (response.status === 200) {
      navigate(-1);
      setUpdating(false);
      toast.success("Product updated successfully");
    } else {
      toast.error("Failed to update product");
      setUpdating(false);
    }
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
      {loading ? (
        <FormSkeleton />
      ) : (
        <form action="submit" className="w-full rounded-lg bg-white p-4">
          <></>
          <div className="grid w-[80%] grid-cols-2 gap-x-8 gap-y-2">
            <FormInput
              id={"productName"}
              label={"Product Name"}
              placeholder={"Product Name"}
              name={"productName"}
              value={formValues.productName}
              required
              onChange={onChange}
            />
            <SelectInput
              value={formValues.category}
              onValueChange={(value) => onChangeSelect("category", value)}
              {...selectCategory}
            />
            <>
              <FormInput
                id={"salesPrice"}
                label={"Sales Price"}
                placeholder={"Sales Price"}
                name={"salesPrice"}
                value={formValues.salesPrice}
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
                value={formValues.purchasePrice}
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
              value={formValues.csb}
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
              value={formValues.points}
              type={"number"}
              pattern={"[0-9]{3}-[0-9]{2}-[0-9]{3}"}
              required
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <ImgInput
              file={file || formValues.image}
              label={"Upload Image"}
              id={"img"}
              onChange={onChange}
            />
          </div>
          <TextInput
            id={"description"}
            className={"mb-4"}
            name={"description"}
            value={formValues.description}
            label={"Description"}
            placeholder={"Description"}
            required
            onChange={onChange}
          />
          <div className="flex gap-2">
            <Button type={"submit"} loading={updating} disabled={deleting} onClick={onUpdate}>
              Update Product
            </Button>
            <Button
              variant="destructive"
              type={"submit"}
              loading={deleting}
              disabled={updating}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </form>
      )}
    </Container>
  );
};
