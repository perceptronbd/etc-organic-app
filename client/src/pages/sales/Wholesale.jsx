import React, { useState } from "react";
import { Button, FormInput, IncDecButton, SelectInput } from "../../components";
import { selectBranch, selectCategory } from "../../const/mockData";

export const Wholesale = () => {
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

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ form: formValues });
  };

  return (
    <>
      <form action="submit" onSubmit={onSubmit} className=" w-full rounded-xl bg-foreground pb-4">
        <div className="flex w-full gap-4 ">
          <div className="flex flex-col gap-2 rounded-xl bg-foreground p-4">
            <SelectInput {...selectCategory} />
            <IncDecButton
              name={"quantity"}
              value={quantity}
              onChange={changeQuantity}
              label={"Quantity :"}
              required
            />
            <FormInput
              id={"price"}
              label={"Price"}
              placeholder={"Price"}
              pattern={"[0-9]+"}
              name={"price"}
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
              id={"proprietorName"}
              label={"Proprietor Name"}
              placeholder={"Proprietor Name"}
              pattern={"[A-Za-z ]+"}
              name={"proprietorName"}
              errorMessage={"Please enter a name"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"shopName"}
              label={"Shop Name"}
              name={"shopName"}
              placeholder={"Shop Name"}
              pattern={"[A-Za-z ]+"}
              errorMessage={"Please enter a valid name"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"shopNumber"}
              label={"Shop Number"}
              name={"shopNumber"}
              placeholder={"Number"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"shopAddress"}
              label={"Shop Address"}
              name={"shopAddress"}
              placeholder={"Address"}
              errorMessage={"Please enter a valid phone number"}
              type={"tel"}
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
