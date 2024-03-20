import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { createSaleseApi } from "../../api";
import { Button, FormInput, IncDecButton, SelectInput } from "../../components";
import { useBranchOpt, useProductOptions } from "../../hooks";
import { Style, logs } from "../../utils/logs";

export const Retail = () => {
  const { productOptions } = useProductOptions();
  const { branchOpts } = useBranchOpt();

  const productsData = useSelector((state) => state.product.products);

  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formValues, setFormValues] = useState({
    product: "",
    quantity: "",
    price: "",
    finalPrice: "",
    customerName: "",
    customerNumber: "",
    branch: "",
    discount: "",
  });

  const onChangeSelect = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
    if (name === "product") {
      const selected = productsData.find((product) => product._id === value);
      //logs("onChange", [selected], Style.function);
      setSelectedProduct(selected);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    // Use the updater function to update state based on the previous state
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formValues.product && quantity > 0) {
      // const selectedProduct = products.find(
      //   (product) => product.name === formValues.productName
      // );
      // console.log("selectedProduct", selectedProduct);
      // if (selectedProduct) {
      //   const totalPrice = selectedProduct.price * quantity;
      //   setFormValues({
      //     ...formValues,
      //     price: selectedProduct.price,
      //     finalPrice: totalPrice.toString(),
      //   });
      //   console.log("totalPrice", totalPrice);
      // }
    }
  }, [formValues, quantity]);

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = {
      ...formValues,
      quantity: quantity.toString(),
      price: selectedProduct?.salesPrice,
      finalPrice: (
        parseFloat(selectedProduct?.salesPrice) * quantity -
        parseFloat(selectedProduct?.salesPrice) *
          quantity *
          parseFloat(formValues.discount ? formValues.discount / 100 : 0)
      ).toString(),
    };

    console.log("form", form);

    const res = await createSaleseApi(form);

    logs("Purchase onSubmit:", [res], Style.function);

    if (res.status === 200 || res.status === 201) {
      setLoading(false);
      toast.success("Purchase created successfully");
    } else if (res.status === 404) {
      setLoading(false);
      toast.error(res.data.message);
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <form
        action="submit"
        onSubmit={onSubmit}
        className="w-full rounded-xl rounded-tl-none bg-foreground pb-4"
      >
        <div className="flex gap-4">
          <div className="flex flex-col gap-2 rounded-xl bg-foreground p-4">
            <SelectInput
              id="product"
              name="product"
              placeholder="Select Product"
              required={true}
              type="select"
              selectOpts={productOptions}
              onValueChange={(value) => onChangeSelect("product", value)}
            />
            <IncDecButton
              name={"quantity"}
              value={quantity}
              setValue={setQuantity}
              label={"Quantity:"}
              required
            />
            <FormInput
              id={"productPrice"}
              label={"Product Price"}
              placeholder={"Product Price"}
              pattern={"[0-9]+"}
              name={"productPrice"}
              value={selectedProduct?.salesPrice}
              errorMessage={"Please enter a valid price"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"discount"}
              label={"Discount"}
              placeholder={"Discount"}
              pattern={"[0-9]+"}
              name={"discount"}
              errorMessage={"Please enter a discount"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"finalPrice"}
              label={"Final Price"}
              placeholder={"Final Price"}
              pattern={"^(?=.)([+-]?([0-9]*)(.([0-9]+))?)$"}
              name={"finalPrice"}
              errorMessage={"Please enter a valid price"}
              value={
                selectedProduct
                  ? parseFloat(selectedProduct?.salesPrice) * quantity -
                    parseFloat(selectedProduct?.salesPrice) *
                      quantity *
                      parseFloat(formValues.discount ? formValues.discount / 100 : 0)
                  : 0
              }
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-foreground p-4">
            <SelectInput
              id="branch"
              name="branch"
              placeholder="Select Branch"
              required={true}
              type="select"
              selectOpts={branchOpts}
              onValueChange={(value) => onChangeSelect("branch", value)}
            />
            <FormInput
              id={"customerName"}
              label={"Customer Name"}
              name={"customerName"}
              placeholder={"Customer Name"}
              pattern={"[A-Za-z ]+"}
              errorMessage={"Please enter a valid name"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"customerNumber"}
              label={"Customer Number"}
              name={"customerNumber"}
              placeholder={"Number"}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-start px-4">
          <Button type={"submit"} loading={loading}>
            Done
          </Button>
        </div>
      </form>
    </>
  );
};
