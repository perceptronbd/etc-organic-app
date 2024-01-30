import { AlertCircle } from "lucide-react";
import React from "react";
import { cw } from "../../utils/cw";

export const FormInput = React.forwardRef(
  ({ className, id, name, placeholder, value, type, onChange, errorMessage, ...props }, ref) => {
    return (
      <div className="relative my-2 ">
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete="off"
          {...props}
          onChange={onChange}
          className={cw(
            "peer block h-10 w-72 rounded-lg border p-2 text-textColor-light placeholder:text-transparent hover:border-primary focus:border-primary focus:text-textColor focus:outline-none focus:ring-1",
            className
          )}
          ref={ref}
        />
        {placeholder && (
          <label
            htmlFor={id}
            className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-sm text-gray-500 duration-300 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-primary"
          >
            {placeholder}
          </label>
        )}
        <span
          className={`mt-1 hidden w-fit gap-2 rounded-full bg-red-200 px-1 py-0.5 text-xs text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block`}
        >
          <div className="flex gap-2">
            <AlertCircle size={15} className="text-red-500" />
            {errorMessage}
          </div>
        </span>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
