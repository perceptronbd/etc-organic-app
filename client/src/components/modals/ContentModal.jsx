import { X } from "lucide-react";
import React from "react";
import { Text } from "../text/Text";

export const ContentModal = ({ isOpen, closeModal, children, title }) => {
  if (!isOpen) return null;

  const handleClick = () => {
    closeModal();
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-accent/20 transition-all duration-300 ease-in-out">
      <div className="w-fit rounded-lg bg-white p-2 shadow-lg">
        <div className="my-2 flex h-8 w-full justify-between border-b px-2">
          <Text variant="titleSmall" type="sb">
            {title}
          </Text>
          <button
            onClick={handleClick}
            className={
              "group flex h-5 w-5 items-center justify-center rounded transition-all duration-300 ease-in-out hover:bg-red-500"
            }
          >
            <X className="group-hover:text-white" />
          </button>
        </div>
        <div className=" max-h-[90vh] w-fit items-center justify-center space-y-2 overflow-y-auto px-1">
          {children}
        </div>
      </div>
    </section>
  );
};
