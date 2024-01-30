//DOC: SelectInput Component
// the input takes the following props:
// id: string
// name: string
// placeholder: string
// required: boolean
// type: string
// selectOpts: object
// here, selectOpts is an object with keys as the group names and values as an array of objects with value and label keys.
// Sample selectOpts object:
// {
//   fruits: [
//     { value: "apple", label: "Apple" },
//     { value: "banana", label: "Banana" },
//   ],
//   vegetables: [
//     { value: "aubergine", label: "Aubergine" },
//     { value: "broccoli", label: "Broccoli" },
//   ],
// }

import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";
import React from "react";
import { cw } from "../../utils/cw";

export const SelectInput = ({
  id = "select",
  name,
  placeholder,
  required,
  selectOpts,
  onValueChange,
  value,
  ...props
}) => {
  return (
    <Select.Root
      required={required}
      name={name}
      value={value}
      onValueChange={onValueChange}
      {...props}
    >
      <div className="relative">
        <Select.Trigger
          id={id}
          className="font-base peer inline-flex h-10 w-72 items-center justify-start gap-[5px] rounded-lg border bg-white px-[15px] text-base leading-none text-textColor outline-none hover:border-primary focus:border focus:border-primary focus:outline-none focus:ring-1 data-[placeholder]:text-textColor-light"
          aria-label="Food"
        >
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="text-textColor">
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>
        {placeholder && (
          <label
            htmlFor={id}
            className="absolute left-2.5 top-4 z-10 origin-[0] -translate-y-6 scale-75 transform bg-foreground px-1 text-sm text-textColor-light duration-300 peer-placeholder-shown:-translate-y-1 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:bg-white peer-focus:text-primary"
          >
            {placeholder}
          </label>
        )}
      </div>
      <Select.Portal>
        <Select.Content className="z-20 overflow-hidden rounded-md bg-white shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-textColor">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            {Object.entries(selectOpts).map(([group, options]) => (
              <Select.Group key={group}>
                <Select.Label className=" mb-1 mt-2 w-fit px-5 text-xs leading-[25px] text-textColor-light">
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </Select.Label>
                {options.length > 0 &&
                  options.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
              </Select.Group>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white text-textColor">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

const SelectItem = React.forwardRef(({ children, className, ...props }, forwardedRef) => {
  return (
    <Select.Item
      className={cw(
        "relative flex h-8 select-none items-center rounded-md pl-5 pr-9 font-medium leading-none text-textColor data-[disabled]:pointer-events-none  data-[highlighted]:bg-secondary-light data-[disabled]:text-textColor-light data-[highlighted]:text-white data-[highlighted]:outline-none ",
        className
      )}
      {...props}
      ref={forwardedRef}
    >
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="absolute left-0 inline-flex items-center justify-center rounded-md ">
        <CheckIcon />
      </Select.ItemIndicator>
    </Select.Item>
  );
});

SelectItem.displayName = "SelectItem";
