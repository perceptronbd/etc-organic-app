import React, { useState } from "react";
import { Button, Container, FormInput, IncDecButton, SelectInput, Text } from "../../components";
import { selectBranch, selectCategory } from "../../const/mockData";
export const Purchase = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const changeQuantity = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const [formValues, setFormValues] = useState({
    productName: "",
    quantity: "",
    totalPurchasingPrice: "",
    transportatoinCost: "",
    supplierName: "",
    supplierNumber: "",
    branch: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });

    // if (name === "productName") {
    //   const selected = products.find((product) => product.name === value);
    //   setSelectedProduct(selected);
    // }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log({ form: formValues });
  };

  return (
    <Container className={"flex-col justify-start"}>
      <Text variant="titleSmall" type="m" className={"self-start"}>
        Purchase
      </Text>
      <form action="submit" onSubmit={onSubmit} className="w-full">
        <div className="grid h-[450px] w-full grid-cols-2 gap-2 p-2">
          <div className="grid w-full grid-rows-6 gap-y-2 rounded-xl bg-foreground p-4">
            <SelectInput {...selectCategory} />
            <IncDecButton
              name={"quantity"}
              value={quantity}
              onChange={changeQuantity}
              label={"Quantity"}
              required
            />
            <FormInput
              id={"totalPurchasingPrice"}
              label={"Total Purchasing Price"}
              placeholder={"Total Price"}
              pattern={"[0-9]+"}
              name={"totalPurchasingPrice"}
              errorMessage={"Please enter a valid price"}
              value={selectedProduct ? selectedProduct.price * quantity : 0}
              readOnly
              required
            />
            <FormInput
              id={"transportatoinCost"}
              label={"Transportation Cost"}
              placeholder={"Total Price"}
              pattern={"[0-9]+"}
              name={"transportatoinCost"}
              errorMessage={"Please enter a valid price"}
              onChange={onChange}
              required
            />
          </div>
          <div className="grid w-full grid-rows-6 gap-y-2 rounded-xl bg-foreground p-4">
            <SelectInput {...selectBranch} />
            <FormInput
              id={"supplierName"}
              label={"Supplier Name"}
              placeholder={"Supplier Name"}
              pattern={"[A-Za-z ]+"}
              name={"supplierName"}
              errorMessage={"Please enter a name"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"supplierNumber"}
              label={"Supplier Number"}
              name={"supplierNumber"}
              placeholder={"01xxxxxxxxxx"}
              pattern={"[0-9]{11}"}
              errorMessage={"Please enter a valid phone number"}
              type={"tel"}
              onChange={onChange}
              required
            />
          </div>
        </div>
        <div className="mt-8 flex w-full justify-center">
          <Button type={"submit"}>Done</Button>
        </div>
      </form>
    </Container>
  );
};
