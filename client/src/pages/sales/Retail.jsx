import React, { useEffect, useState } from "react";
import { Button, FormInput, IncDecButton, SelectInput } from "../../components";
import { useProductOptions } from "../../hooks";
import { selectBranch } from "./selectInputs";

export const Retail = () => {
  const { productOptions } = useProductOptions();

  const [quantity, setQuantity] = useState(0);

  const changeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
    setFormValues({ ...formValues, quantity: newQuantity.toString() });
  };

  const [formValues, setFormValues] = useState({
    productName: "",
    quantity: "",
    price: "",
    discount: "",
    finalPrice: "",
    proprietorName: "",
    shopName: "",
    shopNumber: "",
    shopAddress: "",
    branch: "",
  });

  const onChangeSelect = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
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
    if (formValues.productName && quantity > 0) {
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

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ form: formValues });
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
              id="products"
              name="products"
              placeholder="Select Products"
              required={true}
              type="select"
              selectOpts={productOptions}
              onValueChange={(value) => onChangeSelect("productName", value)}
            />
            <IncDecButton
              id={"quantity"}
              name={"quantity"}
              value={quantity}
              onChange={changeQuantity}
              label={"Quantity :"}
              placeholder={"Quantity"}
              required
            />
            <FormInput
              id={"price"}
              label={"Price"}
              placeholder={"Price"}
              pattern={"[0-9]+"}
              name={"price"}
              value={formValues.price}
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
              pattern={"[0-9]+"}
              name={"finalPrice"}
              errorMessage={"Please enter a valid price"}
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-2 rounded-xl bg-foreground p-4">
            <SelectInput {...selectBranch} />
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
            <FormInput
              id={"customerID"}
              label={"Customer ID"}
              placeholder={"ID"}
              name={"customerID"}
              errorMessage={"Please enter a ID"}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="flex w-full justify-start px-4">
          <Button type={"submit"}>Done</Button>
        </div>
      </form>
    </>
  );
};
