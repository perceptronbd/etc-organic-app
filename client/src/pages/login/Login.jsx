import React, { useState } from "react";
import { Toaster, toast } from "sonner";
import { loginApi } from "../../api";
import { Button, FormInput, Text } from "../../components";
import { useAuth } from "../../context/AuthContext";
import { Style, logs } from "../../utils/logs";

export const Login = () => {
  const [data, setData] = useState({
    phone: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const inputs = [
    {
      id: "phone",
      name: "phone",
      type: "tel",
      placeholder: "Phone Number",
      required: true,
      pattern: "[0-9]{11}",
      errorMessage: "Please enter a valid phone number",
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "Password",
      required: true,
      errorMessage: "Please enter a valid password",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginApi(data);
    logs("handleSubmit: loginApi res", [res], Style.function);
    if (res.status === 200) {
      setLoading(false);
      login(res.data);
    } else {
      setLoading(false);
      return toast.error(res.data.message);
    }
  };

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <Toaster richColors />
      <div className="flex flex-col items-center justify-center rounded-[40px] bg-foreground p-24">
        <section className="flex flex-col gap-4 ">
          <img src="/logo192.png" alt="ETC Organic" width={100} height={100} />
          <span>
            <Text variant="headerMedium" className={"text-primary"}>
              ETC
            </Text>
            <Text variant="titleLarge" type={"b"} className={"text-secondary"}>
              Organic
            </Text>
          </span>
        </section>
        <form onSubmit={handleSubmit} className="flex w-full flex-col items-center">
          <div className="flex flex-col ">
            <Text variant="bodySmall" className={"text-textColor-light"}>
              Login
            </Text>
            {inputs.map((input) => (
              <FormInput {...input} key={input.id} onChange={onChange} label={input.placeholder} />
            ))}
          </div>
          <hr className="py-1 " />
          <Button loading={loading} type="submit" className={"w-40"}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};
