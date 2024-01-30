import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { createPurchaseApi } from "../../api";
import { Button, Container, FormInput, IncDecButton, SelectInput, Text } from "../../components";
import { useBranchOpt, useProductOptions } from "../../hooks";
import { Style, logs } from "../../utils/logs";

export const Purchase = () => {
  const { productOptions } = useProductOptions();
  const { branchOpts } = useBranchOpt();

  const productsData = useSelector((state) => state.product.products);

  const [loading, setLoading] = useState(false);

  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [formValues, setFormValues] = useState({
    product: "",
    quantity: "",
    totalPurchasingPrice: "",
    transportationCost: "",
    supplierName: "",
    supplierNumber: "",
    branch: "",
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
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = {
      ...formValues,
      quantity: quantity.toString(),
      totalPurchasingPrice: (
        parseFloat(selectedProduct?.purchasePrice) * quantity +
        parseFloat(formValues.transportationCost ? formValues.transportationCost : 0)
      ).toString(),
    };

    const res = await createPurchaseApi(form);

    logs("Purchase onSubmit:", [res], Style.function);

    if (res.status === 200 || res.status === 201) {
      setLoading(false);
      toast.success("Purchase created successfully");
    } else {
      setLoading(false);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container className={"flex-col items-start justify-start"}>
      <Text variant="titleSmall" type="m" className={"self-start"}>
        Purchase
      </Text>
      <form action="submit" onSubmit={onSubmit} className="w-full">
        <div className="grid h-[450px] w-full grid-cols-2 gap-2 p-2">
          <div className="grid w-full grid-rows-6 gap-y-2 rounded-xl bg-foreground p-4">
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
              name={"totalPurchasingPrice"}
              errorMessage={"Please enter a valid price"}
              value={selectedProduct?.purchasePrice}
              readOnly
              required
            />
            <FormInput
              id={"transportationCost"}
              label={"Transportation Cost"}
              placeholder={"Transportation Cost"}
              pattern={"[0-9]+"}
              name={"transportationCost"}
              errorMessage={"Please enter a valid price"}
              onChange={onChange}
              required
            />
            <FormInput
              id={"totalPurchasingPrice"}
              label={"Total Purchasing Price"}
              placeholder={"Total Purchasing Price"}
              pattern={"[0-9]+"}
              name={"totalPurchasingPrice"}
              errorMessage={"Please enter a valid price"}
              value={
                selectedProduct
                  ? parseFloat(selectedProduct?.purchasePrice) * quantity +
                    parseFloat(formValues.transportationCost ? formValues.transportationCost : 0)
                  : 0
              }
              onChange={onChange}
              required
            />
          </div>
          <div className="grid w-full grid-rows-6 gap-y-2 rounded-xl bg-foreground p-4">
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
          <Button type={"submit"} loading={loading}>
            Done
          </Button>
        </div>
      </form>
    </Container>
  );
};
