import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getEmployeeByIdApi, updateEmployeeApi } from "../../api";
import {
  Button,
  Checkbox,
  Container,
  FormInput,
  SelectInput,
  Skeleton,
  Text,
} from "../../components";
import { selectBranch, selectDesignation } from "../../const/mockData";
import { Style, logs } from "../../utils/logs";

export const UpdateEmployee = () => {
  const userId = useParams();

  logs("UpdateEmployee item:", [userId], Style.code);

  const [loading, setLoading] = useState(true);

  const [updating, setUpdating] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    logs("UpdateEmployee useEffect:", [userId], Style.effects);
    const fetchEmployee = async () => {
      const res = await getEmployeeByIdApi(userId.item);

      if (res.status === 200) {
        const data = res.data;
        setFormValues((prev) => ({
          ...prev,
          name: data.name,
          email: data.email,
          phone: data.phone,
          designation: data.designation,
          branch: data.branch,
          permissions: data.permissions,
        }));
        if (data?.permissions?.productManagement && data?.permissions?.inputSales) {
          setFullAccess(true);
        }
        setLoading(false);
      } else {
        toast.error("Something went wrong");
      }
    };
    fetchEmployee();
  }, []);

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

  const onUpdate = async (e) => {
    setUpdating(true);

    e.preventDefault();
    console.log({ form: formValues });

    const res = await updateEmployeeApi(userId.item, formValues);

    if (res.status === 200) {
      toast.success("Employee updated successfully");
      setUpdating(false);
    } else {
      toast.error("Something went wrong");
      setUpdating(false);
    }
  };

  return (
    <Container className={"justify-start"}>
      <div className="mb-2 flex w-full items-center justify-between">
        <Text variant="titleSmall" type="m">
          Update Employee
        </Text>
        <Button asChild>
          <Link to={-1}>Go Back</Link>
        </Button>
      </div>

      {loading ? (
        <div className="grid h-[500px] w-full grid-cols-2 grid-rows-6 gap-x-8 gap-y-1 rounded-md bg-white p-4">
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
          <Skeleton className={"h-12 w-96 bg-muted"} />
        </div>
      ) : (
        <form action="submit" onSubmit={onUpdate} className="w-full rounded-lg bg-white p-4">
          <div className="grid w-[80%] grid-cols-2 gap-x-8">
            <FormInput
              id={"name"}
              label={"Employee Name"}
              name={"name"}
              placeholder={"Employee Name"}
              value={formValues.name}
              required
              onChange={onChange}
            />
            <FormInput
              id={"email"}
              label={"Email Address"}
              name={"email"}
              type={"email"}
              placeholder={"Email Address"}
              value={formValues.email}
              pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$"}
              errorMessage={"Please enter a valid email address"}
              required
              onChange={onChange}
            />

            <FormInput
              id={"phone"}
              label={"Phone Number"}
              name={"phone"}
              placeholder={"Employee Number"}
              type={"tel"}
              value={formValues.phone}
              pattern={"[0-9]{11}"}
              errorMessage={"Please enter a valid phone number"}
              required
              onChange={onChange}
            />
            <SelectInput
              value={formValues.designation}
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
              value={formValues.branch}
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
                checked={formValues?.permissions?.productManagement}
                onChange={onChangeCheckbox}
              />
              <Checkbox
                label={"Input Sales"}
                name={"inputSales"}
                checked={formValues?.permissions?.inputSales}
                onChange={onChangeCheckbox}
              />
            </div>
          </section>

          <section className="flex gap-2">
            <Button type={"submit"} loading={updating}>
              Update Employee
            </Button>
            <Button variant="destructive" type={"submit"}>
              Delete
            </Button>
          </section>
        </form>
      )}
    </Container>
  );
};
