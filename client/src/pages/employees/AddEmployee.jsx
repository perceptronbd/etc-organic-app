import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { registerEmployeeApi } from "../../api";
import { Button, Checkbox, Container, FormInput, SelectInput, Text } from "../../components";
import { Style, logs } from "../../utils/logs";
import { selectBranch, selectDesignation } from "./selectInputs";

export const AddEmployee = () => {
  const [fullAccess, setFullAccess] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    designation: "",
    branch: "",
    permissions: {
      productManagement: false,
      inputSales: false,
    },
  });

  const [loading, setLoading] = useState(false);

  const onChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const onChangeSelect = (name, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onChangeCheckbox = (e) => {
    const { name, checked } = e.target;

    if (name === "fullAccess") {
      setFullAccess(checked);
      const updatedPermissions = Object.fromEntries(
        Object.keys(formValues.permissions).map((permission) => [permission, checked])
      );
      setFormValues({ ...formValues, permissions: updatedPermissions });
    } else {
      setFormValues({
        ...formValues,
        permissions: { ...formValues.permissions, [name]: checked },
      });
      const hasUncheckedPermission = Object.values({
        ...formValues.permissions,
        [name]: checked,
      }).some((permission) => !permission);
      setFullAccess(!hasUncheckedPermission);
    }
  };

  const onSubmit = async (e) => {
    logs("AddEmployee onSubmit:", [], Style.function);
    setLoading(true);
    e.preventDefault();
    logs("AddEmployee form:", [formValues], Style.code);
    const res = await registerEmployeeApi(formValues);

    if (res.status === 200 || res.status === 201) {
      setLoading(false);
      toast.success("Employee Added Successfully");
    } else if (res.status === 400) {
      setLoading(false);
      return toast.error(res.data.message);
    } else {
      setLoading(false);
      return toast.error("Something went wrong!");
    }
  };

  return (
    <Container className={"justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Add Employee
        </Text>
        <Button asChild>
          <Link to={-1}>Go Back</Link>
        </Button>
      </div>
      <form action="submit" onSubmit={onSubmit} className="w-full rounded-lg bg-white p-4">
        <div className="grid w-[80%] grid-cols-2 gap-x-8">
          <FormInput
            id={"name"}
            label={"Employee Name"}
            name={"name"}
            placeholder={"Employee Name"}
            required
            onChange={onChange}
          />
          <FormInput
            id={"email"}
            label={"Email Address"}
            name={"email"}
            type={"email"}
            placeholder={"Email Address"}
            pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"}
            errorMessage={"Please enter a valid email address"}
            required
            onChange={onChange}
          />

          <FormInput
            id={"phone"}
            label={"Phone Number"}
            name={"phone"}
            placeholder={"Phone Number"}
            type={"tel"}
            pattern={"[0-9]{11}"}
            errorMessage={"Please enter a valid phone number"}
            required
            onChange={onChange}
          />
          <SelectInput
            onValueChange={(value) => onChangeSelect("designation", value)}
            {...selectDesignation}
          />
        </div>
        <div className="grid grid-rows-2">
          <FormInput
            id={"password"}
            label={"Password"}
            name={"password"}
            placeholder={"Password"}
            type={"password"}
            required
            onChange={onChange}
          />
          <SelectInput
            onValueChange={(value) => onChangeSelect("branch", value)}
            {...selectBranch}
          />
        </div>
        <section className="relative my-4 w-72 rounded-lg border p-4">
          <Text className={"absolute -top-3 bg-white px-1 text-sm text-textColor-light "}>
            Permissions
          </Text>
          <div className="flex flex-col">
            <Checkbox
              label={"Full Access"}
              name={"fullAccess"}
              checked={fullAccess}
              onChange={onChangeCheckbox}
            />
            <Checkbox
              label={"Product Management"}
              name={"productManagement"}
              checked={formValues.permissions.productManagement}
              onChange={onChangeCheckbox}
            />
            <Checkbox
              label={"Input Sales"}
              name={"inputSales"}
              checked={formValues.permissions.inputSales}
              onChange={onChangeCheckbox}
            />
          </div>
        </section>

        <Button type={"submit"} loading={loading}>
          Add Employee
        </Button>
      </form>
    </Container>
  );
};
