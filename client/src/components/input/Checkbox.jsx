import React from "react";

export const Checkbox = (props) => {
  const { id, label, ...inputProps } = props;

  return (
    <>
      <div className="py-1">
        <input
          className="border-accent-secondary float-left mr-2 mt-1 h-4 w-4 cursor-pointer appearance-none rounded border-2 bg-transparent bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-primary checked:bg-primary focus:outline-none"
          type="checkbox"
          id={id}
          {...inputProps}
        />
        <label className="inline-block" htmlFor={id}>
          {label}
        </label>
      </div>
    </>
  );
};
